import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FireBaseContext';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate=useNavigate()
  const [username,setUsername]=useState('')
  const [userEmail,setUserEmail]=useState('')
  const [userPhone,setUserPhone]=useState('')
  const [userPassword,setUserPassword]=useState('')
  const {firebase} =useContext(FirebaseContext)
  const handelSubmit=(e)=>{
    e.preventDefault()
      firebase.auth().createUserWithEmailAndPassword(userEmail,userPassword).then((result)=>{
        result.user.updateProfile({displayName:username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            username:username,
            phone:userPhone
          }).then(()=>{
            navigate('/login')

          })
        })
      })
    }
    const navigatetoLogin=()=>{
      navigate('/login')
    }
  return (
    <div>
      <div className="signupParentDiv p-5">
        <img width="200px" height="200px" alt='logo' src={Logo}></img>
        <form onSubmit={handelSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={userEmail}
            onChange={(e)=>setUserEmail(e.target.value)}
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={userPhone}
            onChange={(e)=>setUserPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={userPassword}
            onChange={(e)=>setUserPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <p onClick={navigatetoLogin} style={{marginTop:'1rem'}}>Login</p>
      </div>
    </div>
  );
}
