const { check, validationResult } = require("express-validator");

const signupValRules = () => {
  return [
    check("firstname", "First Name should be at least 2 characters").isLength({ min: 2 }),
    check("surname", "Surname should be at least 2 characters").isLength({ min: 2 }),
    check("email", "Email is not valid").isEmail(),
    check("email", "Email should be in lower case").isLowercase(),
    check("password", "Min password length should be 3 characters").isLength({ min: 3 })
  ];
}

const loginValRules = () => {
  return [
    check("email", "Email is not valid").isEmail(),
    check("password", "Min password length should be 3 characters").isLength({ min: 3 })
  ];
}

const updateValRules = () => {
  return [
    check("street1", "Seems like street name is too short").isLength({ min: 3 }),
    check("phone", "Phone number should be minimum 10 digits").isLength({ min: 10 }),
    check("phone", "Phone number should be maximum 15 digits").isLength({ max: 15 })
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    errors: errors.array()
  });
}

module.exports = {
  signupValRules,
  loginValRules,
  updateValRules,
  validate
}