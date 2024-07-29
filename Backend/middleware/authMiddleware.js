
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({path:"./config/config.env"})

const auto = async (req,res,next)=>{
    const autheader = req.headers.authorization;
    if (!autheader||!autheader.startsWith("Bearer"))
        return res.json({msg:"Authentication invalid"})
    console.log("i am reached there",autheader)

    const token = autheader.split(" ")[1];
    
    try {
        const { email, userid } = await jwt.verify( token, process.env.SECERET )
        req.identity = { email, userid } 
        next();
        
    } catch (error) {
        
        return res.status(201).json({msg:"something went wrong"})
    }

}

export default auto;