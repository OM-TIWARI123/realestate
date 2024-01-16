const { User } = require("../models/usermodel.js")

const test=(req,res) => {
    res.json({message:"test router"})
}
const updateUser=async (req,res,next)=>{
    if(req.user.id!=req.params.id) return res.status(401).json({message:"You can only Update Your own Account"})
    try{
        const updatedUser=await User.findByIdAndUpdate(req.user.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar

            }
        },{new:true})
        res.status(200).json({user:updatedUser})
    }
    
    catch(error){
        next(error)
    }
}
module.exports={test,updateUser}