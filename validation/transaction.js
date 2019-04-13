/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './isEmpty';

const validateCreateBankAccountInput = (data) => {
  let error;
  data.amount = !isEmpty(data.amount) ? data.amount : '';
  data.type = !isEmpty(data.type) ? data.type : '';

  if (Validator.isEmpty(data.amount)) {
    error = 'Amount field cannot be blank';
  }

  if (Validator.isEmpty(data.type)) {
    error = 'Please select a transaction type';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateCreateBankAccountInput;
