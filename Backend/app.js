import express from "express"
import userRouter from "./routes/userRoute.js"
import questionrouter from "./routes/userQuestionroutes.js"
import answerrouter from "./routes/userAnswer.js"
import auto from "./middleware/authMiddleware.js"

const app = express();
app.use(express.json());

app.use("/api/v1/users/",userRouter)
app.use("/api/v1/question/",questionrouter)
app.use("/api/v1/answer/",auto,answerrouter)


export default app;