const { Router } = require("express");
const usersController = require("../controllers/user-controller");

const router = Router();

router.delete("/users/:email", usersController.deleteUser);
router.get("/all", usersController.getAllUsers);

module.exports = router;