const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
mongoose.connect("mongodb+srv://omtiwari123:8b1dwj0Nh0CmwGwz@cluster0.wjckru4.mongodb.net/");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
},{timestamps:true});

const User=mongoose.model('User',userSchema);

module.exports ={
    User
}