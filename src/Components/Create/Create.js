import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/FireBaseContext';

const Create = () => {
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const handleSubmit=()=>{
    
  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e)=>{setName(e.target.value)}}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              onChange={(e)=>{setCategory(e.target.value)}}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" onChange={(e)=>{setPrice(e.target.value)}} type="number" id="fname" name="Price" />
            <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
            <br />
            <input onChange={(e)=>{setImage(e.target.files[0])}} type="file"  />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
