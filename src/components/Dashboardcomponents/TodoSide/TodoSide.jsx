import styles from './todoSide.module.css';
import LeftPart from '../LeftPart/LeftPart.jsx';
import RightPart from '../RightPart/RightPart.jsx';
import ToStart from '../Dashboard/tasks/ToStart.jsx';
import InProgress from '../Dashboard/tasks/InProgress.jsx';
import Completed from '../Dashboard/tasks/Completed.jsx';



export default function TodoSide() {



  return (
    <>
      <div className={styles.todoContainer}>
        <div className={styles.parts}>
          <div>
            <LeftPart />
          </div>
          <div>
            <RightPart/>
          </div>
        </div>

        <div className={styles.tasks}>
          <ToStart />
          <InProgress />
          <Completed />
        </div>
      </div>
    </>
  )
}
