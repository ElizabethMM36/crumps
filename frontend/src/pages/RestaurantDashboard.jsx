import React from 'react'
import {db,auth} from '../firebase'
import { collection, getDocs, updateDoc, where, deleteDoc, doc, query, orderBy, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { useState, useEffect } from 'react'

import './RestaurantDashboard.css'

const RestaurantDashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const[foodName ,setFoodName]= useState("");
  const [location,setLocation] = useState("");
  const [availableUntil,setAvailableUntil] = useState("");
  const [price,setPrice] = useState("");
 
  const [orders,setOrders] = useState([]);

  const user = auth.currentUser;
  useEffect(() =>{
    if (!user) return;
    const q = query(collection(db, "foodItems"), where("restaurantId", "==", user.uid), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q,(snapshot) => {
      setFoodItems(snapshot.docs.map((doc) => ({id:doc.id,...doc.data()})));
    });
    return () => unsubscribe();
  },[user]);
  useEffect(() => {
    if(!user) return;
    const q = query(collection(db,"orders"),where("restaurantId","==",user.uid),orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q,(snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({id:doc.id,...doc.data()})));
    });
    return () => unsubscribe();
  
    },[user]);
  
  const handleUploadFood = async(e) => {
    e.preventDefault();
    if(!foodName || !location || !availableUntil || !price ){
      alert("Please Fill all the fields");
      return;
    }
    try{
     const userRef = doc(db, "users", user.uid);
     const userSnap = await getDoc(userRef);

     let restaurantName = "Unknown";
     if (userSnap.exists()){
      restaurantName =  userSnap.data().name ;
     }

      await addDoc(collection(db,"foodItems"),{
        restaurantId: user.uid,
        restaurantName,
        foodName,
        location:location.toLowerCase(),
        availableUntil,
        price: parseFloat(price), 
        
        createdAt: serverTimestamp()
      });
      setFoodName("");
      setLocation("");
      setAvailableUntil("");

      setPrice("");
     
      alert("Food Item Uploaded Successfully");
    }catch(error){
      console.error("Error uploading food item: ", error);
      alert("Error uploading food item");
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await deleteDoc(doc(db, "foodItems", id));
      alert("Food Item Deleted Successfully");
    } catch (error) {
      
      console.error("Error deleting food item: ", error);
    }
  }
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Restaurant Dashboard</h1>
   <form onSubmit={handleUploadFood} className="dashboard-form">
    <input type="text" placeholder="Food Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} className="section-title" />
    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="section-title"/>
    <input type="datetime-local" placeholder="Available Until" value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} className="section-title" />
    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="section-title" />
   
    <button type="submit" className="bg=green-600 text-white px-4 py-2 rounded hover:bg-green-700">Upload Food Item</button>
</form>     
<h2 className="text=xl font-semibold mb-4">Food Items</h2>
<ul className="food-list">
  {foodItems.map((food) => (
    <li key={food.id} className="food-item">
      <div>
        <h3 className="text-lg font-bold">{food.foodName}</h3>
        <p><strong>{food.location}</strong></p>
        <p> Available Until: {new Date(food.availableUntil).toLocaleString() }</p>
        <p>Price: ${food.price.toFixed(2)}</p>
      </div>
      <button onClick={() => handleDeleteFood(food.id)}
       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
     
    </li>

  ))}
  </ul>
  <h2 className="text-xl font-semibold mb-4">🛒 Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="order-item"
          >
            <p><strong>Customer ID:</strong> {order.customerId}</p>
            <p><strong>Food:</strong> {order.foodName}</p>
            <p><strong>Status:</strong> {order.status}</p>
          
            <p><strong>Ordered At:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>




    </div>
  )
}

export default RestaurantDashboard
