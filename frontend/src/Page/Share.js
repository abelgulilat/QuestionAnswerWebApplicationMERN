import React from 'react'
import Home from './Home'
import { NavLink, Outlet } from 'react-router-dom'

const Share = () => {
  return (
    <div>
        <NavLink to={"/home"}>Home</NavLink>
        <Outlet/>
    </div>
  )
}

export default Share