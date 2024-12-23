import mongoose from "mongoose";

export const connectDatabase=async()=>{
 
   try{  const {connection}= await mongoose.connect(process.env.MONGODB_URI)
   console.log(`server connect to mongodb  ${connection.host}`);

   }catch(err){
    console.log(" failed to connectto database",err);
    
   }

}