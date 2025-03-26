import React, { useState } from 'react'
import './App.css'

const Register =()=> {
    const [name, setName] = useState("");
       const [phone, setPhone] = useState("");
       const [password, setPassword] = useState("");
       const [agreement, setAgreement] = useState("false");
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
           <input type="text" 
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
                  onChange={(e) => setAgreement(e.target.value)} >
                  I agree to the terms and conditions
            </label>
           </div><br/>
           <button id="submitBtn">Submit</button>
          </div>
        </div>
      )
    }
    
    export default Register;
    
