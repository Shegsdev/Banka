/* eslint-disable no-param-reassign */
import isEmpty from '../isEmpty';

const validateSignUpInput = (data) => {
  let error;
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (isEmpty(data.firstName)) {
    error = 'First name cannot be blank.';
  }
  if (isEmpty(data.lastName)) {
    error = 'Last name cannot be blank.';
  }
  if (isEmpty(data.email)) {
    error = 'Email cannot be blank.';
  }
  if (isEmpty(data.password)) {
    error = 'Password cannot be blank.';
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateSignUpInput;
