import Account from '../models/account.model';
import Transaction from '../models/transaction.model';
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
    let { amount, cashier } = req.body;
    amount = parseFloat(amount);
    cashier = parseInt(cashier, 10);
    const { error, isValid } = validateTransactionInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    // Get cashier id - req.user is set in the verifyToken middleware
    // if (req.user.isStaff) {
    //   try {
    //    const newTransaction = await Transaction.creditAccount(req.body, accountNumber, req.user);
    //     return res.status(201).json({
    //       status: 201,
    //       data: {
    //         transactionId: newTransaction.id,
    //         accountNumber: newTransaction.accountNumber,
    //         amount: newTransaction.amount,
    //         cashier: newTransaction.cashier,
    //         transactionType: newTransaction.type,
    //         accountBalance: newTransaction.accountBalance,
    //       },
    //     });
    //   } catch (err) {
    //     return res.status(400).json({
    //       status: 400,
    //       error: `There was an error making new transaction ${err}`,
    //     });
    //   }
    // }
    const account = Account.findOne(accountNumber);
    const newBalance = (amount + parseFloat(account.balance)).toFixed(2);

    // Update account
    account.balance = newBalance;
    const data = { amount, cashier, newBalance };
    try {
      const newTransaction = await Transaction.creditAccount(data, accountNumber);
      return res.status(201).json({
        status: 201,
        data: {
          transactionId: newTransaction.id,
          accountNumber: newTransaction.accountNumber,
          amount: newTransaction.amount,
          cashier: newTransaction.cashier,
          transactionType: newTransaction.type,
          accountBalance: newTransaction.accountBalance,
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: `There was an error making new transaction ${err}`,
      });
    }
    // return res.status(401).json({
    //   status: 401,
    //   error: 'Unauthorized access',
    // });
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
    let { amount, cashier } = req.body;
    amount = parseFloat(amount);
    cashier = parseInt(cashier, 10);
    const { error, isValid } = validateTransactionInput(req.body);
    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    // Get cashier id - req.user is set in the verifyToken middleware
    // if (req.user.isStaff) {
    //   try {
    //    const newTransaction = await Transaction.debitAccount(req.body, accountNumber, req.user);
    //     return res.status(201).json({
    //       status: 201,
    //       data: {
    //         transactionId: newTransaction.id,
    //         accountNumber: newTransaction.accountNumber,
    //         amount: newTransaction.amount,
    //         cashier: newTransaction.cashier,
    //         transactionType: newTransaction.type,
    //         accountBalance: newTransaction.accountBalance,
    //       },
    //     });
    //   } catch (err) {
    //     return res.status(400).json({
    //       status: 400,
    //       error: `There was an error making new transaction ${err}`,
    //     });
    //   }
    // }
    const account = Account.findOne(accountNumber);
    if (amount > parseFloat(account.balance)) {
      return res.status(406).json({
        status: 406,
        error: 'Insuffient funds',
      });
    }
    const newBalance = (parseFloat(account.balance) - amount).toFixed(2);

    // Update account
    account.balance = newBalance;
    const data = { amount, cashier, newBalance };
    try {
      const newTransaction = await Transaction.debitAccount(data, accountNumber);
      return res.status(201).json({
        status: 201,
        data: {
          transactionId: newTransaction.id,
          accountNumber: newTransaction.accountNumber,
          amount: newTransaction.amount,
          cashier: newTransaction.cashier,
          transactionType: newTransaction.type,
          accountBalance: newTransaction.accountBalance,
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        error: `There was an error making new transaction ${err}`,
      });
    }
    // return res.status(401).json({
    //   status: 401,
    //   error: 'Unauthorized access',
    // });
  },
};

export default TransactionsController;
