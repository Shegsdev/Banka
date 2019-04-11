/* eslint-disable no-param-reassign */
import isEmpty from '../isEmpty';

const validateSignInInput = (data) => {
  let error;
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

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

export default validateSignInInput;
