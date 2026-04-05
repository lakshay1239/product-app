import { Box } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// axios.defaults.headers.post['Content-Type'] = 'application/json';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errMsg,setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log('Logging in with:', formData);
   
    try{
     const response = await axios.post('http://localhost:3000/user/login/', {
      email: formData.email,
      password: formData.password
    });
     console.log('Login successful:', response?.data);
    localStorage.setItem('token', response.data.token); // Common practice
    if(response?.status===200)
         navigate('/home'); 
   
    } catch(e){
      setErrMsg("Invalid credentials")
    }
    
  
   
  };

  return (
    <Box sx={{alignItems:'center',height:500,margin:'auto'}}>
      <h3 style={{marginTop:10,marginLeft:-10}}>Welcome to ECart</h3>
    <Box sx={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',zIndex:10, height:200,width:250,background: '#ffffff',mt:16}}>
    <form onSubmit={handleSubmit} style={{padding:30}}>
      <Box sx={{margin:0}}>
        <input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
      </Box>
      <div style={{margin:0,marginTop:10}}>
        <input placeholder="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>
      {errMsg && <label style={{color:"red",fontSize:12,display: "block",
    marginTop: 8}}>{errMsg}</label>}
      <button type="submit" style={{margin:20}}>Login</button>
    </form>
    </Box>
    </Box>
  );
}

export default Login;
