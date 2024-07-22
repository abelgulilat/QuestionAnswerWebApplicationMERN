import React, { useRef } from 'react'
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
       <form onSubmit={submitHandle} >
           
            <div>
                <input type='text' name='email' ref={emailValue} id='email' placeholder='Email'/>
            </div>
            <div>
                <input type='text' name='password' ref={passwordValue} id='password' placeholder='Password '/>
            </div>
            <div>
                <input type='submit' value='Signin'   />
            </div>
        </form>
        <br/>
        <div>
                <NavLink to={"/signup"}>  SIGNUP</NavLink>
            </div>

    </div>
  )
}


export default Login