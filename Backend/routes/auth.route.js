const express=require('express');
const mongoose=require('mongoose');
const {signup,signin,google}=require('../controller/auth.controller.js');
const router= express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);


module.exports = router;