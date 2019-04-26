/* eslint-disable consistent-return */
import Account from '../models/account';
import Transaction from '../models/transaction';
import validateCreateBankAccountInput from '../validation/bankAccount';
import validateTransactionInput from '../validation/transaction';

const AccountsController = {
  /**
   * @description - Create bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and data or error
   *
   * Route: POST: /accounts
   *
   * */
  create(req, res) {
    const { error, isValid } = validateCreateBankAccountInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error });
    }

    const {
      firstName, lastName, email, type,
    } = req.body;

    if (!req.user.isStaff && !req.user.isAdmin) {
      const date = new Date();
      const accountNumber = date.getTime();

      const accountDetail = {
        account_number: accountNumber,
        owner: req.user.id,
        type,
      };

      return Account.save(accountDetail).then(result => result.rows[0])
        .then(account => res.status(201).json({
          status: 201,
          data: {
            accountNumber: account.account_number,
            firstName,
            lastName,
            email,
            type: account.type,
            openingBalance: account.balance,
          },
        }))
        .catch(err => res.status(500).json({
          status: 500,
          error: `Could not create account ${err}`,
        }));
    }
  },

  /**
   * @description - Find all bank accounts
   *
   * @param  {object} req - request
   *
   * @param  {Object} res - response
   *
   * @return {json} - jsonObject containing status code and data or error
   *
   * Route: GET: /accounts
   *
   * */
  findAll(req, res) {
    Account.findAllById().then(accounts => res.status(200).json({
      status: 200, data: accounts.rows,
    })).catch(err => res.status(500).json({
      status: 500, error: `Could not fetch accounts. Please try again - ${err}`,
    }));
  },

  /**
   * @description - Find a specific bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
   *
   * Route: GET: /accounts/:accountNumber
   *
   * */
  findOne(req, res) {
    Account.findBy('account_number', parseInt(req.params.accountNumber, 10))
      .then((account) => {
        if (!account) {
          return res.status(404).json({
            status: 404,
            error: 'Acount does not exist',
          });
        }
        return res.status(200).json({ status: 200, data: account.rows });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Could not find account ${err}`,
      }));
  },

  /**
   * @description - Activate/deactivate a specific bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and data or error
   *
   * Route: PATCH: /account/:accountNumber/activate
   *
   * */
  changeStatus(req, res) {
    const { status } = req.body;
    if (!req.params.accountNumber || status === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Account number or status not provided',
      });
    }

    return Account.findOneAndUpdate('account_number', parseInt(req.params.accountNumber, 10), { status })
      .then(result => result.rows[0])
      .then((account) => {
        if (!account) {
          return res.status(404).json({
            status: 404,
            error: 'Account does not exist',
          });
        }
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber: account.account_number,
            status: account.status,
          },
        });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Error updating account ${err}`,
      }));
  },

  /**
   * @description - Credit an account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
   *
   * Route: POST: /transactions/:accountNumber/credit
   *
   * */
  async creditAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    let { amount } = req.body;
    amount = parseFloat(amount);
    const { error, isValid } = validateTransactionInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error });
    }

    if (req.user.isStaff) {
      try {
        const account = await Account.findBy('account_number', accountNumber);
        const update = await Account.findOneAndUpdate('account_number', accountNumber, {
          balance: amount + account.rows[0].balance,
        });
        const updatedAccount = update.rows[0];
        const transactionDetail = {
          type: 'credit',
          account_number: accountNumber,
          cashier: req.user.id,
          amount,
          old_balance: account.rows[0].balance,
          new_balance: updatedAccount.balance,
        };
        const newTransaction = await Transaction.save(transactionDetail);
        return res.status(201).json({
          status: 201,
          data: {
            transactionId: newTransaction.rows[0].transaction_id,
            accountNumber: newTransaction.rows[0].account_number,
            amount: newTransaction.rows[0].amount,
            cashier: newTransaction.rows[0].cashier,
            transactionType: newTransaction.rows[0].type,
            accountBalance: newTransaction.rows[0].new_balance,
          },
        });
      } catch (err) {
        res.status(500).json({
          status: 500,
          error: `There was an error making new transaction ${err}`,
        });
      }
    }

    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  },

  /**
   * @description - Debit an account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
   *
   * Route: POST: /transactions/:accountNumber/debit
   *
   * */
  async debitAccount(req, res) {
    const accountNumber = parseInt(req.params.accountNumber, 10);
    let { amount } = req.body;
    amount = parseFloat(amount);
    const { error, isValid } = validateTransactionInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error });
    }

    if (req.user.isStaff) {
      try {
        const account = await Account.findBy('account_number', accountNumber);

        if (amount > account.rows[0].balance) {
          return res.status(422).json({
            status: 422,
            error: 'Insuffient funds',
          });
        }
        const update = await Account.findOneAndUpdate('account_number', accountNumber, {
          balance: account.rows[0].balance - amount,
        });
        const updatedAccount = update.rows[0];
        const transactionDetail = {
          type: 'credit',
          account_number: accountNumber,
          cashier: req.user.id,
          amount,
          old_balance: account.rows[0].balance,
          new_balance: updatedAccount.balance,
        };
        const newTransaction = await Transaction.save(transactionDetail);
        return res.status(201).json({
          status: 201,
          data: {
            transactionId: newTransaction.rows[0].transaction_id,
            accountNumber: newTransaction.rows[0].account_number,
            amount: newTransaction.rows[0].amount,
            cashier: newTransaction.rows[0].cashier,
            transactionType: newTransaction.rows[0].type,
            accountBalance: newTransaction.rows[0].new_balance,
          },
        });
      } catch (err) {
        res.status(500).json({
          status: 500,
          error: `There was an error making new transaction ${err}`,
        });
      }
    }

    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  },

  /**
   * @description - Delete a specific bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and data or error
   *
   * Route: DELETE: /accounts/:accountNumber
   *
   * */
  delete(req, res) {
    if (!req.params.accountNumber) {
      res.status(400).json({
        status: 400,
        error: 'Account number not provided',
      });
    }

    Account.findOneAndDelete('account_number', parseInt(req.params.accountNumber, 10))
      .then(result => res.status(204).json({
        status: 204,
        data: result.rows,
      }))
      .catch(err => res.status(500).json({
        status: 500,
        error: `Something went wrong. Please try again.${err}`,
      }));
  },
};

export default AccountsController;
