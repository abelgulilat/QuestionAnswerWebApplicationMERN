import express from "express"
import {questiondisplay,questionRegister} from "../controller/userquestion.js"
import auto from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/questionregister",auto , questionRegister)
router.get("/questiondisplay",auto , questiondisplay)

export default router