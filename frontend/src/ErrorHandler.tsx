
import axios from "axios"
import {toast} from"react-toastify"



  export const handleError = (error:any) => {
    if (axios.isAxiosError(error)) {
      const err = error.response;

      // kur serveri kthen nje list me gabime
      if (Array.isArray(err?.data.errors)) {
        for (let val of err?.data.errors) {
          toast.warning(val.description);
        }
      } 
      //nese sereri kthen nje objekt me gabime si psh alidimet e formes e qisi seene

      else if (typeof err?.data.errors === "object") {
        for (let e in err?.data.errors) {
          toast.warning(err.data.errors[e][0]);
        }
      } 
      // kru serveri e kthen nje msg te thjesht
      else if (err?.data) {
        toast.warning(err.data);
      } 
      // nese perdorusi so i autorizum - Statusi 401
      else if (err?.status === 401) {
        toast.warning("Please log in");
        window.history.pushState({}, "LoginPage", "/login");
      } 
      //gabimet e tjera
      else if (err) {
        toast.warning(err?.data);
      }
    }
  };

function ErrorHandler() {
  }
export default ErrorHandler;