
const{User}=require('../models/usermodel.js');
const jwt=require('jsonwebtoken');
const SECRET='secret';
const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;
    const newUser=new User({username,email,password});
    try{
        await newUser.save()
        res.status(201).json({message:"user created successfully",success:true});
        
    }catch(error){
        next(error);
    }
   
};
const signin=async (req, res, next)=>{
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email:email});
        if(!validUser) return res.status(404).json({message:'user not found',success:false});
        if(password!=validUser.password) return res.status(401).json({message:'password is incorrect',success:false});
        const token=jwt.sign({id:validUser.id},SECRET);
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({token:token,success:true,user:validUser});
    }catch(error){
        next(error);
    }
}
const google=async (req,res,next)=>{
    try{
        const user=await User.findOne({email: req.body.email})
        if(user){
            const token=jwt.sign({id:user._id},SECRET);
            res.cookie('access_token',token,{httpOnly:true}).status(200).json({token:token,success:true,user:user})
        }else{
            const generatedPassword=Math.random().toString(36).slice(-8);
            const username=req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4)
            const newUser=new User({username:username,email:req.body.email,password:generatedPassword,avatar:req.body.photo})
            await newUser.save();
            const token=jwt.sign({id:newUser._id},SECRET);
            res.cookie('access_token',token,{httpOnly:true}).status(200).json({token:token,success:true,user:newUser})
        }

    }catch(error){
        next(error);
    }
}
module.exports={
    signup,
    signin,
    google,
    SECRET

};

