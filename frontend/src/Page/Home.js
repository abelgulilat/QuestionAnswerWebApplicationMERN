import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
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
    console.log("returnusername",data.name[0].firstname)

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
      // setQuestionidstate(data)
      console.log("user_id ",userid.user)
  }

    catch (error) {
      console.log("something went wrong")
    }
  
    
    
  }





  return (
    <AppQuestion.Provider value={{questionidstate,setQuestionidstate}}>
        {/* <h1>Welcome {userid.user.name[0].firstname}</h1> */}
      <input type='button' onClick={logout} value={"Logout"}/>

        <h1>Welcome {firstName}</h1>
      <NavLink to={"/askquestion"}> <input type='button' value={"Ask Question"}/></NavLink>

     
      <h1>{result.map((item,index)=>(
                <tr>
                    <td>{item.questionid}--- {item.title}----{item.userid} </td> 
                    <td><NavLink to={`/qa/${item.questionid}`}> {item.title} </NavLink></td>
                    
                </tr>
                 ))}</h1>

        <h2>{userid.user.email}</h2>
        <h2>{userid.user.userid}</h2>
    </AppQuestion.Provider>
  )
}

export default Home