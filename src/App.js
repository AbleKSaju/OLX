import React, { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import { AuthContext, FirebaseContext } from "./store/FireBaseContext";
import Create from "./Pages/Create";
import View from "./Pages/ViewPost";
import Post from "./store/PostContext";

function App() {
  console.log('hi');
  const { setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <div>
      <Post>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </Post>
    </div>
  );
}

export default App;
