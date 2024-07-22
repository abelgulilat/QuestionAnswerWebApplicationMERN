import express from "express"
import {questiondisplayforqa, questiondisplay,questionRegister} from "../controller/userquestion.js"
import auto from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/questionregister",auto , questionRegister)
router.get("/questiondisplayqa/:questionid",auto , questiondisplayforqa)
router.get("/questiondisplay",auto , questiondisplay)

export default router