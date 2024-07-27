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
        const res = await axios.post("http://localhost:5500/api/v1/users/login",{
        
          email:emailValue.current.value,
          password:passwordValue.current.value
          
      })
      if(res.status == "200")
        go("/home")

      alert(res.data.msg)
      localStorage.setItem("token",res.data.token)
      } catch (error) {
          alert ("Something went wrong")
      }
  }
  return (
    <div className='login'>
      
      <form className='formone' onSubmit={submitHandle} method='post'>
            <div className='top'>
                <p> Login to Your Account</p><br/>
                <p>Don't have Account? <NavLink to={"/signup"} className={"signupone"}>  Create a New Account</NavLink></p>
            </div>
            
            <div >
                <input type='text' name='email' ref={emailValue} className='emailone' id='email' placeholder='Email'/>
            </div>
            <div>
                <input type='text' name='password' ref={passwordValue} className='emailone' id='password' placeholder='Password '/>
            </div>
            <div>
                <input type='submit' className='signinone' value='Login'   />
            </div>
            <div>
                <NavLink to={"/signup"}  className={"signupone"}> <p className='signupone'>Create a New Account </p> </NavLink>
            </div>
      </form>
        <br/>
      

    </div>
  )
}


export default Login