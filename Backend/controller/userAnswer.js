import db from "../config/config.js"

const answerdisplaytitleonly = async (req,res)=>{
    const questionid = req.params.questionid
    console.log(questionid)
   try {
    const [question] = await db.query("select  userid, username, answer from answers  where questionid = ? order by answerid desc",[questionid])
    return res.json({question})
   } catch (error) {
    return res.json({msg:"something went wrong"})
     
   }
} 
const answerdisplay = async (req,res)=>{
   try {
    const [answer] = await db.query("select * from answers order by answerid desc ")
    return res.json({answer})
   } catch (error) {
    return res.json({msg:"something went wrong"})
     
   }
} 

const answerRegister = async (req,res)=>{

    const { userid, email, username } = req.identity
    const questionid = req.params.questionid
    const answer = req.body.answer
    console.log("answer ", answer.length)
    if(!answer||answer.length == 1)
        return res.json({msg:"please fill required fields"})
    
    await db.query("insert into answers (userid,username,questionid,answer) values(?,?,?,?)",[userid,username,questionid,answer])

    try {
        
        return res.json({msg:"answer submited"})
        
    } catch (error) {
        return res.json({msg:"something went wrong"})
        
    }

}

export {answerdisplaytitleonly, answerdisplay,answerRegister}