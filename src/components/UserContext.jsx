import { createContext, useState } from "react";


const UserContext = createContext();

function UserProvider({children}){
  //load user data from localStorage 

  const [user , setUser] = useState(()=>{
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {email : "" , username: ""};
  });

  //function update user data 
  function UpdateUser(email ,username){
    const newUser = {email,username};
    setUser(newUser);
    localStorage.setItem('user' , JSON.stringify(newUser));
  };

  return(
    <UserContext.Provider value={{user , UpdateUser}}>
      {children}
    </UserContext.Provider>
  );

}

export { UserProvider };
export default UserContext; // Default export