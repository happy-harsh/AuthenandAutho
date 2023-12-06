const express = require('express'); //middleware
const cors = require('cors'); //helps to share resouces between unsimilar domain like 5000server and 3000client
const env= require('dotenv');
const app = express();
const {ConnectToMongoDB} = require("./connection");
const UserRouter = require('./routes/UserRoutes');
const cookieParser = require("cookie-parser")


// env variables
env.config()
const port = process.env.PORT;
const uri = process.env.URI;

// Middlewares
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Enable sending cookies with requests
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static('public'));

// view-engine
// app.set('view engine', 'ejs'); // Set EJS as the view engine
// app.set('views', __dirname + '/views'); // Set the directory for your views



// routes
app.use(UserRouter)




// Connection js
ConnectToMongoDB(uri,port);

// Server Start
app.listen(5000, ()=>{
  console.log("Server Started at port 5000");
})



// view routes
// app.get("/",(req, res) => res.render('home'))
// app.get("/smoothies",(req, res) => res.render('smoothies'))
// app.get("/loginPage",(req, res) => res.render('login'))
// app.get("/signupPage",(req, res) => res.render('signup'))

