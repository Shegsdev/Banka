/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './isEmpty';

const validateTransactionInput = (data) => {
  const amount = String(data.amount);
  const errors = {};
  data.amount = !isEmpty(amount) ? amount : '';

  if (parseFloat(amount, 10) < 0.1) {
    errors.amount = 'Please enter a valid amount';
  }

  if (Validator.isEmpty(amount)) {
    errors.amount = 'Amount field cannot be blank';
  }

  if (!Validator.isDecimal(amount)) {
    errors.amount = 'Please enter a valid amount';
  }

  if (/[A-Za-z]+/g.test(amount)) {
    errors.amount = 'Please enter a valid amount';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTransactionInput;
