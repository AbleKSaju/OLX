import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/FireBaseContext';
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'

const Create = ({AddProduct}) => {
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const date=new Date()
  const {handleSubmit,register,formState:{errors},reset} = useForm()
  const navigate=useNavigate()

  const submit=()=>{
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
      })
      AddProduct(true)
      navigate('/')
    })
  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
            {...register('name',{
              required:'Name Required',
              pattern:{
                value:/^[A-Za-z ]{3,}$/,
                message:'Invalid Name'
              }
            })}
              className="input"
              type="text"
              id="fname"
              // name="Name"
              onChange={(e)=>{setName(e.target.value)}}
            />
            <br />
            {errors.name && (
              <small className='text-danger'>{errors.name.message}</small>
            )}
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
               {...register('category',{
                required:'Category Required',
                pattern:{
                  value:/^[A-Za-z]{3,}$/,
                  message:'Invalid Category'
                }
              })}
              className="input"
              type="text"
              onChange={(e)=>{setCategory(e.target.value)}}
              id="fname"
              name="category"
            />
            <br />
            {errors.category && (
              <small className='text-danger'>{errors.category.message}</small>
            )}
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
               {...register('price',{
                required:'Price Required',
                minLength: {
                  value: 2,
                  message: 'Invalid Price'
                }
              })} className="input" onChange={(e)=>{setPrice(e.target.value)}} type="number" id="fname" />
            <br />
            {errors.price && (
              <small className='text-danger'>{errors.price.message}</small>
            )}
          <br />
          {image&&(<img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>)}
            <br />
            <input {...register('image',{
              required:'Image Required'
            })} onChange={(e) => { setImage(e.target.files[0]) }} type="file"  />
            <br />
            {errors.image && (
              <small className='text-danger'>{errors.image.message}</small>
            )}
            <br></br>
            <button className="uploadBtn" type='submit' onClick={handleSubmit(submit)}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
