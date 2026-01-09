import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "./header";
import "./styles/signInStyle.css"; // Krijojmë këtë skedar për stilin

function SignIn() {
  const navigate = useNavigate();

  // State për të dhënat e login-it
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // DTO-ja që pret .NET-i (LoginRequestDto)
    const loginData = {
      Email: email,
      Password: password
    };

    try {
      // Porti 5165 siç e kishim te AddTask
      const response = await axios.post("http://localhost:5165/api/auth/login", loginData);

      // Ruajmë token-in që na kthen .NET (TokenResponseDto)
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        
        alert("Mirëseerdhët!");
        navigate("/"); // Të dërgon në Home pas kyçjes
      }
    } catch (error) {
      alert("Email ose fjalëkalimi është gabim!");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <section className="signInMainn">
        <div className="columSign">
          <h1 className="tittle">Sign In</h1>
          <p className="descriptionText">Shënoni email-in dhe fjalëkalimin për t'u kyçur.</p>

          <form onSubmit={handleSubmit}>
            <div className="firstInput">
              <div className="inputGroup">
                <input 
                  type="text" 
                  placeholder="First Name" 
                //   value={email} 
                //   onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

                 <div className="inputGroup">
                <input 
                  type="text" 
                  placeholder="Last Name" 
                //   value={email} 
                //   onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>

            </div>

            <div className="firstInput">
                <div className="inputGroup">
                <input 
                  type="email" 
                  placeholder="Email" 
                //   value={email} 
                //   onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="inputGroup">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
               
            </div>
<div className="butoniS">
            <button className="ButonAdd" type="submit">Log In</button>
</div>
            <div className="footerLink">
              <p>Nuk keni llogari? <Link to="/login">Regjistrohuni këtu</Link></p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SignIn;