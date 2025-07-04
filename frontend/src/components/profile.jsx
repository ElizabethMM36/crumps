import React, {useEffect, useState}from 'react';
import {auth,db} from './firebase';
import {doc, getDoc} from 'firebase/firestore';
import { toast} from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const fetchUserData = async () => {

        auth.onAuthStateChanged(async (user) => {
            console.log(user);
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());

            } else{
                console.log("User not logged in")
            }
        })
    }
    useEffect(() => {
        fetchUserData();
    },[]);

    async function handleLogout(){
        try{
         await auth.signOut();
         window.location.href = "/login";
        console.log("User logged out successfully")  
        }catch(error){
            console.error("Error logging out:", error); 
        }
    }
    return (
        <div>
            {userDetails ? (
                <>
                <h3> Welcome {userDetails.fname}</h3>
                
                <div>
                    <p>Email: {userDetails.email}</p>
                    <p> First Name: {userDetails.fname}</p>
                    <p>Last Name: {userDetails.lname}</p>
                    <p>Phone: {userDetails.phone}</p>
                </div>
                <button className="btn btn-primary" onClick = {handleLogout}>Logout</button>
                </>
            ) :(
                <h3>Loading user details...</h3>
               
            )}
        </div>
        
        );
    }
export default Profile;