import { CiSearch } from "react-icons/ci";
import styles from'./leftpart.module.css';
import { useContext } from "react";
import TaskContext from "../../TaskContext";

export default function LeftPart() {

  const {searchTerm , setSearchTerm} = useContext(TaskContext);

  return (
    <>
      <h1 className={styles.text}>My Todo</h1>
      <div className={styles.seacrh}>

      <input 
      type="text" 
      placeholder="search" 
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)}
      className={styles.seacrhBox}
      />

      <CiSearch className={styles.seacrhIcon}/>
      </div>
      
    </>
  )
}
