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
        return res.status(201).json({msg:"please fill required fieldsss"})
     const [data] = await db.query("select * from questions where title = ?",[title])
        if(data.length>0)
            return res.status(201).json({msg:"please enter the title again ",data:data})
// ________________________________________________________________________________________________________________________________________    

        // let temp = data.title
        // console.log("first", data)
        // let n2 = title.length
        // let n1 = temp.length
        
        // let textone = data.title.split(" ")
        // let texttwo = title.split(" ")

        // let count = 0;

        // for(let i = 0 ; i<n1;)
        // {
        //     for(let j = 0; j<n2;)
        //     {
        //         if(textone[i] == texttwo[j]){
        //             count ++;
        //         }
        //     }
        // }

        // let mark = count / n1
        // if (mark > 0.5)
        //     return res.status(201).json({msg:"The title you entered exist.."})
// ________________________________________________________________________________________________________________________________________    
    const { userid, username, email } = req.identity
    
    await db.query("insert into questions(userid,username,title,description) values(?,?,?,?)",[userid,username,title,description])

    try {
    // await db.query("insert into questions (questionid,userid,title,description) values(?,?,?,?)",[questionid,userid,title,description])
        return res.status(200).json({msg:"registered"})
        
    } catch (error) {
    console.log("kjdhk")

        return res.status(500).json({msg:"something went wrong"})
        
    }

}

export {questiondisplayforqa,questiondisplay,questionRegister}