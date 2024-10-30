const dotenv = require("dotenv").config("../.env");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const expiresIn = process.env.EXPIRES_IN;
/*------------------------------------------*/
// Creating Auth Class To Set All Methods
class Auth {
    async makeHash(password) {
        try {
            const salt = await bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hashSync(password, salt);
            return hashedPassword;
        } catch (error) {
            console.log("Error Hashing Password");
        }
    }
    async compareHashed(password, hashedPassword) {
        try {
            return await bcrypt.compareSync(password, hashedPassword);
        } catch (error) {
            console.log(error);
        }
    }
    async encodeJWT(payload) {
        return jwt.sign(payload, secretKey, { expiresIn });
    }
    async decodeJWT(token) {
        try {
            return jwt.verify(token, secretKey);
        } catch (err) {
            return null;
        }
    }
}

/*------------------------------------------*/
// Exported The Auth Classs
module.exports = new Auth();
