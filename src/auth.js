const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const salt = 10;

const auth = {

    hash: async function (psw) {

        const saltRounds = 10;
      
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(psw, saltRounds, function(err, hash) {
                if (err) reject(err)
                    resolve(hash)
                });
            })
        });
      
        return hashedPassword
    },

    unhash: async function (resultPsw, sentPsw) {

        return new Promise(function(resolve, reject) {
            bcrypt.compare(sentPsw, resultPsw, function(err, res) {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    },

    token: async function (req) {

        dotenv.config();
        const payload = { email: req.body.email };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

        return token
    },

    checkToken: async function (req, res, next) {
        const secret = process.env.JWT_SECRET;

        const token = req.headers['x-access-token'];
        if (!token) {
            res.status(401)
        } 
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401)
            } else {
                return true
            }
            
        });
    }
}

module.exports = auth;


