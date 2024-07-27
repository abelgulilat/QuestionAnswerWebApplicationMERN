import React, { useRef } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate()  
    const usernameValue = useRef()
    const firstnameValue = useRef()
    const lastnameValue = useRef()
    const emailValue = useRef()
    const passwordValue = useRef()

    const submitHandle = async (e) =>{
        e.preventDefault();
        console.log("signup")
        try {
            const res = await axios.post("http://localhost:5500/api/v1/users/register",{
                username:usernameValue.current.value,
                email:emailValue.current.value,
                firstname:firstnameValue.current.value,
                lastname:lastnameValue.current.value,
                password:passwordValue.current.value
            })
            
            alert("signupsss",res.data.msg)
            if(res.status == "200")
                navigate("/login")
            
        } catch (error) {
            console.log("something went wrong")
        }

    }

  return (
    <div className='signup'>
        <form className='formtwo' onSubmit={submitHandle} >
            <div>
                <p className='joinstatement'>Join to Ethiobytes Forum</p>
                <p>Already have an account?  <NavLink to={"/login"} className={"signupone"}>SignIn</NavLink></p>
            </div>
            <div>
                <input type='text' className='usernametwo' name='username' ref={usernameValue} id='username' placeholder='User Name'/>
            </div>
            <div className='fullname'>
                <input type='text' className='firstnametwo' name='firstname' ref={firstnameValue} id='firstname' placeholder='First Name'/>
                <input type='text' className='lastnametwo' name='lastname' ref={lastnameValue} id='lastname' placeholder='Last Name'/>
            </div>
            <div>
                <input type='text' className='emailtwo' name='email' ref={emailValue} id='email' placeholder='Email'/>
            </div>
            <div>
                <input type='text' className='passwordtwo' name='password' ref={passwordValue} id='password' placeholder='Password '/>
            </div>
            <div>
                <input type='submit'  className='signuptwo signupone' value='Agree and Join'   />
            </div>
            <div>
                <p>I agree to the <NavLink to={"#"} className={"signupone"}>Privacy Policy</NavLink> and <NavLink to={"#"} className={"signupone"}>terms of service</NavLink></p>
                <br/>
                <p><NavLink to={"/login"} className={"signupone"}>Already have account</NavLink></p>
            </div>
        </form>
    </div>
  )
}

export default Signup