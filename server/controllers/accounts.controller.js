import Account from '../models/account.model';
import validateCreateBankAccountInput from '../../validation/bankAccount';

const AccountsController = {
  /**
   * @description - Create bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
   *
   * Route: POST: /accounts
   *
   * */
  async create(req, res) {
    const { error, isValid } = validateCreateBankAccountInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    const newAccount = await Account.create(req.body);
    return res.status(201).json({
      status: 201,
      data: {
        accountNumber: newAccount.accountNumber,
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
        email: newAccount.email,
        type: newAccount.type,
        openingBalance: newAccount.balance,
      },
    });
  },

  /**
   * @description - Find all bank accounts
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
   *
   * Route: GET: /accounts
   *
   * */
  findAll(req, res) {
    const accounts = Account.findAll();
    return res.status(200).json({
      status: 200,
      data: accounts,
    });
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
    const account = Account.findOne(parseInt(req.params.accountNumber, 10));
    if (!account) {
      return res.status(404).json({
        status: 404,
        error: 'Acount does not exist',
      });
    }
    return res.status(200).json({
      status: 200,
      data: account,
    });
  },

  /**
   * @description - Activate a specific bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
   *
   * Route: PATCH: /account/:accountNumber/activate
   *
   * */
  changeStatus(req, res) {
    const { status } = req.body;
    if (!req.params.accountNumber || status === undefined) {
      return res.status(206).json({
        status: 206,
        error: 'Account number or status not provided',
      });
    }

    const account = Account.changeStatus(parseInt(req.params.accountNumber, 10), status);
    if (account == null) {
      return res.status(404).json({
        status: 404,
        error: 'Account does not exist',
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        accountNumber: account.accountNumber,
        status: account.status,
      },
    });
  },

  /**
   * @description - Delete a specific bank account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and or error
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

    const account = Account.delete(parseInt(req.params.accountNumber, 10));
    return res.status(200).json({
      status: 200,
      data: account,
    });
  },
};

export default AccountsController;
