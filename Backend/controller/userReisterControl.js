import db from "../config/config.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userdisplay = (req,res) =>{
    res.send("welcome");
}

const userregister = async (req,res) =>{
    const {username, email, firstname, lastname, password } = req.body;
    console.log("check")
// ---------------------------------------------------------------------------------------------------
if(!username||!email||!firstname||!lastname||!password)
    return res.status(201).json({msg:"It cannot be a blank fields."})
// ---------------------------------------------------------------------------------------------------
if(password.length<8)
    return res.status(201).json({msg:"The password cannot be less than 8."})
// ---------------------------------------------------------------------------------------------------


const [user] = await db.query("select username, email from users where username = ? or email = ?",[username, email])

if(user.length>0)
    return res.status(201).json({msg:"There's the same username or email.",user: user })
// ---------------------------------------------------------------------------------------------------

const salt = await bcrypt.genSalt(10);
const hashpass = await bcrypt.hash(password,salt);
// ---------------------------------------------------------------------------------------------------

try{
    await db.query("insert into users (username,firstname,lastname,email,password) values (?,?,?,?,?)" ,[username,firstname,lastname,email,hashpass])
    return res.status(200).json({ msg: "user registred successfully`````````" });

}catch(err){
    return res.json({msg:"something went wrong, try again"});
}
}
// ########################################################################################################
const returnusername = async (req,res)=>{
    const userid = req.identity.userid
    const [name] = await db.query("select firstname from users where userid = ?  ",[userid])
    return res.json({name})
}

const check = async (req,res) =>{
    const  { email, userid } = req.identity 
    const [name] = await db.query("select firstname from users where userid = ?  ",[userid])
    return res.json({email,userid,name})
}




export { userdisplay, userregister, returnusername, check }