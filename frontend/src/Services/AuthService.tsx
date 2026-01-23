
import axios from "axios"

import{ handleError } from "../ErrorHandler"
import { UserProfileToken } from "../Models/User";


const api="http://localhost:5165/backend/";

export const loginApi=async(username:string ,password:string)=>{
try{
    const data=await axios.post<UserProfileToken>(api+"Account/login",{
        username:username,
        password:password,
    });
    return data;
}
catch(error){
    handleError(error)
}
}

export const regitserApi=async(email:string,username:string ,password:string)=>{
try{
    const data=await axios.post<UserProfileToken>(api+"Account/register",{
        email:email,
        username:username,
        password:password,
    });
    return data;
}
catch(error){
    handleError(error)
}
}

function AuthService(){

    return(
        <>
        <h1>hello</h1>
        </>
    )
}
export default AuthService;