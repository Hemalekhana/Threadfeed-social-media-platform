const express=require('express');
const router=express.Router();
const { signup, login, verifyEmail} =require('../controllers/authController');
const authMiddleware=require('../middleware/authMiddleware');
const User=require('../models/User');
const { uploadProfile, uploadPost } = require("../multerConfig");
const Post = require("../models/Post");

router.post('/signup',signup);
router.get('/verify-email',verifyEmail);
router.post('/login', login);

router.get('/profile',authMiddleware,async (req, res)=>{
    try{
        const user=await User.findById(req.user.userId).select('-password');
    if(!user) return res.status(404).json({message: "User not found"});

    res.json(user);
    }catch(error){
        res.status(500).json({message:'server error'});
    }
});

router.post('/update-profile',authMiddleware,uploadProfile.single('profilePic'),async (req,res)=>{
    try{
        const {bio}=req.body;
        const user=await User.findById(req.user.userId);

        if(!user) return res.status(404).json({message: 'User not Found'});

        if(bio) user.bio=bio;
        if(req.file) user.profilePic=req.file.path;

        await user.save();

        res.json({
            message: 'Profile Updtaed Successfully',
            profilePic:user.profilePic,
            bio: user.bio
        });
    }catch(error){
        res.status(500).json({message :"server error"});
    }
});



// Search users by name or email
router.get("/search", authMiddleware, async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Find users whose name or email contains the query (case-insensitive)
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        }).select("username profilePic email");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});







module.exports=router;
