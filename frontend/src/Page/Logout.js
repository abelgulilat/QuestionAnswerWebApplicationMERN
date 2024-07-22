import { useNavigate } from "react-router-dom"

const logout = () =>{

    localStorage.removeItem("token")
  }

  export {logout}