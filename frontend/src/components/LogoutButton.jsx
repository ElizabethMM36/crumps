import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

export default function LogoutButton(){
    const navigate = useNavigate();

    const handleLogout = async() =>{
        try{
            await signOut(auth);
            navigate('/');
        }catch(error){
            console.error("Logout failed:", error);

        }
    };
    return(
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    )
}