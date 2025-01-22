import styles from './rightpart.module.css';
import { CiCirclePlus } from "react-icons/ci";
import { useContext } from 'react';
import TaskContext from '../../TaskContext';
import { Link } from 'react-router-dom';


export default function RightPart() {

  
  const {setShowForm , setFormColumn , fromDate , setFromDate , toDate , setToDate} = useContext(TaskContext);

 // function to handle clicking on the newtask button
    function handleClick(e){
      e.preventDefault();
      setFormColumn("To Start");
      setShowForm(true); // show the form when the button is clicked
    }
  
  return (
    <>
    <div className={styles.topContainer}>

      <button type='submit' 
      className={styles.btn} 
      onClick={handleClick}>
        <CiCirclePlus className={styles.cri}/>
        New Task
      </button>

      <Link to="/dashboard/profile">
      <div className={styles.profile}></div>
      </Link>
      
    </div>
    <div className={styles.bottomContainer}>
    <div className={styles.dateTo}>

      <input 
      type="date" 
      className={styles.to} 
      value={toDate} 
      onChange={(e) => setToDate(e.target.value)}
      />

    </div>

    <div className={styles.dateFrom}>

      <input 
      type="date" 
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className={styles.from}/>
    </div>
    </div>

    </>
  )
}