/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './isEmpty';

const validateTransactionInput = (data) => {
  const errors = {};
  data.amount = !isEmpty(data.amount) ? data.amount : '';

  if (parseFloat(data.amount, 10) < 0.1) {
    errors.amount = 'Please enter a valid amount';
  }

  if (Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field cannot be blank';
  }

  if (!Validator.isDecimal(data.amount)) {
    errors.amount = 'Please enter a valid amount';
  }

  if (/[A-Za-z]+/g.test(data.amount)) {
    errors.amount = 'Please enter a valid amount';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateTransactionInput;
