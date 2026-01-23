import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "./header";
import "./styles/signInStyle.css"; 

function SignUp() {
  const navigate = useNavigate();

  // State-et për fushat e regjistrimit
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [role, setRole] = useState("User"); // Default roli është User

  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // DTO-ja që pret Backend-i (RegisterDto)
  //   const registerData = {
  //     Username: `${firstName} ${lastName}`, // Bashkojmë emrin dhe mbiemrin
  //     Email: email,
  //     Password: password,
  //     Role: role
  //   };

  //   try {
  //     // Thirrja e API-t për regjistrim
  //     await axios.post("http://localhost:5165/backend/auth/register", registerData);
      
  //     alert("Llogaria u krijua me sukses! Tani mund të kyçeni.");
  //     navigate("/login"); // Pas regjistrimit, dërgoje te Logini
  //   } catch (error: any) {
  //     alert(error.response?.data || "Gabim gjatë regjistrimit!");
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Header />
      <section className="signInMainn">
        <div className="columSign">
          <h1 className="tittle">Sign Up</h1>
          <p className="descriptionText">Krijoni llogarinë tuaj duke plotësuar të dhënat.</p>
{/* onSubmit={handleRegister} */}
          <form className="forma">
            <div className="firstInputSign">
              <div className="inputGroupSign">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  // onChange={(e) => setFirstName(e.target.value)} 
                  required 
                />
              </div>
              <div className="inputGroupSign">
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  // onChange={(e) => setLastName(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="SecondInputSign">
              <div className="inputGroupSignn">
                <input 
                  type="email" 
                  placeholder="Email" 
                  // onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="inputGroupSignn">
                <input 
                  type="password" 
                  placeholder="Password" 
                  // onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Zgjedhja e Rolit */}
            {/* <div className="inputGroup" style={{marginTop: "10px"}}>
                <label style={{marginRight: "10px", color: "white"}}>Regjistrohu si:</label>
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    style={{padding: "5px", borderRadius: "5px"}}
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </div> */}

            <div className="butoniS">
              <button className="ButonAdd" type="submit">Krijo Llogarinë</button>
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