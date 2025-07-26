import React,{useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../../backend/firebase';
import { Link } from 'react-router-dom';
import { db } from '../../../backend/firebase';
import {setDoc,doc} from "firebase/firestore";
import { toast } from 'react-toastify';
function Register() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [fname,setFname ]= useState('');
    const [lname,setLname] = useState('');
    const [phone ,setPhone] = useState('');

 const handleRegister = async (e)=> {
    e.preventDefault();
    try{
    await  createUserWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser;
    console.log(user);
    if(user){
      await setDoc(doc(db, "users", user.uid),{
        email:user.email,
      
      fname:fname,
      lname:lname,
      phone:phone,
      });
      
    }
    console.log("User registered successfully");
    toast.success("User registered sucessfully",{
        position:"top-center",
    })
    // You can also save the user's first and last name in your database here
    }catch(error){
        console.log(error.message);
        toast.success("Error ",{
        position:"top-center",
    })

    }
 };


    return(
        <form onSubmit={handleRegister}>
            <h3>Register</h3>

            <div className="mb-3">
                <label>First Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter first name" 
                    value={fname} 
                    onChange={(e) => setFname(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label>Last Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter last name" 
                    value={lname} 
                    onChange={(e) => setLname(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <label>Phone Number</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter phone number" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label>Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Register</button>
                  <p className="mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
        </form>
    )
}

export default Register;