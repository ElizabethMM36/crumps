import React from 'react';
import './Home.css';
import { useEffect, useState } from 'react';
import {db,auth} from '../firebase';
import {orderBy} from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';


import {where,collection,getDocs,query} from 'firebase/firestore';
import Header from '../components/Header';

const Home = ({setShowLogin}) => {
  const [foodItems ,setFoodItems] = useState ([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodItems = async () => {
      const q = query(collection(db, "foodItems"),orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      setFoodItems(querySnapshot.docs.map(doc =>({id: doc.id, ...doc.data()})));

    };
    fetchFoodItems();

  },[])
  const handleOrderNow = (item) => {
    const user = auth.currentUser;
    if(!user){
      setShowLogin("user");
    }
    else{
      navigate('/customer');
    }
  }
  return (
    <>
      <Header />

      <div className="home">
        <h2 className="home-title">Available Food Items</h2>
        <div className="food-grid">
          {foodItems.map((item) => (
            <div className="food-card" key={item.id}>
    
              <h3>{item.foodName}</h3>
              <p>₹{item.price}</p>
              <p>{item.location}</p>
              <small>By: {item.restaurantName}</small>
              <button onClick={handleOrderNow}>Order Now</button>
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Home;
