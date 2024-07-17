import db from "../config/config.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userdisplay = (req,res) =>{
    res.send("welcome");
}

const userregister = async (req,res) =>{
    const { userid, username, email, firstname, lastname, password } = req.body;
// ---------------------------------------------------------------------------------------------------
if(!userid||!username||!email||!firstname||!lastname||!password)
    return res.json({msg:"It cannot be a blank field."})
// ---------------------------------------------------------------------------------------------------
if(password.length<8)
    return res.json({msg:"The password cannot be less than 8."})
// ---------------------------------------------------------------------------------------------------


const [user] = await db.query("select username, email from users where username = ? or email = ?",[username, email])

if(user.length>0)
    return res.json({msg:"There's the same username or email.",user: user })
// ---------------------------------------------------------------------------------------------------

const salt = await bcrypt.genSalt(10);
const hashpass = await bcrypt.hash(password,salt);
// ---------------------------------------------------------------------------------------------------

try{
    await db.query("insert into users (userid,username,firstname,lastname,email,password) values (?,?,?,?,?,?)" ,[userid,username,firstname,lastname,email,hashpass])
    return res.json({ msg: "user registred successfully`````````" });

}catch(err){
    return res.json({msg:"something went wrong, try again"});
}
}




export { userdisplay, userregister }