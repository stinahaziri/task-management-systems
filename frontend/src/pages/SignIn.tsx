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
  userName: Yup.string().required("Username është i detyrueshëm"),
  email: Yup.string().email("Email jo-valid").required("Email është i detyrueshëm"),
  password: Yup.string().min(8, "Së paku 8 karaktere").required("Password është i detyrueshëm"),
});

function SignUp() {
  const { registerUser } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormsInputs>({ resolver: yupResolver(validation) as any });

  const handleRegister = (data: SignUpFormsInputs) => {
     const cleanUsername = data.userName.replace(/\s/g, "");
    registerUser(data.email, data.userName, data.password);
  };

  return (
    <>
      <Header />
      <section className="signInMainn">
        <div className="columSign">
          <h1 className="tittle">Sign Up</h1>
          <p className="descriptionText">Krijoni llogarinë tuaj.</p>

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
                {isSubmitting ? "Duke u regjistruar..." : "Krijo Llogarinë"}
              </button>
            </div>

            <div className="footerLink">
              <p>Keni llogari? <Link to="/login">Kyçuni këtu</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignUp;