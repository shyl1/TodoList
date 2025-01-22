import styles from '../SignUpStyling/username.module.css';
export default function UserName({username,setUserName ,isUsernameValid}) {
  return (
    <>
      <label htmlFor="name" className={styles.name}>Name</label>

      <input type="text" id="name" className={`${styles.nameInput} ${!isUsernameValid ?  styles.invaildInput : ''}`} value={username} onChange={(e)=> setUserName(e.target.value)} placeholder='Name' required/>
    </>
  )
}
