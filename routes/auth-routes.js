const { Router } = require("express");
const { validate, signupValRules, loginValRules } = require("../middleware/validator");
const authController = require("../controllers/auth-controller");

const router = Router();

router.get("/check", authController.check);
router.post("/signup", signupValRules(), validate, authController.signup);
router.post("/login", loginValRules(), validate, authController.login);
router.get("/logout", authController.logout);

module.exports = router;
