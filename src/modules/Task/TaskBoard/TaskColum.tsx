import { toast } from 'react-toastify';
import { Status, Task } from '../../../interfaces/TaskBoardResponse';
import { privateInstance } from '../../../services/apiConfig';
import { TASKS_URLS } from '../../../services/apiUrls';
import { motion } from 'framer-motion';
import { Spinner } from 'react-bootstrap';

const TaskColumn = ({ title, tasks, refetchTasks, setTasks, loading }:
  { title: Status; tasks: Task[]; refetchTasks: () => Promise<void>, setTasks: React.Dispatch<React.SetStateAction<Task[]>>; loading: boolean; }) => {
  
  const getStatusTitle = (status: Status) => {
    switch (status) {
      case 'ToDo':
        return 'To Do';
      case 'InProgress':
        return 'In Progress';
      case 'Done':
        return 'Done';
      default:
        return status;
    }
  };
  
  
  const changeTaskStatus = async (id: number, status: Status, prevStatus: Status) => {
    try {
      const res = await privateInstance.put(TASKS_URLS.CHANGE_STATUS(id), { status });
      await refetchTasks()
      console.log(res)
      // toast.success(`${res.data.title} status changed to ${res.data.status} successfully`);
      // toast.success(`"${res.data.title}" moved to "${getStatusTitle(res.data.status)}"`);
      toast.success(`"${res.data.title}" moved from "${getStatusTitle(prevStatus)}" to "${getStatusTitle(res.data.status)}"`);

    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="col-md-4">
      <h5 style={{ color: 'rgba(79, 79, 79, 1)' }} className="fw-semibold mb-5 ms-4">
        {getStatusTitle(title)}
      </h5>
      <motion.div
        layout={true}
        layoutId={title}
        key={title}
        className="p-3 py-5 rounded-4"
        style={{ backgroundColor: 'rgba(49, 89, 81, 0.9)', minHeight: '400px' }}

        onDrop={(e) => {
          e.preventDefault();
          console.log("Dropped");
          console.log(`next : ${title}`)
          const id = e.dataTransfer.getData("taskId");
          const prevStatus = e.dataTransfer.getData("prevStatus") as Status;
          console.log(id)
          console.log(`prev : ${prevStatus}`)
          if (prevStatus != title) {
            setTasks((prevTasks) => {
              const newTasks = prevTasks.map((task) => {
                if (task.id === Number(id)) {
                  task.status = title;
                  return task;
                } else {
                  return task;
                }
                
              });
              return newTasks;
            })
            changeTaskStatus(Number(id),title,prevStatus)
          } 
          
      }}
        
        onDragOver={(e) => {
          e.preventDefault();
          console.log("Drag Overrr")
        }}
      >

        
        {loading ? (
  <div className="text-white text-center"><Spinner animation="border"
  role="status"
  style={{
    color: 'rgba(239, 155, 40, 1)',
    width: '3rem',
    height: '3rem',
    borderWidth: '0.3em'
  }}/></div> 
) : (
  tasks.map((task) => (
    <motion.div
      layout={true}
      layoutId={task.id.toString()}
      key={task.id}
      draggable={true}
      onDragStart={(e: React.DragEvent) => {
        e.dataTransfer.setData("taskId", task.id.toString());
        e.dataTransfer.setData("prevStatus", title);
        e.currentTarget.style.opacity = "0.5";
      }}
      onDragEnd={(e: React.DragEvent) => {
        e.currentTarget.style.opacity = "1";
      }}
      style={{ backgroundColor: 'rgba(239, 155, 40, 1)', cursor: "move" }}
      className="text-white rounded-3 p-3 mb-3 d-flex justify-content-between align-items-center"
    >
      {task.title}
    </motion.div>
  ))
)}


      </motion.div>
    </div>
  );
};

export default TaskColumn;
