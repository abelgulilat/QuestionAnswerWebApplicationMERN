import React from 'react'
import {Routes, Route} from "react-router-dom"
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Questionandanswerpage from './Questionandanswerpage'
import Askquestion from './Askquestion'
import Pagenotfound from './Pagenotfound'
import Share from './Share'

const Rou = () => {
  return (
    <div>
    
        <Routes>
            <Route path='/login' element={<Login/> }/>
            <Route path='/signup' element={<Signup/>}/>

            <Route path='/' element={ <Share/>}>
                <Route path='/home' element={<Home/>}/>
                <Route path='/qa/:title' element={<Questionandanswerpage/>}/>
                <Route path='/askquestion' element={<Askquestion/>}/>
            </Route>
            <Route path='*' element={<Pagenotfound/>}/>
        </Routes>
    </div>
  )
}

export default Rou