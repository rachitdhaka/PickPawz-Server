const JWT = require('jsonwebtoken');
const JWTKEY = process.env.JWTKEY;
const bcrypt = require('bcrypt')

const authMiddleware=(req , res , next)=>{
    const token = req.headers.token;

    if(!token){
        return res.status(403).json({
            message : "You are not signed in - No token provided"
        })
    }

    try{
        const decodedToken = JWT.verify(token , JWTKEY);

        if(decodedToken){
            req.userId= decodedToken.id;
            next();
        }
        else{
            res.status(403).json({
                message : "You are not signed in"
            })
        }
    }catch(error){
        return res.status(403).json({
            message : "Invalid token"
        })
    }
}

module.exports={
    authMiddleware
}
