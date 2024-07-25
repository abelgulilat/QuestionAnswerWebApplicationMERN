import React, { useRef } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate()  
    const usernameValue =useRef()
    const firstnameValue =useRef()
    const lastnameValue =useRef()
    const emailValue =useRef()
    const passwordValue =useRef()

    const submitHandle = async (e) =>{
        e.preventDefault();
        console.log("signup")
        const {data} = await axios.post("http://localhost:5500/api/v1/users/register",{
            username:usernameValue.current.value,
            email:emailValue.current.value,
            firstname:firstnameValue.current.value,
            lastname:lastnameValue.current.value,
            password:passwordValue.current.value
        })
       alert(data.msg)
        console.log(usernameValue.current.value)
        navigate("/login")

    }

  return (
    <div>
        <form className='formtwo' onSubmit={submitHandle} >
            <div>
                <input type='text' className='usernametwo' name='username' ref={usernameValue} id='username' placeholder='User Name'/>
            </div>
            <div>
                <input type='text' className='firstnametwo' name='firstname' ref={firstnameValue} id='firstname' placeholder='First Name'/>
            </div>
            <div>
                <input type='text' className='lastnametwo' name='lastname' ref={lastnameValue} id='lastname' placeholder='Last Name'/>
            </div>
            <div>
                <input type='text' className='emailtwo' name='email' ref={emailValue} id='email' placeholder='Email'/>
            </div>
            <div>
                <input type='text' className='passwordtwo' name='password' ref={passwordValue} id='password' placeholder='Password '/>
            </div>
            <div>
                <input type='submit'  className='signuptwo' value='Signup'   />
            </div>
        </form>
    </div>
  )
}

export default Signup