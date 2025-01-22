import styles from '../../dashboardStyling/tasksStyling/completed.module.css';
import { FaCircle } from "react-icons/fa";
import ShowForm from '../Card/ShowForm';
import DisplayCard from '../Card/DisplayCard';
import { useContext } from 'react';
import TaskContext from '../../../TaskContext';

export default function Completed() {
  const {tasks , showForm , formColumn , editingTask , addOrUpdateTask , updateTaskStatus , searchTerm , toDate ,fromDate ,setFormColumn ,setShowForm} = useContext(TaskContext);


  // filter tasks with status "To Start"
  const completedTasks = tasks? tasks.filter((task)=>{
    // get the creation task date
    const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
    // match based on title for the left part 
    const matchesTilte = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFromDate = fromDate ? taskDate >= fromDate : true;
    const matchedToDate = toDate ? taskDate <= toDate : true ;

    return(
      task.status === "Completed" && matchesTilte && matchesFromDate && matchedToDate
    );
  }): [];
  
     //Handle Drop 
    function handleDrop(e , newStatus){
      e.preventDefault();
      const taskId = +e.dataTransfer.getData("taskId");
      updateTaskStatus(taskId, newStatus);
    }
    
    //allow Drop
    function handleDragOver(e){
      e.preventDefault();
    }

    function handleAddNewTask(){
      setShowForm(true);
      setFormColumn('Completed');
    }
  
  return (
    <>
      <div className={styles.completedConatiner}>
        <h3 className={styles.text}><FaCircle className={styles.circleIcon}/>Completed</h3>

        <div className={styles.innerContainer} onDrop={(e)=> handleDrop(e , "Completed")} onDragOver={handleDragOver}>

          {
              showForm &&  formColumn=== "Completed" && (
                <ShowForm
                  onSubmit={(title, description) =>
                    addOrUpdateTask(
                      editingTask?.id, // Pass the task ID if editing, otherwise null
                      title,
                      description,
                      "Completed" // Preserve the status as "Completed"
                    )
                  }
                  initialTitle={editingTask ? editingTask.title : ""}
                  initialDescription={editingTask ? editingTask.description : ""}
                />
              )
            }

          {
            completedTasks.map((task) => <DisplayCard key={task.id} task={task}/>)
          }
          {/* Display "Add New Task" button if there are at least one task */}
          {
            completedTasks.length >= 1 && (
              <button className={styles.addtask} onClick={handleAddNewTask}>Add New</button>
            )
          }
          </div>
      </div>
    </>
  )
}

