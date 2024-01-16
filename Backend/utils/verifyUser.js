const jwt=require('jsonwebtoken');
const SECRET='secret';
const verifyToken=(req,res,next)=>{
    const token =req.cookies.access_token;
    if(!token) return res.status(401).json({message:'unauthorized'});

    jwt.verify(token,SECRET,(err,user)=>{
        if(err) return res.status(403).json({message:'forbidden'});
        req.user=user;
        next();
    });
}
module.exports=verifyToken;