const { Router } = require("express");
const usersController = require("../controllers/user-controller");

const router = Router();

router.delete("/users/:email", usersController.deleteUser);
router.get("/all", usersController.getAllUsers);
router.post("/update", usersController.updateUser);

module.exports = router;