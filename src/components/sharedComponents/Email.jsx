import styles from '../sharedStyling/emailStying.module.css';

export default function Email({ email, setEmail, isEmailValid }) {
    
  return (
    <>
        <label htmlFor='email' className={styles.email}>E-mail</label>

        <input type="email" className={`${styles.emailInput} ${!isEmailValid ? styles.invaildInput : ''}`} placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} id='email' 
        required autoComplete="email"/>

        {!isEmailValid && (
          <span className={styles.errorMsg}>Please enter a valid email</span>
        )}
    </>
  )
}
