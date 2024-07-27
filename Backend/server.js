import app from "./app.js"
import db from "./config/config.js"
import dotenv from "dotenv"
dotenv.config({path:"./config/config.env"})

const port = process.env.PORT || 8000;

const start = async ()=>{
    
    try{
        db.execute("select 'test'")

        app.listen(port);
        console.log("DATABASE CONNECTED")
        console.log(`server running at http://localhost:${port}`)
    } catch(err){
        console.log("something went wrong");
    }

}
start();