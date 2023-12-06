const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const env= require('dotenv');
env.config()
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

}

const generateJwtToken = (payload) => {
    const options = {
        expiresIn: '1hr' // Example expiration time
    };

    return jwt.sign(payload, secretKey, options);
    }
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
        res.status(200).json({message: "User Created Successfully"});
        
    } catch (err) {
        res.status(400).json(err);
    }
}

const handleLogin = async (req, res) => {
    const {email, password} = req.body;


    // find the user with email
    const user = await UserModel.findOne({email:email});
    if(!user){
        return res.status(400).send("no user found")
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
                location:user.location
              }; 
            const token = generateJwtToken(tokenPayload);

            // Send the token as a cookie with secure and HttpOnly flags
            res.cookie('jwt', token,{
                path:'/',
                // expires:new Date(Date.now()+1000*30),
                httpOnly:true,
                sameSite:'lax'
            });


            res.status(200).json({"message":"password matched",token:tokenPayload});
          } else {
            res.status(400).json({"message":"password did not matched"});
          }
      });

}

const handleGetAllUsers = async (req,res) => {
    const allUser = await UserModel.find({});

    try{
        res.status(200).send(allUser);
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = {
    handleCreateUser,handleLogin,handleGetAllUsers
}