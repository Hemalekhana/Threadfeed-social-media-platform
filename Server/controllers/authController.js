const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
require('dotenv').config();

//NodeMailer Setup
const transporter=nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false 
    }

});

//signup Function
const signup=async (req, res )=>{
    try{
        const{username, email, password}=req.body;

        //checking if the user exists
        let user=await User.findOne({email});
        if (user) return res.status(400).json({message: "User already Exists"});

        //Hash Password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);

        user=new User({username, email, password: hashedPassword,  verified: false});
        await user.save();

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const verificationUrl= `http://localhost:5173/verify-email?token=${token}`;


        await transporter.sendMail({
            from: '"Threadfeed Support" <threadfeed47@gmail.com>', 
            to: email, // Recipient email
            subject: "Verify Your Email",
            html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
        }, (error, info) => {
            if (error) {
                console.error("❌ Email Error:", error);
            } else {
                console.log("✅ Email Sent Successfully:", info.response);
            }
        });  

        res.status(201).json({message: 'user Registered successfully'});
        } catch(error){
            console.error("signup-error:",error);
            res.status(500).json({error: 'Signup Failed'})
        }
};


//Email Verifiction Controller
const verifyEmail= async (req,res)=>{
    try{
        const {token}= req.query;
        console.log("Received Token in Backend:", token);

        const decoded=jwt.verify(token,process.env.JWT_SECRET);


        const user=await User.findOne({email: decoded.email});

        if(!user){
            return res.status(400).json({message: "Invalid token"});
        }

        user.verified=true;
        await user.save();


        res.status(200).json({message: "Email Verified Successfully"});
    } catch(error){
        res.status(400).json({message:"Invalid  or Expired token"});
    }
};

const login= async (req, res)=>{
    try{
        const {email,password}=req.body;

        //checks if user Exists
        let user=await User.findOne({email});
        if(!user) return res.status(400).json({message:'Invalid email'});

        if(!user.verified){
            return res.status(400).json({ message: "Please verify your email before logging in" });
        }
        const bcrypt = require('bcryptjs');
         // Debugging: Log passwords before comparison
         console.log("Entered Password:", password);
         console.log("Stored Hashed Password:", user.password);
        

        //compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid Password"});

        const token=jwt.sign({userId: user._id},process.env.JWT_SECRET,{expiresIn: '3h'});

        res.status(200).json({token,message:'Login SUccessful'});
    }catch(error){
        res.status(500).json({error:'Login Failed'});
    }
};


module.exports={signup, login, verifyEmail};