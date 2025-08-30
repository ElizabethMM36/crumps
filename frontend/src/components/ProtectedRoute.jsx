import { useContext } from "react";
import { Navigate,Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const ProtectedRoute =({allowedRoles}) =>{
    const {currentUser} = useContext(AuthContext);
    if(!currentUser){
        return <Navigate to="/" replace />
    }
    if (allowedRoles && !allowedRoles.includes(currentUser.role)){
        return <Navigate to="/" replace />
    }
    if (currentUser.role === 'restaurant' && currentUser.status === 'pending'){
        return(
            <div style={{padding: 40, color:'#fff',background: '#1a1a1a',borderRadius: 8}}>
                <h2>Account Pending Approval</h2>
        <p>Your restaurant account is awaiting admin approval. Please check back later.</p>
            </div>
        );
    }
     return <Outlet />;
}
export default ProtectedRoute;