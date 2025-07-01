import React,{useState} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from './firebase';
import { Link } from 'react-router-dom';
function Register() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [fname,setFname ]= useState('');
    const [lname,setLname] = useState('');

 const handleRegister = async (e)=> {
    e.preventDefault();
    try{
    await  createUserWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser;
    console.log(user);
    console.log("User registered successfully");
    // You can also save the user's first and last name in your database here
    }catch(error){
        console.log(error.message);

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