const User = require("../models/User");

const deleteUser = async (req, res) => {
    const reqEmail = req.params.email;
    const user = await User.destroy({ where: { email: reqEmail } });
    if (!user) return res.status(422).json({ errors: [{ msg: "User not found" }] });
    res.json({ msg: "User removed" });
};

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

const updateUser = async (req, res) => {
    const { email, firstname, surname } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(422).json({ errors: [{ msg: "User not found" }] });
    const prev = `${user.firstname} ${user.surname}`;
    const curr = `${firstname} ${surname}`;
    user.set({
        firstname,
        surname
    });
    await user.save();
    
    res.json({ msg: `${prev} has been changed to ${curr}` });
}

module.exports = {
    deleteUser,
    getAllUsers,
    updateUser
}