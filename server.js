import { app } from "./app.js";
import {config} from "dotenv"
import { connectDatabase } from "./config/database.js";
config({
    path:"./config/config.env"
})



connectDatabase()


app.listen(process.env.PORT || 3400,()=>{
    console.log(" server running on port "+process.env.PORT);
    
    
})