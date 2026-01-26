import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import "./styles/loginStyle.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/useAuth"; 

// type LogInFormsInputs = {
//   userName: string;
//   password: string;
// };

const validation = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
}).required();

type LogInFormsInputs = Yup.InferType<typeof validation>;
function Login() {
  const { loginUser } = useContext(UserContext); 

  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
}  = useForm<LogInFormsInputs>({ resolver: yupResolver(validation) as any});


  const handleLogin = (data: LogInFormsInputs) => {
    loginUser(data.userName, data.password);
  };

  return (
    <>
      <Header />
      <section className="looginSection">
        <div className="colummLogin">
          <h1 className="tittle">Log In</h1>
          <p className="subTittle">Welcome! Please enter your details.</p>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="firstInputt">
              <div className="inputGroupp">
                <input
                  type="text"
                  placeholder="Username"
                  {...register("userName")}
                />
                {errors.userName && <p className="errorMsg">{errors.userName.message}</p>}
              </div>
            </div>

            <div className="firstInputt">
              <div className="inputGroupp">
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && <p className="errorMsg">{errors.password.message}</p>}
              </div>
            </div>

            <button className="ButonAdd" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in…" : "Log in"}
            </button>

            <div className="formFooter">
              <p>Don’t have an account? <Link to="/signIn">Sign up</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;