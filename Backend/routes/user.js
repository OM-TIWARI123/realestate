const express=require('express');
const {test,updateUser}=require('../controller/user.controller.js');
const router=express.Router();
const verifyToken=require('../utils/verifyUser');

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser);


module.exports=router;