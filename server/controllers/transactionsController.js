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
    if (!accountNumber || accountNumber.toString().length < 13) {
      return res.status(400).json({ status: 400, error: 'Invalid account number' });
    }
    try {
      const account = await Account.findBy('account_number', parseInt(accountNumber, 10));
      if (account.rows[0].owner !== req.user.id) {
        return res.status(403).json({ status: 403, err: 'Unauthorized access' });
      }
      const transactions = await Transaction.findBy('account_number', parseInt(accountNumber, 10));
      return res.status(201).json({ status: 201, data: transactions.rows });
    } catch (err) {
      return res.status(500).json({ status: 500, error: `Something went wrong. Please try again - ${err}` });
    }
  },
};

export default TransactionsController;
