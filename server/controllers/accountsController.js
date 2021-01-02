/* eslint-disable consistent-return */
import User from '../models/user';
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
  async create(req, res) {
    const { errors, isValid } = validateCreateBankAccountInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error: errors });
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
        type: type.toLowerCase(),
      };

      try {
        const account = await Account.save(accountDetail);
        return res.status(201).json({
          status: 201,
          data: {
            accountNumber: account.rows[0].account_number,
            firstName,
            lastName,
            email,
            type: account.rows[0].type,
            openingBalance: account.rows[0].balance,
          },
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          error: `Could not create account ${err}`,
        });
      }
    }
    return res.status(403).json({
      status: 403,
      error: 'Account creation is for clients only.',
    });
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
    const { status } = req.query;
    if (req.query === '{}') {
      Account.findAllById(res).then((accounts) => {
        if (!accounts || !accounts.rows.length) {
          return res.status(404).json({
            status: 404,
            error: 'No account found',
          });
        }
        return res.status(200).json({ status: 200, data: accounts.rows });
      })
        .catch(err => res.status(500).json({
          status: 500, error: `Could not get accounts. Please try again - ${err}`,
        }));
    } else {
      Account.findBy('status', status, res)
        .then((accounts) => {
          if (!accounts || !accounts.rows.length) {
            return res.status(404).json({
              status: 404,
              error: 'Account does not exist',
            });
          }
          return res.status(200).json({ status: 200, data: accounts.rows });
        })
        .catch(err => res.status(500).json({
          status: 500, error: `Could not fetch accounts. Please try again - ${err}`,
        }));
    }
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
    const { accountNumber } = req.params;
    if (/[A-Za-z]+/g.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid account number',
      });
    }
    Account.findBy('account_number', parseInt(accountNumber, 10), res)
      .then((account) => {
        if (!account || !account.rows.length) {
          return res.status(401).json({
            status: 401,
            error: 'Account does not exist',
          });
        }
        if (account.rows[0].owner !== req.user.id) {
          return res.status(403).json({ status: 403, err: 'You do not have the permission to this account.' });
        }
        return res.status(200).json({ status: 200, data: account.rows });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Could not find account, please try again - ${err}`,
      }));
  },

  /**
   * @description - Find all bank account of specific user
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
   *
   * Route: GET: /user/:email/accounts
   *
   * */
  async findByEmail(req, res) {
    try {
      const user = await User.findBy('email', req.params.email, res);

      Account.findBy('owner', user.rows[0].id, res)
        .then((account) => {
          if (!account || !account.rows.length) {
            return res.status(404).json({
              status: 404,
              error: 'No record found',
            });
          }
          if (req.user.id !== account.rows[0].owner
              && !req.user.isStaff && !req.user.isAdmin) {
            return res.status(403).json({
              status: 403,
              error: 'Permission denied.',
            });
          }
          return res.status(200).json({ status: 200, data: account.rows });
        })
        .catch(err => res.status(500).json({
          status: 500,
          error: `Could not find account, please try again - ${err}`,
        }));
    } catch (err) {
      return res.status(500).json({ status: 500, error: 'Error fetching accounts' });
    }
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
    const { accountNumber } = req.params;
    if (/[A-Za-z]+/g.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid account number',
      });
    }
    const { status } = req.body;
    if (status === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Account status not provided',
      });
    }

    if (status !== 'active' && status !== 'dormant') {
      return res.status(400).json({
        status: 400,
        error: 'Invalid option',
      });
    }

    return Account.findOneAndUpdate('account_number', parseInt(accountNumber, 10),
      { status }, res)
      .then((result) => {
        if (!result || result.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            error: 'Account does not exist',
          });
        }
        return result.rows[0];
      })
      .then(account => res.status(200).json({
        status: 200,
        data: {
          accountNumber: account.account_number,
          status: account.status,
        },
      }))
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
    const { accountNumber } = req.params;
    if (/[A-Za-z]+/g.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid account number',
      });
    }
    let { amount } = req.body;
    amount = parseFloat(amount);
    const { errors, isValid } = validateTransactionInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error: errors });
    }

    if (req.user.isStaff) {
      try {
        const account = await Account.findBy('account_number', accountNumber, res);
        if (!account || !account.rows.length) {
          return res.status(404).json({
            status: 404,
            error: 'Account does not exist',
          });
        }
        const update = await Account.findOneAndUpdate('account_number', accountNumber, {
          balance: amount + account.rows[0].balance,
        }, res);
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
    const { accountNumber } = req.params;
    if (/[A-Za-z]+/g.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid account number',
      });
    }
    let { amount } = req.body;
    amount = parseFloat(amount);
    const { error, isValid } = validateTransactionInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error });
    }

    if (req.user.isStaff) {
      try {
        const account = await Account.findBy('account_number', accountNumber, res);
        if (!account || !account.rows.length) {
          return res.status(404).json({
            status: 404,
            error: 'Account does not exist',
          });
        }

        if (amount > account.rows[0].balance) {
          return res.status(422).json({
            status: 422,
            error: 'Insuffient funds',
          });
        }
        const update = await Account.findOneAndUpdate('account_number', accountNumber, {
          balance: account.rows[0].balance - amount,
        }, res);
        const updatedAccount = update.rows[0];
        const transactionDetail = {
          type: 'debit',
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
    const { accountNumber } = req.params;
    if (/[A-Za-z]+/g.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid account number',
      });
    }
    if (!accountNumber) {
      res.status(400).json({
        status: 400,
        error: 'Account number not provided',
      });
    }

    Account.findOneAndDelete('account_number', parseInt(accountNumber, 10), res)
      .then((result) => {
        if (!result || !result.rows.length) {
          return res.status(404).json({
            status: 404,
            error: 'Account does not exist',
          });
        }
        return res.status(204).json({
          status: 204,
          data: result.rows,
        });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Something went wrong. Please try again.${err}`,
      }));
  },
};

export default AccountsController;
