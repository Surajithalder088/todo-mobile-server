import express from "express";
import userRouter from"./routers/User.js"
import cookieparser from "cookie-parser"
import cors from "cors"

export const app=express()
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*",
     credentials:true,
     methods:"GET,POST,PUT,DELETE"   

}))
app.get("/",(req,res)=>{
    res.send("API is running")
})





app.use("/api/user/v1",userRouter)