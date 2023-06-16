import { useContext } from "react";
import { Button } from "..";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";


export const LoginButton = () => {
  const { userId, setUserId } = useContext(UserContext);
  const baseUrl = 'http://localhost:8080';
  const config = {
    headers:{
      "Content-Type": "application/json"
    }
  };  
let favList:any = [];

const getFav = () => {
  
axios.get(`${baseUrl}/getFavourites/${userId}`, 
    config).then((response)=>{
     favList = response.data; 
  }). catch (error=>
  alert("An error has occurred"));}


useEffect(() => {
  if(userId!=="") {
    getFav();
    }
  }, []);

  const handleLogin = () => {
    const id = userId ? "" : prompt("Enter User ID");
    setUserId(id ?? "");
  };
  return (
    <Button onClick={handleLogin} >
      {userId ? `Logout ${userId}` : "Login"}
    </Button>
 );
};
