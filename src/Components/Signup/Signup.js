import React, { useState,useContext } from 'react';
import { useForm } from 'react-hook-form'
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
  const {register,handleSubmit,formState:{errors},reset} = useForm()
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
  const submit=()=>{
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
        <form onSubmit={handleSubmit(submit)}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
          {...register('name',{
            required:'Name Required',
            pattern:{
              value:/(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
              message:'Full Name required'
            }
          })}
            className="input"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          {errors.name && (
            <small className='text-danger'>{errors.name.message}</small>
          )}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
          {...register('email',{
            required:'Email Required',
            pattern:{
              value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message:'Invalid Email'
            }
          })}
            className="input"
            value={userEmail}
            onChange={(e)=>setUserEmail(e.target.value)}
            // type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          {errors.email && (
            <samll className='text-danger'>{errors.email.message}</samll>
          )}
          <br/>
          <label htmlFor="lname">Phone</label>
          <br />
          <input
             {...register("phone", {
              required: "Number required",
              pattern: {
                value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: "Invalid Phone Number",
              },
            })}
            className="input"
            type="number"
            value={userPhone}
            onChange={(e)=>setUserPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          {errors.phone && (
            <small className='text-danger'>{errors.phone.message}</small>
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
            className="input"
            type="password"
            value={userPassword}
            onChange={(e)=>setUserPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          {errors.password && (
            <small className='text-danger'>{errors.password.message}</small>
          )}
          <br />
          <button type='submit'>Signup</button>
        </form>
        <p onClick={navigatetoLogin} style={{marginTop:'1rem'}}>Login</p>
      </div>
    </div>
  );
}
