import db from "../config/config.js"

const answerdisplay = async (req,res)=>{
   try {
    const [answer] = await db.query("select * from answers")
    return res.json({answer})
   } catch (error) {
    return res.json({msg:"something went wrong"})
     
   }
} 

const answerRegister = async (req,res)=>{

    const {answerid,answer} = req.body;
    if(!answerid || !answer)
        return res.json({msg:"please fill required fields"})
    
    // console.log(user[0].userid)
    // const { userid, email } = req.user
    const userid = "2";
    const questionid = "4";
  
    try {
    await db.query("insert into answers (answerid,userid,questionid,answer) values(?,?,?,?)",[answerid,userid,questionid,answer])
        
        return res.json({msg:"answer submited"})
        
    } catch (error) {
        return res.json({msg:"something went wrong"})
        
    }

}

export {answerdisplay,answerRegister}