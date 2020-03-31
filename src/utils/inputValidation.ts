import passwordValidator from "password-validator";

const isPasswordValid = (value: string) => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(30) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits() // Must have digits
    .has()
    .not()
    .spaces(); // Should not have spaces

  return schema.validate(value);
};

const isValidEmailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmail = (value: string) => !isValidEmailRegex.test(value);

const validateEqualValue = (valueToConfirm: string) => (value: string) => value !== valueToConfirm;

const validatePassword = (value: string) => !isPasswordValid(value);

const isValidEmail = (value: string) => !validateEmail(value);

export { validateEmail, validateEqualValue, isValidEmail, validatePassword, isPasswordValid };
