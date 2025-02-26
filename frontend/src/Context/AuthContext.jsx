import { createContext, useContext, useState, useEffect } from "react";
import { loginapihit, signupapihit, verifyapihit } from "../helpers/api_communicator";
import axios from "axios";

// Create the AuthContext
const AuthContext = createContext();

// Auth Provider to manage user type and username
export const AuthProvider = ({ children }) => {
  // const [userType, setUserType] = useState(localStorage.getItem("userType") || null);
  // const [username, setUsername] = useState(localStorage.getItem("username") || null);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setisLoggedIN] = useState(false);
    const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

  // Save user type and username in local storage
  useEffect(() => {
      const verifying = async() => {
        const data = await verifyapihit();
        if(data){
            setUser({name: data.name, email: data.email, role: data.role});
            setisLoggedIN(true);
            setLoading(false);
            console.log(user);
        }
      }
      verifying();
  }, []);

  const login = async (name , password, role) => {
    const data = await loginapihit(name, password);
    if(data){
        setUser({name: data.name, email: data.email, role: data.role});
        setisLoggedIN(true);
        setLoading(false);
      }
  };

  const signup = async (name, email, password, role, institution) => {
    console.log(name, email, password, role, institution);
    const data = await signupapihit(name, email, password, role, institution);
    if(data){
        setUser({name: data.name, email: data.email, role: data.role});
        setisLoggedIN(true);
        setLoading(false);
    }
};

  // Logout function
  const logout = async () => {
    const data = await axios.get('/auth/logout', {
        withCredentials: true
    });
    if(data.status !== 200){
        throw new Error("not logged out");
    }
    setUser(null);
    setisLoggedIN(false);
};

  return (
    <AuthContext.Provider value={{ 
      user,
      login,
      signup,
      logout,
      isLoggedIn,
      loading
       }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
