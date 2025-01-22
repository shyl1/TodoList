import styles from "../../sharedStyling/buttonStyling.module.css";

export default function ButtonLogin({type , onClick }) {
  return (
    <>
      <button type={type} className={styles.btn} onClick={onClick}>login</button>
    </>
  )
}
