const express=require('express');
const {test,updateUser, deleteUser,getUserListings}=require('../controller/user.controller.js');
const { createListing ,getListings,deleteListing,updateListing,getListing} =require("../controller/listing.controller");
const router=express.Router();
const verifyToken=require('../utils/verifyUser');

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);

module.exports=router;