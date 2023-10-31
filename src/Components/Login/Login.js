import React, { useState,useContext, useRef } from 'react';
import {FirebaseContext} from '../../store/FireBaseContext';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'

function Login() {
  const {handleSubmit,register,formState: {errors},reset}=useForm()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useNavigate()
  // const handelLoggin=(e)=>{

  // }
  const [error,setError]=useState(null)
  const submit = ()=>{
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      reset();
      history('/')
    }).catch(( err)=>{
      setError('Account not found');
      setEmail('')
      setPassword('') 
      setTimeout(()=>{
        setError(null);
      },3000)
    })
  }
  const navigateToSignup=()=>{
    history('/signup')
  }
  return (
    <div>
      <div className="loginParentDiv p-5">
        <img width="200px" height="200px" src={Logo} alt='Logo'></img>
        {error && <div className="error-message text-danger">{error}</div>}

        <form onSubmit={handleSubmit(submit)}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
          {...register('email',{
            required: 'Email Required',
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid Email",
            },
          })}
          // ref={removeInput}
            className="input"
            // type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
            <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          {...register('password',{
            required:'Password Required',
            pattern:{
              value:/^.{6,}$/,
              message:'Minimum 6 Digits'
            }
          })}
          // ref={removeInput}
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
   
          <br />
          {errors.password && (
            <small className='text-danger'>{errors.password.message}</small>
          )}
          <br />
          <button type='submit'>Login</button>
        </form>
        <p className='text-center mt-1' onClick={navigateToSignup}>Signup</p>
      </div>
    </div>
  );
}

export default Login;
