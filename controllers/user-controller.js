const User = require("../models/User");

const deleteUser = async (req, res) => {
    const reqEmail = req.params.email;
    await User.destroy({ where: { email: reqEmail } });
    res.json({ msg: "User removed" });
};

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

module.exports = {
    deleteUser,
    getAllUsers
}