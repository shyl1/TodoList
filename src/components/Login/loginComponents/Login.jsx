// for styling 
import styles from '../loginStyling/login.module.css';

//importing hooks
import {  useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

//importing AuthContext that has shared validation logic
import  AuthContext  from '../../AuthenticationContext';

//importing form login components
import Email from '../../sharedComponents/Email';
import Password from '../../sharedComponents/Password';
import ButtonLogin from './ButtonLogin';
import LoginWithGoogle from './LoginWithGoogle';
import LoginIcon from '@mui/icons-material/Login';



export default function Login() {

  const {validateEmail , validatePassword , login , isAuthenticated, checkUserExists}= useContext(AuthContext);

  const navigate = useNavigate();

  //handling email validation 
  // take the email value fron the input by state
  const [email , setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password , setPassword] = useState('');
  const [isPasswordValid ,setIsPasswordValid] = useState(true);

  // for user existing errors 
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    setIsEmailValid(isValidEmail);
    setIsPasswordValid(isValidPassword);

    if (isValidEmail || isValidPassword) {
      return; // Stop if validation fails
    }

    //check if the user exists
    const userExists = checkUserExists(email);
    if(!userExists){
      setErrorMessage("User not found. Please sign up.");
      setTimeout(() => {
        navigate("/signup");
      },1000);
      return;
    }
    //attemp to log in
  try {
    login(email, password);
    navigate("/dashboard");
  } catch (error){
    setErrorMessage("invalid email or password");
  }
  
  }

  //   if (isValidEmail && isValidPassword) {
  //     //console.log("Setting isAuthenticated to true");
  //     login(); // Set authentication state
  //     navigate("/dashboard");
  //   }
  //  //logout();
  // }

  
  function handleClickToSign(){
    navigate("/signup");
  }


  return (
    <div className={styles.Container}>
      <div className={styles.LoginContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.text}>
          <LoginIcon className={styles.loginIcon} sx={{fontSize:50}}/>
          <h1>Login</h1>
        </div>
        <div className={styles.emailConatiner}>
          <Email email={email} setEmail={setEmail} isEmailValid={isEmailValid}/>
        </div>
        <div className={styles.passwordContainer}>
          <Password password={password} setPassword={setPassword} isPasswordValid={isPasswordValid}/>
        </div>
        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
        <div className={styles.btnContainer}>
          <ButtonLogin type="submit" />
        </div>
        <div className={styles.OR}>
          OR
        </div>
        <div className={styles.btnContainer}>
          <LoginWithGoogle />
        </div>
        <div className={styles.signUpOption}>
          Don&apos;t have an account? <strong className={styles.SginUp} onClick={handleClickToSign}>Sign up here</strong>
        </div>
        </form>
      </div>
    </div>
  )
}
