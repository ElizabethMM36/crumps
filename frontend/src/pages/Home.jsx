import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css';
import { food_list } from '../assets/assets';


const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home">
        <h2 className="home-title">Available Food Items</h2>
        <div className="food-grid">
          {food_list.map((food) => (
            <div className="food-card" key={food.id}>
              <img src={food.image} alt={food.name} />
              <h3>{food.name}</h3>
              <p>₹{food.price}</p>
              <p>{food.location}</p>
              <small>By: {food.restaurantName}</small>
              <button>Order Now</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

