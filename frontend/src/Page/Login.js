import React, { useRef } from 'react'
import "../asstes/CSS/Login.css"
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
  const go = useNavigate()
  const emailValue =useRef()
    const passwordValue =useRef()

    const submitHandle = async (e) =>{
      e.preventDefault();
      console.log(emailValue.current.value)
      try {
        const {data} = await axios.post("http://localhost:5500/api/v1/users/login",{
         
          email:emailValue.current.value,
          password:passwordValue.current.value
      })
      go("/home")

     alert(data.msg)
     localStorage.setItem("token",data.token)
      } catch (error) {
          alert ("Something went wrong")
      }
  }
  return (
    <div>
      <form className='formone' onSubmit={submitHandle} >
            
            <div >
                <input type='text' name='email' ref={emailValue} className='emailone' id='email' placeholder='Email'/>
            </div>
            <div>
                <input type='text' name='password' ref={passwordValue} className='emailone' id='password' placeholder='Password '/>
            </div>
            <div>
                <input type='submit' className='signinone' value='Signin'   />
            </div>
            <div>
                <NavLink to={"/signup"}  > <p className='signupone'>Create a New Account </p> </NavLink>
            </div>
      </form>
        <br/>
       

    </div>
  )
}


export default Login