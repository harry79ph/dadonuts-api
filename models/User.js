// MODAL We are creating User table here
const { Model, DataTypes, Sequelize } = require("sequelize");

const sequelize = new Sequelize("dadonuts-db", "user", "pass", {
    dialect: "sqlite",
    host: "./users.sqlite"
});

sequelize.sync({force: false}).then(() => console.log("db is ready"));

class User extends Model {}

User.init({
    firstname: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize,
    modelName: "user",
    timestamps: true
});

module.exports = User;
