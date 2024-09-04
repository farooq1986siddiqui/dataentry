import express from "express"
import {  addTask, completeTask, deleteTask, getTodo, login, signUp, updateTask } from "../adminController/adminController.js";
import { checkLogin } from "../middleware/authenticationMiddleware.js";

const router = express.Router();


router.post("/login", login);
router.post("/signup", signUp);
router.post("/addtask",checkLogin, addTask);
router.post("/deletetask",checkLogin, deleteTask);
router.post("/updatetask",checkLogin, updateTask);
router.post("/completetask",checkLogin, completeTask);
router.post("/gettodo",checkLogin, getTodo);



export default router