import React,{useState,useEffect} from 'react';
import {db} from '../firebase';
import { collection, getDocs,updateDoc,doc,query,where } from 'firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [approvedRestaurants, setApprovedRestauarants] = useState([]);
    const [pendingRestaurants,setPendingRestaurants] = useState([]);
    const [activeTab,setActiveTab] = useState('customers');
    useEffect(() => {
        fetchUsers();

    },[]);
    const fetchUsers = async () => {
        const customersSnap = await getDocs(query(collection(db,"users"),where("role","==","customer")));
        setCustomers(customersSnap.docs.map(doc => ({id: doc.id, ...doc.data ()})));

        const approvedSnap = await getDocs(query(collection(db,"users"),where("status", "==","approved")));
        setApprovedRestauarants(approvedSnap.docs.map(doc => ({id: doc.id, ...doc.data()})));
        const pendingSnap = await getDocs(query(collection(db,"users"),where("status", "==","pending")));
        setPendingRestaurants(approvedSnap.docs.map(doc => ({id: doc.id, ...doc.data()})));
        const approveRestaurant = async(id) => {
            await updateDoc(doc(db,"users",id),{status:"approved"});
            fetchUsers();
        };
        const rejectRestaurant = async (id) => {
            await updateDoc(doc(db,"users",id),{status:"rejected"});
            fetchUsers();
        };

        const renderTable = (list,type) => (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        {type === 'pending' && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {list.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                             <td>{user.email}</td>
                              <td>{user.role}</td>
                               <td>{user.staus}</td>
                                 {type === 'pending' && (
                                    <td>
                                        <button onClick ={() => approveRestaurant(user.id)}>Approve</button>
                                        <button onClick={() => rejectRestaurant(user.id)}>Reject</button>

                                    </td>
                                 )}
                                 </tr>
                    
                    ))}
                </tbody>
            </table>
        );
        return(
            <div className="admin-dashboard">
  <div className="dashboard-card">
    <h2 className="dashboard-title">Admin Dashboard</h2>

    <div className="tabs">
      <button 
        className={activeTab === "customers" ? "active" : ""} 
        onClick={() => setActiveTab("customers")}
      >
        Customers
      </button>
      <button 
        className={activeTab === "approved" ? "active" : ""} 
        onClick={() => setActiveTab("approved")}
      >
        Approved Restaurants
      </button>
      <button 
        className={activeTab === "pending" ? "active" : ""} 
        onClick={() => setActiveTab("pending")}
      >
        Pending Restaurants
      </button>
    </div>

    <div className="table-container">
      {activeTab === "customers" && renderTable(customers)}
      {activeTab === "approved" && renderTable(approvedRestaurants)}
      {activeTab === "pending" && renderTable(pendingRestaurants, "pending")}
    </div>
  </div>
</div>

        )
    }
}
export default AdminDashboard;