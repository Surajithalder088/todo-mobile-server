import express from "express"
const router=express.Router();
import { addTask, loginHandler, logout, profile, registerHandler, removeTask, resetPassword, updatedTask, updateUser } from "../controllers/User.js";
import { isAuthenticate } from "../middlewares/auth.middleware.js";

router.route("/register").post(registerHandler)
router.route("/login").post(loginHandler)
router.route("/logout").post(logout)
router.route("/addtask").post(isAuthenticate,addTask)
router.route("/removetask/:taskid").delete( isAuthenticate,removeTask)
router.route("/updatetask/:taskid").post( isAuthenticate,updatedTask)
router.route("/profile").get( isAuthenticate,profile)
router.route("/updateprofile").get( isAuthenticate,updateUser)
router.route("/reset-password").get( isAuthenticate,resetPassword)

export default  router;