import express from "express"
import {answerdisplaytitleonly,answerdisplay,answerRegister} from "../controller/userAnswer.js"

const route = express.Router();

route.get("/answerdisplaytitleonly/:questionid",answerdisplaytitleonly)
route.get("/answerdisplay",answerdisplay)
route.post("/answerregister/:questionid",answerRegister)

export default route;