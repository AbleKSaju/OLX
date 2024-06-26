import React, { useContext } from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/FireBaseContext';
import { useNavigate } from 'react-router-dom';
function Header({productInput}) {
  // const productInput=(id)=>{
  //   console.log(id,'Idddd');
  // }
  const navigate=useNavigate()
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  const navigateToLogin=()=>{
    console.log(user,"user");
    console.log("I AM LOGIN");
    if (!user || user == null) {
      navigate('/login')
    }else{
      console.log('userExist');
    }
  }
  const navigateToCreate=()=>{
    console.log("CREAEate");
    navigateToLogin()
    console.log("CREAEate routing");
    navigate('/create')
  }
  const navigateToHome=()=>{
    navigate('/')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={navigateToHome}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              onChange={(e)=>{productInput(e.target.value)}}
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span onClick={navigateToLogin}>{user ? user.displayName:'Login'}</span>
          <hr />
        </div>
        {user&&<span onClick={()=>{
          firebase.auth().signOut();
          navigate('/login')
        }} >Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={navigateToCreate}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
