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
  validate
}