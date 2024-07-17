import express from "express"
import { userdisplay, userregister } from "../controller/userReisterControl.js"
import {userlogin} from "../controller/userLoginController.js"
import auto from "../middleware/authMiddleware.js"
const router = express.Router();

router.get("/display",userdisplay)
router.post("/register", userregister)
router.post("/login",userlogin)

export default router

