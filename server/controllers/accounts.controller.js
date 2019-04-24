/* eslint-disable consistent-return */
import User from '../models/user.model';
import Account from '../models/account.model';
import Transaction from '../models/transaction.model';
import validateCreateBankAccountInput from '../validation/bankAccount';

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
    const { error, isValid } = validateCreateBankAccountInput(req.body);
    if (!isValid) {
      return res.status(400).json({ status: 400, error });
    }

    const {
      firstName, lastName, email, type,
    } = req.body;

    const date = new Date();
    const accountNumber = date.getTime();

    User.findOne('email', email)
      .then((result) => {
        if (!result || result.rows.length < 1) {
          return res.status(401).json({
            status: 401,
            error: 'Please create a user account to continue',
          });
        }
        const accountDetail = {
          account_number: accountNumber,
          owner: result.rows[0].id,
          type,
        };

        return Account.save(accountDetail).then(data => data.rows[0])
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
    Account.findAll().then(accounts => res.status(200).json({
      status: 200, data: accounts.rows,
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
    Account.findBy('accountNumber', parseInt(req.params.accountNumber, 10))
      .then((account) => {
        if (!account) {
          return res.status(404).json({
            status: 404,
            error: 'Acount does not exist',
          });
        }
        return res.status(200).json({ status: 200, data: account.rows });
      });
  },

  /**
   * @description - Find transaction history of specific bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and data or error
   *
   * Route: GET: /accounts/:accountNumber/transaction
   *
   * */
  async getTransactions(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const transactions = await Transaction.findOne('account_number', accountNumber);

      if (!accountNumber || accountNumber.toString().length < 13) {
        return res.status(400).json({ status: 400, error: 'Invalid account number' });
      }
      return res.status(200).json({ status: 200, data: transactions.rows });
    } catch (err) {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'Could not fetch transactions',
        });
      }
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
    const { status } = req.body;
    if (!req.params.accountNumber || status === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'Account number or status not provided',
      });
    }

    return Account.findOneAndUpdate('account_number', parseInt(req.params.accountNumber, 10), { status })
      .then(result => result.rows[0])
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            status: 404,
            error: 'Account does not exist',
          });
        }
        return res.status(200).json({
          status: 200,
          data: {
            accountNumber: data.accountNumber,
            status: data.status,
          },
        });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Error updating account ${err}`,
      }));
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
      }));
  },
};

export default AccountsController;
