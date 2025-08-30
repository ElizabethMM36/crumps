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
        // Check if user is an admin
        const adminRef = doc(db, "admins", firebaseUser.uid);
        const adminSnap = await getDoc(adminRef);
        const isAdminUser = adminSnap.exists();
        setIsAdmin(isAdminUser);

        // Get normal user profile (optional)
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        setCurrentUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...(userSnap.exists() ? userSnap.data() : {}),
          role: isAdminUser ? "admin" : "user",
        });
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
