const { User } = require("../models/usermodel.js")
const Listing = require("../models/listing.model");
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
const deleteUser=async (req,res,next)=>{
    if(req.user.id!==req.params.id) return res.json(401).json({message:"You can delete your own account!"})
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"user delted"});
    }catch(error){
        next(error);
    }
}
 const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        console.log(listings);
        res.status(200).json({listings});
      } catch (error) {
        next(error);
      }
    } else {
      return res.status(401).json({message:'you can only view your own listing'});
    }
  };
module.exports={test,updateUser,deleteUser,getUserListings}