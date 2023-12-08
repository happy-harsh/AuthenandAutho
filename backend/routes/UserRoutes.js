const express = require('express');
const UserModel = require('../models/userModel');
const { handleCreateUser, handleLogin,handleGetAllUsers ,handleLogout , handleGetUser} = require('../controllers/UserController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/signup",handleCreateUser);

router.post("/login",handleLogin);

router.get("/users",requireAuth,handleGetAllUsers);


router.get("/user",requireAuth,handleGetUser);

router.get("/logout",requireAuth,handleLogout);

router.delete('/deleteUsers', async (req, res) => {
    try {
      // Implement authentication and authorization logic here if needed
  
      // Delete all users from the database
      await UserModel.deleteMany({});
      res.status(200).json({ message: 'All users deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete users', error: error.message });
    }
  });

module.exports = router