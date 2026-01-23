import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import "./styles/loginStyle.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UserContext } from "../Context/useAuth"; 

type LogInFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username është i detyrueshëm"),
  password: Yup.string().required("Password është i detyrueshëm"),
});

function Login() {
  const { loginUser } = useContext(UserContext); 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (data: LogInFormsInputs) => {
    loginUser(data.userName, data.password);
  };

  return (
    <>
      <Header />
      <section className="looginSection">
        <div className="colummLogin">
          <h1 className="tittle">Log In</h1>
          <p className="subTittle">Mirësevini! Ju lutem shënoni të dhënat tuaja.</p>

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
              {isSubmitting ? "Duke u kyçur..." : "Hyni"}
            </button>

            <div className="formFooter">
              <p>Nuk keni llogari? <Link to="/signIn">Regjistrohuni</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;