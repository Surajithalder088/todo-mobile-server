import jwt from "jsonwebtoken"


export const sendToken=(res,user,statusCode,message)=>{
   
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.TOKEN_EXPIRE
    })
    const options={
        httpOnly:true,
        secure:false,
       
    }


    const userDate={
        _id:user._id,
        name:user.name,
        email:user.email,
        tasks:user.tasks
    }


    res.status(statusCode).cookie("token",token,options).json({success:true,message,user:userDate})
}