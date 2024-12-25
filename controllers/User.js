import { User } from "../models/users.js";
import { sendMail } from "../utils/sendmail.js";
import { sendToken } from "../utils/sendToken.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export const registerHandler=async(req,res)=>{
  

    try{
        const {name,email,password}=req.body
        const existing =await User.findOne({email:email})
        if(existing){
            return res.status(400).json({message:"user already exists",existing})
        }
        const otp=Math.floor(Math.random()*1000000)
        const user=await User.create({name,email,password,otp})
       // await sendMail(email,"Verify your account",`your OTP is :${otp}`)
        //sendToken(res,user,200,"otp send to email")
         const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
            const options={
                httpOnly:true,
                secure:false,
               maxAge:60*60*1000
            }
            res.status(200).cookie("token",token,options).json({success:true,message:"account created",user:user})

    }catch(error){
        res.status(500).json({message:"server error",error})
    }
    
}


export const loginHandler=async(req,res)=>{
    const {email,password}=req.body;
try{

    const user =await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message:"wrong credentials"})
        }
        const ismatch=  await bcrypt.compare(password,user.password)
        
        
        if(!ismatch){
            return res.status(400).json({message:"wrong  p credentials"})
        }
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
        const options={
            httpOnly:true,
            secure:false,
           maxAge:60*60*1000
        }
        res.status(200).cookie("token",token,options).json({success:true,message:"logged in successfully",user:user})
            

            }catch(error){
                res.ststus(500).json({messgae:"internal error",error})
            }
}

export const logout=async (req,res)=>{
    try{
        res.status(200).cookie("token",null,{
            httpOnly:true
        }).json("log out")

    }catch(error){
        res.status(500).json(error)
    }
}

export const addTask=async(req,res)=>{
    try{
        const {title,description}=req.body;
        const user=await User.findById(req.user._id)
        user.tasks.push({title,description,complete:false,createdAt:new Date(Date.now())})
        await user.save()
        res.status(200).json({success:true,message:"task added new ",user})

    }catch(error){
        res.status(500).json({Pmessage:" failed to add new task",error})
    }
 
}



export const removeTask=async(req,res)=>{
    try{
        const {taskid}=req.params;
        const user=await User.findById(req.user._id)
       user.tasks= user.tasks.filter(task=>task._id!=taskid)
        await user.save()
        res.status(200).json({success:true,message:"task removed "})

    }catch(error){
        res.status(500).json({message:" failed to delete task ",error})
    }
}

export const updatedTask=async(req,res)=>{
    try{
        const {taskid}=req.params;
        const user=await User.findById(req.user._id)
       let task= user.tasks.find((task)=>task._id.toString() ===taskid.toString())
      task.complete=!task.complete
        await user.save()
        res.status(200).json({success:true,message:"task updated ",task})

    }catch(error){
        res.status(500).json({message:" failed to update ",error})
    }
}

export const profile=async(req,res)=>{
    try{
        
        const user=await User.findById(req.user._id).select("-password")
      if(!user){
        return res.status(404).json({message:" failed to get user "})
      }
        res.status(200).json({success:true,message:"user profile ",user})

    }catch(error){
        res.status(500).json({message:" failed to get profile ",error})
    }
}

export const updateUser=async(req,res)=>{
    try{
        
        const user=await User.findById(req.user._id).select("-password")
      if(!user){
       return  res.status(404).json({message:" failed to get user "})
      }

      const {name,avatar}=req.body;
      if(name){
        user.name=name;
      }
      if(avatar){
        user.avatar.url=avatar
      }
     await user.save()
        res.status(200).json({success:true,message:"user profile updated ",user})

    }catch(error){
        res.status(500).json({message:" failed to update profile ",error})
    }
}

export const resetPassword=async(req,res)=>{
    try{
        if(!req.user){
            return res.status(404).json({message:" login first "})
        }
        const {password}=req.body
        const user =await User.findById(req.user._id)
        if(!user){
            return res.status(404).json({message:" failed to get user "})
          }

       user.password=password
          await user.save()
          //await sendMail(email,"Verify your email to reset password",`your OTP is :${otp}   -- will expire is 5 minutes`)
          res.status(200).json({message:"password changed"})
            // under construction for mail varification

    }catch(error){
        res.status(500).json({message:" failed to reset password  ",error})
    }
}