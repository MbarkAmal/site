const User = require ('../models/User') ;

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC,
        ).toString(),
      });
      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }

}