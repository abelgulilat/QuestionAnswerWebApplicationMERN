import db from "../config/config.js"

const questiondisplay = async (req,res)=>{
   try {
    const [question] = await db.query("select * from questions")
    return res.json({question})
   } catch (error) {
    return res.json({msg:"something went wrong"})
     
   }
} 

const questionRegister = async (req,res)=>{

    const {questionid,title,description} = req.body;
    if(!questionid||!title||!description)
        return res.json({msg:"please fill required fields"})
    const [data] = await db.query("select * from questions where title = ?",[title])
    if(data.length>0)
        return res.json({msg:"please enter the title again ",data:data})
    
    const { userid, email } = req.user
    // const userid = "6";
    await db.query("insert into questions (userid,questionid,title,description) values(?,?,?,?)",[userid,questionid,title,description])
  
    try {
        
        return res.json({msg:"registered"})
        
    } catch (error) {
        return res.json({msg:"something went wrong"})
        
    }

}

export {questiondisplay,questionRegister}