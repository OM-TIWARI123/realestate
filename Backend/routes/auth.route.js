const express=require('express');
const mongoose=require('mongoose');
const {signup,signin,google,signOut}=require('../controller/auth.controller.js');
const router= express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/google',google);
router.get('/signout',signOut);


module.exports = router;