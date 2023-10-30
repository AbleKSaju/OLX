import React, { useState } from 'react';
import { useEffect,useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FireBaseContext';
import { useNavigate } from 'react-router-dom';
import { postContext } from '../../store/PostContext';

function Posts({input}) {
  const [inp, setInp] = useState('');
  useEffect(() => {
    if (input) {
      setInp(input);
    }else{
      setInp('')
    }
  },[input]);

const {firebase} = useContext(FirebaseContext)
const [products,setProducts]=useState([])
const {setPostDetails} = useContext(postContext)
const navigate=useNavigate()

useEffect(() => {
  firebase.firestore().collection('products').get().then((snapshot) => {
    const allPosts = snapshot.docs.map((product) => {
      if (inp) {
        if (product.data().name.includes(inp)) {
        return {
          ...product.data(),
          id: product.id
        };
      }
      }else{
        return{
          ...product.data(),
          id:product.id
         } 
      }
    })
    setProducts(allPosts);
  });
}, [input,inp]);


  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cardss">
          {products.map((product)=>(
            product?(
              <div
              key={product.id}
            className="cards"
            onClick={() => {
              setPostDetails(product);
              navigate('/view');
            }}
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product?.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product?.price}</p>
              <span className="kilometer">{product?.name}</span>
              <p className="name">{product?.category} </p>
            </div>
            <div className="date">
              <span>{product?.createdAt}</span>
            </div>
          </div>
          ):null))}
       
               
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cardss">
          <div className="cards">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
