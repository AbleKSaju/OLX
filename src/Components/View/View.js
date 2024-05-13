import React, { useContext, useEffect, useState } from "react";
import "./View.css";
import { FirebaseContext } from "../../store/FireBaseContext";
import { postContext } from "../../store/PostContext";
function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(postContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const {userId} = postDetails;
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", userId)
      .get()
      .then((res) => {
        res.forEach(doc => {
          setUserDetails(doc.data());
        })
      }).catch((err)=>{
        console.log(err,"err");
      })
  },[postDetails,firebase])
  return (
    <div className="viewParentDiv" key={postDetails?.id}>
      <div className="imageShowDiv">
        <img src={postDetails?.url&&postDetails?.url} alt="nop" className="ml-5" style={{width:'50rem'}} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails?.username}</p>
            <p>{userDetails?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
