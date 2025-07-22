const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');
const authRoutes=require('./routes/auth');
const postRoutes = require("./routes/postRoutes");

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", postRoutes);
app.use('/uploads', express.static('uploads'))

//MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log("MongoDB Connected"))
  .catch(err=>console.log(err));

app.listen(5000,console.log('Server Running at 5000'));