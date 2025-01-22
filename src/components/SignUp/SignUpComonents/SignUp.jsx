//styling
import { useContext } from 'react';
import styles from '../SignUpStyling/signup.module.css';


import  AuthContext  from '../../AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

//improting components
import UserName from "./UserName";
import Email from '../../sharedComponents/Email';
import Password from '../../sharedComponents/Password';
import ButtonSignUp from './ButtonSignUp';
import SignUpWithGoogle from './SignUpWithGoogle.jsx';


export default function SignUp() {
  const {validateEmail , validatePassword  ,setHasAttempted , storeUserData}= useContext(AuthContext);


  const navigate = useNavigate();
  //handling email validation 
  // take the email value fron the input by state
  const [email , setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  //password
  const [password , setPassword] = useState('');
  const [isPasswordValid ,setIsPasswordValid] = useState(true);

  //username 
  const [username , setUserName] =useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);




  // Validate username (example: non-empty)
  function validateUsername(username){
    return username.trim() !== '';
  }
  
  function handleSubmit(e){
    e.preventDefault();
    setHasAttempted(true);

    //validate inputs
    const isValidUsername = validateUsername(username);
    const isValidEmail =validateEmail(email);
    const isValidPassword = validatePassword(password);

    setIsUsernameValid(isValidUsername);
    setIsEmailValid(!isValidEmail);
    setIsPasswordValid(!isValidPassword);

    

    // If all inputs are valid, store user data and redirect to login
    if(!isValidEmail && !isValidPassword && isValidUsername){
      storeUserData(email , password ,username); // Store user data
      navigate("/"); // Redirect to login page
    } 
  };
  

  function handleClickToLogin(){
    navigate('/');
  }

  return (
    <div className={styles.Container}>
      <div className={styles.LoginContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.text}>
          <h1>SignUp</h1>
        </div>
        <div className={styles.nameContainer}>
          <UserName username={username} setUserName={setUserName} isUsernameValid={isUsernameValid}/>
        </div>
        <div className={styles.emailConatiner}>
          <Email email={email} setEmail={setEmail} isEmailValid={isEmailValid}/>
        </div>
        <div className={styles.passwordContainer}>
          <Password password={password} setPassword={setPassword} isPasswordValid={isPasswordValid}/>
        </div>
        <div className={styles.btnContainer}>
          <ButtonSignUp type="submit" />
        </div>
        <div className={styles.OR}>
          OR
        </div>
        <div className={styles.btnContainer}>
          <SignUpWithGoogle/>
        </div>
        <div className={styles.loginOption}>
          Already have an account? <strong className={styles.login} onClick={handleClickToLogin}>Log in</strong>
        </div>
        </form>
      </div>
    </div>
  )
}
