import Account from '../models/account';
import Transaction from '../models/transaction';
import validateTransactionInput from '../validation/transaction';

const TransactionsController = {
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

    // Get cashier id - req.user is set in the verifyToken middleware
    if (req.user.isStaff) {
      try {
        const account = await Account.findOne('account_number', accountNumber);
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
        res.status(400).json({
          status: 400,
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

    // Get cashier id - req.user is set in the verifyToken middleware
    if (req.user.isStaff) {
      try {
        const account = await Account.findOne('account_number', accountNumber);

        // Check balance
        if (amount > account.rows[0].balance) {
          return res.status(406).json({
            status: 406,
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
        res.status(400).json({
          status: 400,
          error: `There was an error making new transaction ${err}`,
        });
      }
    }

    return res.status(401).json({
      status: 401,
      error: 'Unauthorized access',
    });
  },

  async findByAccountNumber(req, res) {
    const { account } = req.params;
    try {
      const trans = await Transaction.findBy('account_number', parseInt(account, 10));
      return res.status(201).json({ status: 201, data: trans.rows });
    } catch (err) {
      return res.status(400).json({ status: 400, error: 'Record not found' });
    }
  },
};

export default TransactionsController;
