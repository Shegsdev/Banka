/* eslint-disable no-param-reassign */
import Validator from 'validator';
import isEmpty from './isEmpty';

const validateCreateBankAccountInput = (data) => {
  const errors = {};
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.type = !isEmpty(data.type) ? data.type : '';

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

  if (Validator.isEmpty(data.type)) {
    errors.type = 'Please select an account type';
  }

  if (!Validator.equals(data.type, 'current') && !Validator.equals(data.type, 'savings')) {
    errors.type = 'Please select a valid account type';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateCreateBankAccountInput;
