import { useState , useEffect, useContext } from "react";
import styles from "../Card/showform.module.css";
import TaskContext from "../../../TaskContext";

export default function ShowForm({onSubmit , initialTitle = "" ,initialDescription = "" }) {

  const {editingTask} = useContext(TaskContext);
  
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);


  // Update form fields when initial values change (e.g., when editing a task)
  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  function handleSubmit(e){
    e.preventDefault();
    onSubmit(title ,description);
    setTitle("");
    setDescription("");
  }

  return (
    <>
          <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <input type="text" placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} className={styles.inputField}/>

            <textarea placeholder='Description' value={description} onChange={(e)=> setDescription(e.target.value)} className={styles.textareaField}></textarea>

            
            <button type='submit' className={styles.addButton}>{editingTask ? "Update" : "add Task"}</button>
          </form>
        </div>
        
      
    </>
  )
}
