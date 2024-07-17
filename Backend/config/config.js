
import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config({path:"./config/config.env"})

const db = mysql.createPool({
    user:process.env.USER,
    database:process.env.DATABASE,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    connectionLimit:process.env.LIMIT
})

export default db.promise();