import { createContext, useEffect, useState } from "react";
import Rou from "./Page/Rou"
import axios from "axios"
import { useNavigate } from "react-router-dom";
export const AppState = createContext();

function App() {
  const [user, setUser] = useState([])
  const go  = useNavigate()

  const checkuser = async () =>{
  try {
    console.log("Appjs frontend")
    const token = localStorage.getItem("token")
    const {data} = await axios.get("http://localhost:5500/api/v1/users/check",{
      headers:{
        Authorization:"Bearer " + token
      }
    })
    console.log("Appjs",data)
    setUser(data)
  } catch (error) {
        go("/login")
  }
  }
  useEffect(()=>{
    checkuser()
  },[])
  return (
    <AppState.Provider value={{user, setUser}}>
      <Rou  />
    </AppState.Provider>
  );
}

export default App;
