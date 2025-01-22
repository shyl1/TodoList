import styles from '../../sharedStyling/loginwithgoogle.module.css';

export default function ButtonSignUp({type , onClick }) {
  return (
    <>
          <button type={type} className={styles.btn} onClick={onClick}>Signup</button>
        </>
  )
}
