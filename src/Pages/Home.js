import React, { useEffect, useState } from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import Posts from '../Components/Posts/Posts';
import Footer from '../Components/Footer/Footer';

function  Home({product}) {

  const [prod,setProduct]=useState(false)
  const [input,setInput]=useState('')
  const productInput = (input) => {
    setInput(input);
  }
  useEffect(()=>{
    product && setProduct(!prod)
  },[product])
  const [favorites,setFavorites]=useState('')
  const favorite=(id)=>{
    setFavorites(id)
  }
  console.log(favorites);
  useEffect(()=>{
     productInput()
  },[])
  console.log(prod,'proo');
 
  return (
    <div className="homeParentDiv">
      <Header productInput={productInput}/>
      <Banner />
      <Posts product={prod} input={input} favorite={favorite}/>
      <Footer />
    </div>
  );
}

export default Home;
 
