const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();
const userRouter=require('./routes/user.js')
const authRouter=require('./routes/auth.route.js');
const cookieParser=require('cookie-parser')
const cors=require('cors');

app.use(cors());
app.use(express.json());
app.use(cookieParser);
 app.listen(3000,()=>{
    console.log("Server is running on port 3000");
 })
 app.use('/api/user',userRouter); 
 app.use('/api/auth',authRouter);
 app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message||"internal server error";
    return res.status(statusCode).json({message: message,success:false});
 })
