import db from "../config/config.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({path:"./config/config.env"})


const userlogin = async (req,res)=>{
    
    const {email,password} = req.body
    
    const data =[email,password]
    
    if(!email || !password)
        return res.status(201).json({msg:"please enter required fields. "})
// ------------------------------------------------------------------------------------------------------------------------------------
const [user] = await db.query("select userid, username, email, password from users where email=?  ",[email])
if(user.length == 0)
    return res.status(201).json({msg:"password or user name not correct"})
// ------------------------------------------------------------------------------------------------------------------------------------

    const isMatch = await bcrypt.compare(password, user[0].password);


    if(!isMatch || user.length == 0)
        return res.status(201).json({msg:"password or user name not correct"})
// ------------------------------------------------------------------------------------------------------------------------------------

        try {
            
        const userid = user[0].userid
        const email  = user[0].email
        const username  = user[0].username
console.log("now",username)
        const token  = await jwt.sign({email, userid, username},process.env.SECERET,{expiresIn:"1h"})
        return res.status(200).json({msg:"Login",token:token})

    } catch (error) {
        return res.json({msg:"something went wrong , try again"})
    }


}
export {userlogin}