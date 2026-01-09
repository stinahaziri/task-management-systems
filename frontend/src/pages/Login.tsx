import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "./header"; // Header-i që përdor në faqe tjera
import "./styles/loginStyle.css";

function Login() {
  const navigate = useNavigate();

  // State për LoginRequestDto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Objektin qe pret .neti (LoginRequestDto)
    const loginData = {
      Email: email,
      Password: password,
    };

    try {
      // Thirrja e API-t në portin 5165 (siç e kishim te AddTask)
      const response = await axios.post("http://localhost:5165/api/auth/login", loginData);

      // Ruajtja e Token-it (TokenResponseDto)
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        
        alert("Kyçja u krye me sukses!");
        navigate("/"); // Shko te faqja kryesore
      }
    } catch (error) {
      alert("Email ose fjalëkalimi i gabuar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <section className="looginSection">
        <div className="colummLogin">
          <h1 className="tittle">Log In</h1>
          <p className="subTittle">Mirësevini përsëri! Ju lutem shënoni të dhënat.</p>

          <form onSubmit={handleSubmit}>
            <div className="firstInput">
              <div className="inputGroup">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="firstInput">
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

            <button className="ButonAdd" type="submit" disabled={loading}>
              {loading ? "Duke u kyçur..." : "Sign In"}
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