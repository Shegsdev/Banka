/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './isEmpty';
// import User from '../server/models/user.model';

const validateCreateBankAccountInput = (data) => {
  let error;
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.type = !isEmpty(data.type) ? data.type : '';

  // const user = User.find(usr => usr.email === data.email) || null;
  // if (user === null) {
  //   error.notRegistered = 'You need to signup to create a bank account';
  // }

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

  if (Validator.isEmpty(data.type)) {
    error = 'Please select an account type';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateCreateBankAccountInput;
