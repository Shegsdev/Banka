import isEmpty from './isEmpty';

const validateSignUpInput = data => {
    let error;
    data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
    data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (isEmpty(data.firstname)) {
        error = 'First name cannot be blank.';
    }
    if (isEmpty(data.lastname)) {
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

module.exports = validateSignUpInput;
