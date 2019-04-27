/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateSignInInput = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be blank';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be blank';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignInInput;
