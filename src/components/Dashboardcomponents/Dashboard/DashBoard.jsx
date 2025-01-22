import styles from '../dashboardStyling/dashboard.module.css';
import TodoSide from "../TodoSide/TodoSide";

export default function DashBoard() {

  return (
    <>
    <div className={styles.container}>
      <TodoSide />
    </div>
      
    </>
  )
}
