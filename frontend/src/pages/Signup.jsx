import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc ,doc} from 'firebase/firestore';
import React,{useState} from 'react'
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Assuming you have a CSS file for styling

const Signup = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState('customer');
  const [name,setName] = useState("");
  const navigate =useNavigate();

  const handleSignup = async(e) => {
    e.preventDefault();
    try{
      const userCred = await createUserWithEmailAndPassword(auth, email,password);
      const user = userCred.user;

      await setDoc(doc(db,'users',user.uid),{
        uid: user.uid,
        name,
        email,
        role,
        status: role === 'restaurant'? 'pending':'approved',
        createdAt:new Date()
   
      });
      alert("Signup successful");
      navigate('/login');


    }catch(error){
      console.error(error.message);
      alert('Signup failed: ' + error.message);


    }
  };
  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="restaurant">Restaurant</option>
        </select>
        <button type="submit">Sign Up</button>
        </form>
      
    </div>
  );
};

export default Signup



// setDoc is used to set data in a document, overwriting any existing data.
// doc is used to create a reference to a document in Firestore.