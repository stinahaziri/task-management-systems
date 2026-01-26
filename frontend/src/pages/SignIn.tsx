import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import "./styles/signInStyle.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/useAuth";

type SignUpFormsInputs = {
  userName: string;
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "At least 8 characters").matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
});

function SignUp() {
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    setError, 
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormsInputs>({ 
    resolver: yupResolver(validation) as any,
    mode: "onTouched" 
  });

  
  const handleRegister = async (data: SignUpFormsInputs) => {
    try {

      const cleanUsername = data.userName.replace(/\s/g, "");
      
      
      await registerUser(data.email, cleanUsername, data.password);
      
    } catch (error: any) {
   
      setError("userName", {
        type: "manual",
        message: "This username is already taken",
      });
    }
  };


  return (
    <>
      <Header />
      <section className="signInMainn">
        <div className="columSign">
          <h1 className="tittle">Sign Up</h1>
          <p className="descriptionText">Create your account.</p>

          <form className="forma" onSubmit={handleSubmit(handleRegister)}>
            <div className="inputGroupSignn">
              <input type="text" placeholder="Username" {...register("userName")} />
              {errors.userName && <p className="errorMsg">{errors.userName.message}</p>}
            </div>

            <div className="inputGroupSignn">
              <input type="email" placeholder="Email" {...register("email")} />
              {errors.email && <p className="errorMsg">{errors.email.message}</p>}
            </div>

            <div className="inputGroupSignn">
              <input type="password" placeholder="Password" {...register("password")} />
              {errors.password && <p className="errorMsg">{errors.password.message}</p>}
            </div>

            <div className="butoniS">
              <button className="ButonAdd" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Sign up"}
              </button>
            </div>

            <div className="footerLink">
              <p>Already have an account? <Link to="/login">Log in here</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;