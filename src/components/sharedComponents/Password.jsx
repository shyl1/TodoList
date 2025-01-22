import styles from '../sharedStyling/passwordStyling.module.css';

export default function Password({password, setPassword ,isPasswordValid}) {
  return (
    <>
    <label htmlFor="password" className={styles.password}>Password</label>

    <input type="password" placeholder='Password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required className={`${styles.passwordInput} ${!isPasswordValid ? styles.invaildInput : ''}`}/>

    {!isPasswordValid && (
      <span className={styles.errorMsg}>Please enter a valid Password</span>
    )}
    </>
  )
}
