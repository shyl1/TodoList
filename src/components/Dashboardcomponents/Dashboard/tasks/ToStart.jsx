import styles from '../../dashboardStyling/tasksStyling/tostart.module.css';
import { FaCircle } from "react-icons/fa";
import ShowForm from '../Card/ShowForm';
import DisplayCard from '../Card/DisplayCard';
import { useContext } from 'react';
import TaskContext from '../../../TaskContext';

export default function ToStart() {

  const {tasks , showForm , formColumn , editingTask , addOrUpdateTask , updateTaskStatus , searchTerm , fromDate, toDate , setShowForm , setFormColumn} = useContext(TaskContext);

   // filter tasks with status "To Start"
  const toStartTasks = tasks? tasks.filter((task)=>{
    // get the creation task date
    const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
    // match based on title for the left part 
    const matchesTilte = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFromDate = fromDate ? taskDate >= fromDate : true;
    const matchedToDate = toDate ? taskDate <= toDate : true ;

    return(
      task.status === "To Start" && matchesTilte && matchesFromDate && matchedToDate
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
    setFormColumn('To Start');
  }



  return (
    <>
      <div className={styles.toStartContainer}>
        <h3 className={styles.text}><FaCircle className={styles.circleIcon}/>To Start</h3>

        <div className={styles.innerContainer} onDrop={(e)=> handleDrop(e , "To Start")} onDragOver={handleDragOver} >

          {/* Show the form when:
              1. Creating a new task (editingTask === null), or
              2. Editing an existing task (editingTask !== null)
          */}

          {
            showForm && formColumn === "To Start" && (
              <ShowForm 
              onSubmit={(title , description) => 
                addOrUpdateTask(editingTask?.id ,
                  title ,
                  description ,
                  editingTask?.status || "To Start")}
                  initialTitle={editingTask ? editingTask.title : ""}
                  initialDescription={editingTask ? editingTask.description : ""}
                  />
            )
          }

          {
            toStartTasks.map((task) => <DisplayCard key={task.id} task={task}/>)
          }
          
           {/* Display "Add New Task" button if there are at least one task */}
            {
              toStartTasks.length >= 1 && (
                <button className={styles.addtask} onClick={handleAddNewTask}>Add New</button>
              )
            }
        </div>
      </div>
    </>
  )
}
