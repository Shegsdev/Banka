import Account from '../models/account';
import Transaction from '../models/transaction';

const TransactionsController = {
  /**
   * @description - Get all transactions of specific account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and data or error
   *
   * Route: POST: /accounts/:accountNumber/transactions
   *
   * */
  async findAll(req, res) {
    const { accountNumber } = req.params;
    if (/[A-Za-z]+/g.test(accountNumber)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid account number',
      });
    }
    if (!accountNumber || accountNumber.toString().length < 13) {
      return res.status(400).json({ status: 400, error: 'Invalid account number' });
    }
    try {
      const account = await Account.findBy('account_number', parseInt(accountNumber, 10), res);
      if (account.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'Account does not exist',
        });
      }
      if (account.rows[0].owner !== req.user.id) {
        return res.status(403).json({ status: 403, err: 'Unauthorized access' });
      }
      const transactions = await Transaction.findBy('account_number', parseInt(accountNumber, 10), res);
      return res.status(201).json({ status: 201, data: transactions.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, error: `Something went wrong. Please try again - ${err}` });
    }
  },

  /**
   * @description - Get a specific transaction of an account
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status code and data or error
   *
   * Route: POST: /transactions/:transactionId
   *
   * */
  async findOne(req, res) {
    const { transactionId } = req.params;
    if (!transactionId || !isFinite(transactionId)) {
      return res.status(400).json({ status: 400, error: 'Invalid transaction id' });
    }
    try {
      const transaction = await Transaction.findBy('transaction_id', parseInt(transactionId, 10), res);
      if (transaction.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          message: 'Transaction does not exist',
        });
      }

      const account = await Account.findBy('account_number', transaction.rows[0].account_number, res)
      if (account.rows[0].owner !== req.user.id) {
        return res.status(403).json({ status: 403, err: 'Unauthorized access' });
      }
      return res.status(200).json({
        status: 200,
        data: { 
          transactionId: transaction.rows[0].transaction_id,
          createdOn: transaction.rows[0].created_at,
          type: transaction.rows[0].type,
          accountNumber: transaction.rows[0].account_number,
          amount: transaction.rows[0].amount,
          oldBalance: transaction.rows[0].old_balance,
          newBalance: transaction.rows[0].new_balance,
        }
      });
    } catch (err) {
      return res.status(500).json({ status: 500, error: `Something went wrong. Please try again - ${err}` });
    }
  },
};

export default TransactionsController;
