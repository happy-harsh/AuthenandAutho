const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const secretKey = process.env.SK;

const handleHashPassword = (normalPassword) => {
  // Generate a salt
  return new Promise((resolve, reject) => {
    const saltRounds = 6;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(normalPassword, salt, (err, hashedPassword) => {
          if (err) {
            reject(err);
          } else {
            resolve(hashedPassword);
          }
        });
      }
    });
  });
};

const generateJwtToken = (payload) => {
  const options = {
    expiresIn: "1hr", // Example expiration time
  };

  return jwt.sign(payload, secretKey, options);
};
const handleCreateUser = async (req, res) => {
  const { email, location, password } = req.body;

  try {
    // Hash the password
    const hashedPass = await handleHashPassword(password);

    // Create the user object
    const newUser = {
      email: email,
      location: location,
      password: hashedPass,
    };

    // Save the user to the database
    await UserModel.create(newUser);

    // console.log("user created")
    // return res.render("/loginPage")
    res.status(200).json({ message: "User Created Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  // find the user with email
  const user = await UserModel.findOne({ email: email });
  if (!user) {
    return res.status(400).send("no user found");
  }

  let hashPasswordFromDB = user.password;

  bcrypt.compare(password, hashPasswordFromDB, (err, result) => {
    if (err) {
      console.log(err);
    }

    if (result) {
      // Generate JWT token
      // this user is from
      const tokenPayload = {
        userId: user._id,
        email: user.email,
        location: user.location,
      };
      const token = generateJwtToken(tokenPayload);

      // Send the token as a cookie with secure and HttpOnly flags
      res.cookie("jwt", token, {
        path: "/",
        // expires:new Date(Date.now()+1000*30),
        httpOnly: true,
        sameSite: "lax",
      });

      res
        .status(200)
        .json({ message: "password matched", token: tokenPayload });
    } else {
      res.status(400).json({ message: "password did not matched" });
    }
  });
};

const handleGetAllUsers = async (req, res) => {
  const allUser = await UserModel.find({});

  try {
    res.status(200).send(allUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const handleLogout = async (req, res) => {
  try {
    const cookies = req.headers.cookie;
    if (!cookies || !cookies.includes('jwt=')) {
      res.status(404).send({ message: "No token found" });
    } else {
      const token = cookies.split('jwt=')[1].split(';')[0]; // Extract token from cookies
      jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
          res.status(404).send({ message: "JWT is not authentic" });
        } else {
          // If token is authentic, clear the JWT cookie
          res.clearCookie('jwt');
          res.status(200).send({ message: "Logout successful" });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

const handleGetUser = async (req, res) => {
  const userId = req.id; // Assuming the user ID is passed as a route parameter
  // res.send(userId)

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};


module.exports = {
  handleCreateUser,
  handleLogin,
  handleGetAllUsers,
  handleLogout,
  handleGetUser
};
