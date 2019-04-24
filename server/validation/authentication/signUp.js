/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateSignUpInput = (data) => {
  let error;
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.firstName)) {
    error = 'First name cannot be blank';
  }

  if (Validator.isEmpty(data.lastName)) {
    error = 'Last name cannot be blank';
  }

  if (!Validator.isEmail(data.email)) {
    error = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    error = 'Email cannot be blank';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    error = 'Password must be atleast 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    error = 'Password cannot be blank';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateSignUpInput;
