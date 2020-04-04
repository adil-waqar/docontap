const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

const passwordValidity =  async (passwordEntered, validPassword) => {
    return await bcrypt.compare(passwordEntered, validPassword);
}

const generateToken = (user) => {
    return jwt.sign({ id:user.id }, 'jwtPrivateKey')
}

module.exports = {
    hashPassword,
    passwordValidity,
    generateToken
}