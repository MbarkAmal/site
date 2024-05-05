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

// login 
exports.login = async (req ,res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("wrong credentials");
    } else {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC,
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.password) {
        res.status(401).json("wrong credentials");
      } else {
        const accessToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" },
        );
        const { password, ...others } = user._doc;
        res.status(200).json({ user: others, accessToken });
        console.log(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// login to dash admin


exports.logindash = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ error: "Access forbidden. Admin credentials required." });
    }

    // Decrypt stored password
    const bytes  = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    // Compare decrypted password with input password
    if (originalPassword !== password) {
      return res.status(401).json({ error: "Wrong credentials" });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    // Send user object and token
    const { password: _, ...userData } = user._doc;
    res.status(200).json({ user: userData, accessToken });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: "Internal server error" });
  }
};


