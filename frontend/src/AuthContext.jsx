import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check if user is an admin
          const adminRef = doc(db, "admins", firebaseUser.uid);
          const adminSnap = await getDoc(adminRef);
          const isAdminUser = adminSnap.exists();
          setIsAdmin(isAdminUser);

          // Get user profile from "users" collection
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);

          let userData = {};
          if (userSnap.exists()) {
            userData = userSnap.data();
          }

          setCurrentUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userData, // contains role ("customer", "restaurant", etc.)
            role: isAdminUser ? "admin" : userData.role || "user", 
          });
        } catch (err) {
          console.error("Error fetching user:", err);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, handleLogout, isAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
