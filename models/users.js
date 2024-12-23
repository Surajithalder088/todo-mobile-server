import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        reuire:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    avatar:{
        public_id:String,
        url:String
    },

    createdAt:{
        type:Date,
        default:Date.now
    }
    ,
    tasks:[
        {
        title:String,
        description:String,
        complete:Boolean,
        createdAt:Date
    }],
    otp:{
       type: Number
    },

    otp_expiry:{
      type:  Date
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

        const hashPassword= await bcrypt.hash(this.password,10)
        this.password=hashPassword;
        next()
})

export const User=mongoose.model("user",userSchema)