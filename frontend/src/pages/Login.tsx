import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "./header";
import "./styles/loginStyle.css";

function Login() {
  // const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const loginData = {
  //     Email: email,
  //     Password: password,
  //   };

  //   try {
  //     const response = await axios.post("http://localhost:5165/backend/auth/login", loginData);

  //     // Ruajmë të dhënat që kthen serveri (Username, Role, Token)
  //     if (response.data) {
  //       localStorage.setItem("userRole", response.data.role);
  //       localStorage.setItem("userName", response.data.username);
        
  //       alert(`Mirëseerdhe ${response.data.username}!`);

  //       // Ridrejtimi sipas Rolit
  //       if (response.data.role === "Admin") {
  //         navigate("/"); // Faqja për Admin
  //       } else {
  //         navigate("/userManagment"); // Faqja për User (ajo me Progress)
  //       }
  //     }
  //   } catch (error) {
  //     alert("Email ose fjalëkalimi është gabim!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Header />
      <section className="looginSection">
        <div className="colummLogin">
          <h1 className="tittle">Log In</h1>
          <p className="subTittle">Mirësevini! Ju lutem shënoni të dhënat tuaja.</p>

{/* /onSubmit={handleLogin} */}
          <form > 
            <div className="firstInputt">
              <div className="inputGroupp">
                <input
                  type="email"
                  placeholder="Email Address"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="firstInputt">
              <div className="inputGroupp">
                <input
                  type="password"
                  placeholder="Password"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* <button className="ButonAdd" type="submit" disabled={loading}>
              {loading ? "Duke u kyçur..." : "Hyni"}
            </button> */}
             <button className="ButonAdd" type="submit">
              duke u kyqur
            </button>

            <div className="formFooter">
              <p>Nuk keni llogari ? <Link to="/signIn">Regjistrohuni</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;