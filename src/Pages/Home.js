import React, { useEffect, useState } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function  Home() {
console.log("I am Home");
  const [input,setInput]=useState('')
  const productInput = (input) => {
    setInput(input);
  }

  const [favorites,setFavorites]=useState('')
  const favorite=(id)=>{
    setFavorites(id)
  }
  console.log(favorites);
  useEffect(()=>{
     productInput()
  },[])
 
  return (
    <div className="homeParentDiv">
      <Header productInput={productInput}/>
      <Banner />
      <Posts  input={input} favorite={favorite}/>
      <Footer />
    </div>
  );
}

export default Home;
 
