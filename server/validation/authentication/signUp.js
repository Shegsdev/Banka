/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from '../isEmpty';

const validateSignUpInput = (data) => {
  const errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name cannot be blank';
  }

  if (!Validator.isLength(data.firstName, { min: 3, max: 20 })) {
    errors.firstName = 'Please enter a valid name';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name cannot be blank';
  }

  if (!Validator.isLength(data.lastName, { min: 3, max: 20 })) {
    errors.lastName = 'Please enter a valid name';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email cannot be blank';
  }

  if (Validator.isLength(data.email, { min: 7 })) {
    errors.email = 'Email cannot be blank';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be atleast 6 characters';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password cannot be blank';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignUpInput;
