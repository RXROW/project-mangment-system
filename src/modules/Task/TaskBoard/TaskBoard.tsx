import { useEffect, useState } from 'react';
import { Task, TasksResponse } from '../../../interfaces/TaskBoardResponse';
import { privateInstance } from '../../../services/apiConfig';
import { TASKS_URLS } from '../../../services/apiUrls';
import TaskColumn from './TaskColum';

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  const getAllMyAssignedTasks = async () => {
    try {
      setLoading(true); 
      const response = await privateInstance.get<TasksResponse>(TASKS_URLS.GET_ASSIGNED_TASKS);
      setTasks(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    getAllMyAssignedTasks();
  }, []);

  const TasksToDo = tasks.filter(({ status }) => status === 'ToDo');
  const TasksInProgress = tasks.filter(({ status }) => status === 'InProgress');
  const TasksDone = tasks.filter(({ status }) => status === 'Done');

  return (
    <div className="container my-4">
      <div className="row g-3">
        <TaskColumn
          title="ToDo"
          tasks={TasksToDo}
          refetchTasks={getAllMyAssignedTasks}
          setTasks={setTasks}
          loading={loading} 
        />
        <TaskColumn
          title="InProgress"
          tasks={TasksInProgress}
          refetchTasks={getAllMyAssignedTasks}
          setTasks={setTasks}
          loading={loading}
        />
        <TaskColumn
          title="Done"
          tasks={TasksDone}
          refetchTasks={getAllMyAssignedTasks}
          setTasks={setTasks}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default TaskBoard;
