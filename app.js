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
const apkurl="https://expo.dev/accounts/surajithalder088/projects/todo/builds/db9d8431-ff77-4998-9493-45b6f7294b07"
app.get("/",(req,res)=>{
    res.send(`to download the app apk file , visit here  in your mobile ${apkurl}`)


})


app.use("/api/user/v1",userRouter)