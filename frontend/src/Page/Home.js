import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import "../asstes/CSS/Login.css"
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from './Logout.js';
import {AppState} from "../App.js"
export const AppQuestion = createContext();

const Home =  () => {
const userid =  useContext(AppState)
const [questionidstate, setQuestionidstate] = useState();
const [temp, setTemp] = useState()
const [firstName, setFirstName] = useState()
console.log("thank you",userid.user)
const go = useNavigate()
const [result,setResult] = useState([]);
  useEffect(()=>{
    fetech();
    fetechusername();
},[])

  const fetechusername = async () =>{
    try {
      const token = localStorage.getItem("token")
      const {data} =  await axios.get("http://localhost:5500/api/v1/users/returnusername",{
      headers:{
        Authorization : "Bearer " + token
      }
    } )
    setFirstName(data.name[0].firstname)
    console.log("returnusername",data)

    } catch (error) {
      console.log("something went wrong")
      go("/login")
      
    }
  }

  const fetech = async ()=>{
    
    try {
      const token = localStorage.getItem("token")
      const {data} =  await axios.get("http://localhost:5500/api/v1/question/questiondisplay",{
      headers:{
        Authorization : "Bearer " + token
      }
    } )
      console.log("Home TiTle ",data)
      setResult(data.question);
  }

    catch (error) {
      go("/login")
      console.log("something went wrong")
    }
  }





  return (
    <AppQuestion.Provider value={{questionidstate,setQuestionidstate}}>
      <br/>
      <input type='button' className='logout' onClick={logout} value={"Logout"}/>
      <h1 className='welcome'>Welcome {firstName}</h1>
      <NavLink  to={"/askquestion"}> <input type='button' className={"ask"} value={"Ask Question"}/></NavLink>
      <br/><br/>
      
      <table className='qdisplay'>
        <tr className='toprow'>
            <td>USER ID</td>
            <td>TITLE</td>                   
        </tr>
        {result.map((item,index)=>(
                <tr >
                    <td>{item.userid}</td>
                    <td><NavLink to={`/qa/${item.questionid}`}> {item.title} </NavLink></td>                   
                </tr>
        ))}
      </table>

    </AppQuestion.Provider>
  )
}

export default Home