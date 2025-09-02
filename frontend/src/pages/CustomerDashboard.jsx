import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import "./CustomerDashboard.css";
import { onSnapshot } from "firebase/firestore";
export default function CustomerDashboard() {
  const { currentUser } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Fetch previous orders for this customer
 useEffect(() => {
  if (!currentUser) return;
  const q = query(
    collection(db, "orders"),
    where("customerId", "==", currentUser.uid)
  );
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
  return () => unsubscribe();
}, [currentUser]);

  // Fetch food items based on location
  const handleSearch = async () => {
    if (!search) return;
    const q = query(
      collection(db, "foodItems"),
     where("location", "==", search.trim().toLowerCase())

    );
    {foodItems.length === 0 && search && (
  <p className="text-gray-500">No food items found in {search}.</p>
)}

    const querySnapshot = await getDocs(q);
    setFoodItems(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Place order
  const handleOrder = async (item) => {
    if (!currentUser) return;
    await addDoc(collection(db, "orders"), {
      customerId: currentUser.uid,
      customerName: currentUser.displayName || "Anonymous",
      foodId: item.id,
      foodName: item.name,
      restaurantId: item.restaurantId,
      status: "pending",
      createdAt: serverTimestamp(),
    });
    alert(`Order placed for ${item.name}`);
  };

  return (
    <div className="dashboard">
      {/* Profile Card */}
      <div className="profile-card">
        <h2 className="text-xl font-bold">Welcome, {currentUser?.displayName}</h2>
        <p className="text-gray-600">{currentUser?.name}</p>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter location..."
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
      </div>

      {/* Food Items */}
      <h3 className="text-lg font- mb-2">Available Food</h3>
      <div className="food-grid">
        {foodItems.map((item) => (
          <div key={item.id} className="food-card">
            <h4 className="font-bold">{item.name}</h4>
            <p className="text-gray-500">Location: {item.location}</p>
            <p className="text-gray-700">Price: ${item.price}</p>
            <button
              onClick={() => handleOrder(item)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Order
            </button>
          </div>
        ))}
      </div>

      {/* Previous Orders */}
      <h3 className="text-lg font-semibold mb-2">My Orders</h3>
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
