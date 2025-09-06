import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";
import Fuse from "fuse.js";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot
} from "firebase/firestore";

import "./CustomerDashboard.css";

export default function CustomerDashboard() {
  const { currentUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [allFoodItems, setAllFoodItems] = useState([]); // 🔹 master copy
  const [foodItems, setFoodItems] = useState([]); // 🔹 filtered copy
  const [orders, setOrders] = useState([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [cuisine, setCuisine] = useState("");

  // Fetch previous orders for this customer
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "orders"),
      where("customerId", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Fetch all food items once
  useEffect(() => {
    const fetchFoodItems = async () => {
      const q = query(collection(db, "foodItems"));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllFoodItems(items);
      setFoodItems(items); // initial display
    };
    fetchFoodItems();
  }, []);

  // Fuse.js setup
  const fuse = new Fuse(allFoodItems, {
    keys: ["location", "foodName", "restaurantName"],
    threshold: 0.3,
  });

  const handleSearch = () => {
    if (!search) {
      setFoodItems(allFoodItems); // reset
      return;
    }
    const results = fuse.search(search);
    setFoodItems(results.map((r) => r.item));
  };

  // Apply filters on top of search
  const filteredItems = foodItems.filter((item) => {
    return (
      (!maxPrice || item.price <= parseInt(maxPrice)) &&
      (!cuisine ||
        item.cuisine?.toLowerCase().includes(cuisine.toLowerCase()))
    );
  });

  // Place order
  const handleOrder = async (item) => {
    if (!currentUser) return;
    await addDoc(collection(db, "orders"), {
      customerId: currentUser.uid,
      customerName: currentUser.name || "Anonymous",
      foodId: item.id,
      foodName: item.foodName,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      status: "pending",
      orderedAt: serverTimestamp(),
    });
    alert(`Order placed for ${item.foodName}`);
  };

  return (
    <div className="dashboard">
      {/* Profile Card */}
      <div className="profile-card">
        <h2 className="text-xl font-bold">
          Welcome, {currentUser?.displayName}
        </h2>
        <p className="text-gray-600">{currentUser?.name}</p>
      </div>

      {/* Search + Filters */}
      <div className="search-bar flex gap-2 my-3">
        <input
          type="text"
          placeholder="Enter location / food / restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-l-lg px-4 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded-r-lg"
        >
          Search
        </button>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <input
          type="text"
          placeholder="Cuisine"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Food Items */}
      <div className="food">
        <h3 className="text-lg mb-2">Available Food</h3>
      </div>

      <div className="food-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="food-card">
              <h4>{item.foodName}</h4>
              <p>₹{item.price}</p>
              <p>{item.location}</p>
              <p>Cuisine: {item.cuisine || "N/A"}</p>
              <small>By: {item.restaurantName}</small>
              <button
                onClick={() => handleOrder(item)}
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
              >
                Order
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found</p>
        )}
      </div>

      {/* Previous Orders */}
      <div className="orders-section">
        <h3 className="text-lg font-semibold mb-2">My Orders</h3>
      </div>
      <ul className="orders">
        {orders.map((order) => (
          <li key={order.id} className="border-b py-2">
            {order.foodName} - <span className="italic">{order.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
