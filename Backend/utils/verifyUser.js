
const jwt=require('jsonwebtoken');
const SECRET='secret';
const verifyToken=(req,res,next)=>{
    const token =req.cookies.access_token;
    if(!token) return res.status(401).json({message:'unauthorized',token:token,success:false});

    jwt.verify(token,SECRET,(err,user)=>{
        if(err) return res.status(403).json({message:'forbidden',success:false});
        req.user=user;
        next();
    });
}
module.exports=verifyToken;