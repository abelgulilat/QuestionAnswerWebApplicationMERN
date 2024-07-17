
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path:"./config/config.env"})

const auto = async (req,res,next)=>{
    const autheader = req.headers.authorization;
    if (!autheader)
        return res.json({msg:"Authentication invalid"})
    const token = autheader;
    const { email, userid } = jwt.verify( token, process.env.SECERET )
    console.log(email,userid)
    
    try {
        next();
        
    } catch (error) {
        return res.json({msg:"something went wrong"})
    }

}

export default auto;