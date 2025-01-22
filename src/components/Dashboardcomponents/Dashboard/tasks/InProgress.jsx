import styles from '../../dashboardStyling/tasksStyling/inprogress.module.css';
import { FaCircle } from "react-icons/fa";
import ShowForm from '../Card/ShowForm';
import DisplayCard from '../Card/DisplayCard';
import { useContext } from 'react';
import TaskContext from '../../../TaskContext';



export default function InProgress() {
  const {tasks , showForm , formColumn , editingTask , addOrUpdateTask , updateTaskStatus , searchTerm , fromDate ,toDate ,setFormColumn,setShowForm } = useContext(TaskContext);


   // filter tasks with status "To Start"
  const inPogressTasks = tasks? tasks.filter((task)=>{
    // get the creation task date
    const taskDate = new Date(task.createdAt).toISOString().split('T')[0];
    // match based on title for the left part 
    const matchesTilte = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFromDate = fromDate ? taskDate >= fromDate : true;
    const matchedToDate = toDate ? taskDate <= toDate : true ;

    return(
      task.status === "in Progress" && matchesTilte && matchesFromDate && matchedToDate
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
    setFormColumn('in Progress');
  }


  return (
    <>
      <div className={styles.inProgressContainer}>
        <h3 className={styles.text}>
          <FaCircle className={styles.circleIcon}/>
          in Progress
        </h3>

        <div className={styles.innerContainer} 
        onDrop={(e)=> handleDrop(e , "in Progress")} 
        onDragOver={handleDragOver}
        >

          {
            showForm && formColumn === "in Progress" &&(
              <ShowForm
                onSubmit={(title, description) =>
                  addOrUpdateTask(
                    editingTask?.id, // Pass the task ID if editing, otherwise null
                    title,
                    description,
                    "in Progress" // Preserve the status as "In Progress"
                  )
                }
                initialTitle={editingTask ? editingTask.title : ""}
                initialDescription={editingTask ? editingTask.description : ""}
              />
            )
          }
            
            {
              inPogressTasks.map((task) => <DisplayCard key={task.id} task={task}/>)
            }

             {/* Display "Add New Task" button if there are at least one task */}
              {
                inPogressTasks.length >= 1 && (
                  <button className={styles.addtask} onClick={handleAddNewTask}>Add New</button>
                )
              }
        </div>
      </div>
    </>
  )
}

