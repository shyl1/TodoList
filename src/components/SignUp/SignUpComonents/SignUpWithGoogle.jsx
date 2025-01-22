import GoogleIcon from '@mui/icons-material/Google';
import styles from '../SignUpStyling/signupwithgoogle.module.css';
export default function SignUpWithGoogle() {
  return (
    <>
    <button className={styles.btn}><GoogleIcon className={styles.googleIcon} />log in with Google</button>
  </>
  )
}
