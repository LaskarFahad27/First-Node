import React, { useState } from 'react'
import './App.css'

const Register =()=> {
    const [name, setName] = useState("");
       const [phone, setPhone] = useState("");
       const [password, setPassword] = useState("");
       const [agreement, setAgreement] = useState(false);

       const handleSubmit = async () => {
        if (!name || !phone || !password) {
            alert("Please fill all fields and accept the terms.");
            return;
        }

        const userData = {
            name,
            phone,
            password
        };

        try {
          const response = await fetch("http://localhost:3000/register", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error(error);
        }
    };
      return (
        <div className="page">
          <div className="field">
            <h2 align="center">Register</h2>
           <input type="text" id="name" 
                  placeholder='Enter Your Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)} 
            />
           <input type="text"
                  id="phone" 
                  placeholder='Enter Your Phone' 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
            />
           <input type="password" 
                  id="password" 
                  placeholder='Enter Your Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
            />
           <div>
           <input type='checkbox' id='agreement'></input>
           <label htmlFor="agreement" 
                  className="statement"
                  value={agreement}
                  onChange={(e) => setAgreement(e.target.checked)} >
                  I agree to the terms and conditions
            </label>
           </div><br/>
           <button id="submitBtn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )
    }
    
    export default Register;
    
