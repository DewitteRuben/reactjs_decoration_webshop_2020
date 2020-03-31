import passwordValidator from "password-validator";

const passwordValidationSchema = new passwordValidator();
passwordValidationSchema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .not()
  .spaces(); // Should not have spaces

const isValidEmailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmail = (value: string) => !isValidEmailRegex.test(value);

const validateEqualValue = (valueToConfirm: string) => (value: string) => value !== valueToConfirm;

const validatePassword = (value: string) => !passwordValidationSchema.validate(value);

export { validateEmail, validateEqualValue, isValidEmailRegex, validatePassword, passwordValidationSchema };
