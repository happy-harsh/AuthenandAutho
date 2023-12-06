const jwt = require("jsonwebtoken")
const env= require('dotenv');
env.config()
const secretKey = process.env.SK;
const requireAuth = (req,res,next) => {
    // here the req must also have cookie with it
    const cookies = req.headers.cookie;


    if (!cookies) {
        return res.status(401).send({ message: "No cookies found" });
    }

    const tokenCookie = cookies.split(';')
        .find(cookie => cookie.trim().startsWith('jwt='));

    if (!tokenCookie) {
        return res.status(401).send({ message: "No token found" });
    }

    const token = tokenCookie.split('=')[1];

    // console.log(token)
    if(!token){
        // res.redirect("/LoginPage")
        res.status(404).send({message:"no token found"})
    }else{
        jwt.verify(token,secretKey,(err, decodedToken)=>{
            if(err){
                res.status(404).send({message:"jwt is not authentic"})
            }else{
                // console.log(decodedToken);
                next();
            }
        })
    }
}

module.exports = {
    requireAuth
}