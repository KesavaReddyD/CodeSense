import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
const AuthContext = createContext();

// Auth Provider to manage user type and username
export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
//   const navigate = useNavigate();

  // Save user type and username in local storage
  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("userType");
    }

    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [userType, username]);

  // Logout function
  const logout = () => {
    setUserType(null);
    setUsername(null);
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ userType, setUserType, username, setUsername, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
