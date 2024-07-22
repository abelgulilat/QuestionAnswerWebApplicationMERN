import express from "express"
import { userdisplay, userregister, returnusername, check } from "../controller/userReisterControl.js"
import {userlogin} from "../controller/userLoginController.js"
import auto from "../middleware/authMiddleware.js"
const router = express.Router();

router.get("/display",userdisplay)
router.post("/register", userregister)
router.get("/returnusername",auto, returnusername)
router.get("/check",auto, check)
router.post("/login",userlogin)

export default router

