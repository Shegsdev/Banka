/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './isEmpty';

const validateCreateBankAccountInput = (data) => {
  let error;
  data.amount = !isEmpty(data.amount) ? data.amount : '';

  if (Validator.isEmpty(data.amount)) {
    error = 'Amount field cannot be blank';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateCreateBankAccountInput;
