import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/FireBaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useNavigate()
  const handelLoggin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history('/')
    }).catch(( err)=>{
      alert(err.message)
    })
  }
  const navigateToSignup=()=>{
    history('/signup')
  }
  return (
    <div>
      <div className="loginParentDiv p-5">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        <form onSubmit={handelLoggin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button >Login</button>
        </form>
        <p className='text-center mt-1' onClick={navigateToSignup}>Signup</p>
      </div>
    </div>
  );
}

export default Login;
