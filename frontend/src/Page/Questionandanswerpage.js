
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from "axios"
import { NavLink, useParams } from 'react-router-dom';
import { AppState } from '../App';
import { AppQuestion } from './Home';
import {logout} from "./Logout.js"

const Questionandanswerpage = () => {
    const questionid = useParams().title
    const questionidstate = useContext(AppQuestion)
    const [result,setResult] = useState([]);
    const [replay,setReplay] = useState([]);
    const [answers,setAnswer] = useState(" ");
    // const [questionsid, setId] = useState({})
    const {user} = useContext(AppState)
  useEffect(()=>{
    fetechQuestion();
    fetechAnswer();
  },[])
 
console.log("question and answer",questionid)
const token = localStorage.getItem("token")
  const fetechAnswer = async ()=>{
    try {
      const {data} =  await axios.get(`http://localhost:5500/api/v1/answer/answerdisplaytitleonly/${questionid}`,{
        headers:{
          Authorization:"Bearer " + token
        }
      })
      setReplay(data.question)
      console.log("fetechAnswer",data.question)
    } catch (error) {
       console.log("Something Went Wrong")
    }

  }

  const fetechQuestion = async ()=>{
    try {
      const token = localStorage.getItem("token")

      const {data} =  await axios.get(`http://localhost:5500/api/v1/question/questiondisplayqa/${questionid}`,{
        headers:{
          Authorization:"Bearer " + token
        }
      })
      setResult( data.question);
      console.log("question Display",data.question)
    } catch (error) {
      console.log("Something Went Wrong")
    }
  }

    const handleAnswer = async (e) =>{
    e.preventDefault();
    setAnswer(e.target.value)

    }

  const submitHandle = async (e) =>{
    e.preventDefault();
    try {
      const token = localStorage.getItem("token")
      const {data} = await axios.post(`http://localhost:5500/api/v1/answer/answerregister/${questionid}`,{
        
        answer:answers
    },{
      headers:{
        Authorization:"Bearer " + token
      }
    }
  )
  // setId(3)
  

    alert(data.msg)
    } catch (error) {
      console.log("something went wrong")
    }

  }
  return (
    <div>
      <h1>Question and answer page</h1>
{/* <NavLink to={"/askquestion"}>Ask Question</NavLink> */}
<input type='button' onClick={logout} value={"Logout"}/>

<h1>{result.map((item,index)=>(
                
                    <div>
                      <h1> {item.title } </h1> 
                    <h3> {item.description} </h3> 
              
                    </div>
                 ))}</h1>
<h3>{replay.map((item,index)=>(
                <ul>
                    <li> {item.answer} </li> 
                    
                </ul>
                 ))}</h3>



{/* <h2>{user}as</h2> */}
        <form onSubmit={submitHandle} >
           
           <div>
               <input type='text' name='Answer' onChange={handleAnswer} id='Answer' placeholder='Answer'/>
           </div>
           
           <div>
               
               <input type='submit' value='Answer Submit'   />
           </div>
       </form>
    </div>
  )
}

export default Questionandanswerpage