import {createContext,useEffect,useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "./firebase";
import { doc,getDoc } from "firebase/firestore";



export const AuthContext = createContext();
export const AuthProvider =({children}) => {
    const [currentUser,setCurrentUser] = useState(null);
    //useEffect is a hook that is used to handle operations with the outside world like fetch data from API

useEffect(() =>{
const unsub = onAuthStateChanged(auth,async(user)=> {
    if(user){
        const userRef=doc(db,"users",user.uid);
        const userSnap = await getDoc(userRef);
        setCurrentUser(userSnap.exists() ? userSnap.data() : null);
    

    }else{
        setCurrentUser(null);

    }
});
return() => unsub();
},[]);


return(
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
)


}