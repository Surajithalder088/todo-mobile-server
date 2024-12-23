import jwt from "jsonwebtoken"
import {User} from "../models/users.js"

export const isAuthenticate=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({message:" login first"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const user=await User.findById(decode._id)
        req.user=user
        next()

    }catch(err){
        res.status(500).json({message:" auth user not found",err})
    }
}