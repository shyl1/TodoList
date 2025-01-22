import { FaBorderAll } from "react-icons/fa";
import styles from './sideBar.module.css';

export default function SideBar() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>TODO</h1>
      </div>
      <div className={styles.pages}>
      <FaBorderAll size={20}/>
      <h1 className={styles.Page}>Dashboard</h1>  
      </div>
    </div>
    </>
  )
}
