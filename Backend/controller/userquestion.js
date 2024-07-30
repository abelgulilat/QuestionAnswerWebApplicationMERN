import db from "../config/config.js"

const questiondisplayforqa = async (req,res)=>{
    const questionid = req.params.questionid

    try {
        const [question] = await db.query("select description, userid, title from questions where questionid = ?",[questionid])
        return res.json({question})
    } catch (error) {
        return res.json({msg:"something went wrong"})
        
    }
} 
const questiondisplay = async (req,res)=>{
    try {
        const [question] = await db.query("select userid, username, questionid, title from questions order by questionid desc")
        return res.json({question})
    } catch (error) {
        return res.json({msg:"something went wrong"})
        
    }
} 

const questionRegister = async (req,res)=>{


    const {title,description} = req.body;
    if(!title||!description)
        return res.json({msg:"please fill required fieldsss"})
     const [data] = await db.query("select * from questions where title = ?",[title])
        if(data.length>0)
            return res.json({msg:"please enter the title again ",data:data})
    
    const { userid, username, email } = req.identity
    
    await db.query("insert into questions(userid,username,title,description) values(?,?,?,?)",[userid,username,title,description])

    try {
    // await db.query("insert into questions (questionid,userid,title,description) values(?,?,?,?)",[questionid,userid,title,description])
        return res.json({msg:"registered"})
        
    } catch (error) {
    console.log("kjdhk")

        return res.json({msg:"something went wrong"})
        
    }

}

export {questiondisplayforqa,questiondisplay,questionRegister}