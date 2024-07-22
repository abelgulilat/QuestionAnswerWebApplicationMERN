import React, { useRef, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { logout } from './Logout';

const Askquestion = () => {
  const go = useNavigate();
  const [title,setTitle] = useState();
  const handleDescription = useRef();

  
  
  const handleTitle = async (e) =>{
    e.preventDefault()
    setTitle(e.target.value)

  }

const submitHandle = async (e)=>{
    e.preventDefault()
    

    try {
      const token = localStorage.getItem("token")
      console.log("token",token)
      const data = await axios.post("http://localhost:5500/api/v1/question/questionregister",{
      title:title,
      description:handleDescription.current.value,
      
    },{
      headers:{
        Authorization:"Bearer " + token
      }
    }
  )
    alert(data.data.msg)
    go("/home")
    
    } catch (error) {
      go("/login")
      console.log("something went wrongs")

    }
}

  return (
    <div>
      <ul>
        <li>Summarize your problem in a one-line title.</li>
        <li>Describe your problem in more detail.</li>
        <li>Describe what you tried and what you expected to happen.</li>
        <li>Review your question and post it to the site.</li>

      </ul>
      <input type='button' onClick={logout} value={"Logout"}/>
      <form onSubmit={submitHandle} >
           
           <div>
               <input type='text' name='title' onChange={handleTitle} maxLength={30} id='title' placeholder='TITLE'/>
           </div>
           <div>
               <input type='text' name='Describition' ref={handleDescription} id='Describition' placeholder='Describition'/>
           </div>
           
           <div>
               <input type='submit' value='Question Submit'   />
           </div>
       </form>
    </div>
  )
}

export default Askquestion