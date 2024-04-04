export const regExp = {
  phone: new RegExp('[+]375\\d{9}'),
  cognitoPassword: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&/,><\’:;|_~`])\S{8,99}$/,
  ),
};
