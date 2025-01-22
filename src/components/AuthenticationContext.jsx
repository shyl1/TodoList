import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

//const useAuth = useContext(AuthContext);


function AuthProvider({ children }){
  // store user data after login / signup
  const [user , setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  //const [user , setUser] = useState('')

  // track authentication status 
  const [isAuthenticated , setIsAuthenticated] = useState( typeof window !== "undefined" && localStorage.getItem("isAuthenticated") === "true");

  //Add a state to track if the user has attempted to authenticate.
  const [hasAttempted, setHasAttempted] = useState(false);

   // Sync localStorage with state
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    if (storedAuth !== isAuthenticated) {
      setIsAuthenticated(storedAuth);
    }
  }, [isAuthenticated]);



    //validating email 
    function validateEmail(email){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return "Invalid email address";
      }
      return null; // No error
    }
  
    function validatePassword(password){
      //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (password.length < 8) {
        return "Password must be at least 8 characters long";
      }
      return null; // No error
    }

    
  //store user data during signup
  function storeUserData(email,password,username){
    const users =JSON.parse(localStorage.getItem("users")) || [];
    users.push({email , password , username});
    localStorage.setItem("users" ,JSON.stringify(users));
  }

  //check if a user exixts
  function checkUserExists(email){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some((user)=> user.email === email);
  }

  // Validate user credentials
  function validateUserCredentials(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some(
      (user) => user.email === email && user.password === password 
    );
  }

   // Login function
  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setHasAttempted(true);
      setUser({ email: user.email, name: user.username }); // Include username in the user object
      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify({ email: user.email, name: user.username })); // Store username
      }
    } else {
      throw new Error("Invalid email or password");
    }
  }
    
    function logout() {
      setIsAuthenticated(false);
      setHasAttempted(false);
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("isAuthenticated"); // Remove only the authentication flag
      }
    };
    
  return (
    <AuthContext.Provider 
    value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      validateEmail,
      validatePassword,
      login,
      logout,
      hasAttempted,
      setHasAttempted,
      storeUserData,
      checkUserExists,
      validateUserCredentials
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthProvider };
export default AuthContext; // Default export