import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import img1 from '../../assets/Images/dashboard-1.png';
import img2 from '../../assets/Images/dashboard-2.png';
import img3 from '../../assets/Images/dashboard-3.png';
import PieChartComponent from '../shared/Charts/Charts';
import { TasksData } from '../../services/tasksData';
import { UsersData } from '../../services/usersData';

const Dashboard = () => {
  const { loginData } = useAuthContext();
  const [tasksToDo, setTaskToDo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [taskDone, setTaskDone] = useState(0);
  const [active, setActive] = useState(0);
  const [inActive, setInActive] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskData = await TasksData(); 
        setTaskToDo(taskData.toDo);
        setProgress(taskData.inProgress);
        setTaskDone(taskData.done);

        const userData = await UsersData(); 
        setActive(userData.activatedEmployeeCount);
        setInActive(userData.deactivatedEmployeeCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="">
      <div className="container p-4">
        <header className='rounded-4 p-5 text-light mb-5'>
          <div className="header-container">
            <div className="header-content py-4">
              <h1 className='mb-4 fw-normal'>
                Welcome <span style={{ color: "rgba(239, 155, 40, 1)" }}>{loginData?.userName}</span>
              </h1>
              <h2 className='fw-normal'>You can add projects and assign tasks to your team</h2>
            </div>

   
          </div>
        </header>
      </div>


      <div className="container_fluid">
        <div className="row justify-content-center w-100 gap-3">
          <div className="col-12 col-md-6 bg-light p-4 rounded-3 shadow-sm">

            <div className="border-start border-warning border-4 px-3 mb-4">
              <h2 className="mb-1">Tasks</h2>
              <p className="text-muted">Manage your tasks efficiently.</p>
            </div>

            <div className="row">
              <div className="col-12 col-sm-6 col-lg-4 mb-3">
                <div className="box-Progress p-3 shadow-sm rounded text-center h-100" style={{ backgroundColor: "rgba(229, 230, 244, 1)", minHeight: "180px" }}>
                  <img src={img1} alt="Icon" className="img-fluid mb-2" />
                  <p className="fw-bold">In Progress</p>
                  <h3 className="text-primary">{progress}</h3>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-4 mb-3">
                <div className="box-Progress p-3 shadow-sm rounded text-center h-100" style={{ backgroundColor: "rgba(244, 244, 229, 1)", minHeight: "180px" }}>
                  <img src={img2} alt="Icon" className="img-fluid mb-2" />
                  <p className="fw-bold">To Do</p>
                  <h3 className="text-primary">{tasksToDo}</h3>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-4 mb-3">
                <div className="box-Progress p-3 shadow-sm rounded text-center h-100" style={{ backgroundColor: "rgba(244, 229, 237, 1)", minHeight: "180px" }}>
                  <img src={img3} alt="Icon" className="img-fluid mb-2" />
                  <p className="fw-bold">Done</p>
                  <h3 className="text-primary">{taskDone}</h3>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-center">
              <PieChartComponent 
                one={progress} 
                two={tasksToDo} 
                three={taskDone} 
                colorOne="rgba(54, 162, 235, 0.2)" 
                colorTwo="rgba(255, 205, 86, 0.2)" 
                colorThree="rgba(244, 229, 237, 1)" 
              />
            </div>
          </div>

          {loginData?.userGroup !== 'Employee' && (
            <div className="col-12 col-md-5 bg-light p-4 rounded-3 shadow-sm">
              <div className="border-start border-warning border-4 px-3 mb-4">
                <h2 className="mb-1">Users</h2>
                <p className="text-muted">User activity overview.</p>
              </div>

              <div className="row">
                <div className="col-12 col-md-5 col-sm-6 mb-3">
                  <div className="box-Progress p-3 shadow-sm rounded text-center h-100" style={{ backgroundColor: "rgba(229, 230, 244, 1)", minHeight: "180px" }}>
                    <img src={img1} alt="Icon" className="img-fluid mb-2" />
                    <p className="fw-bold">Active</p>
                    <h3 className="text-primary">{active}</h3>
                  </div>
                </div>

                <div className="col-12 col-md-5 col-sm-6 mb-3">
                  <div className="box-Progress p-3 shadow-sm rounded text-center h-100" style={{ backgroundColor: "rgba(244, 244, 229, 1)", minHeight: "180px" }}>
                    <img src={img2} alt="Icon" className="img-fluid mb-2" />
                    <p className="fw-bold">Inactive</p>
                    <h3 className="text-primary">{inActive}</h3>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-5 d-flex justify-content-center">
                <PieChartComponent 
                  one={active} 
                  two={inActive} 
                  colorOne="rgba(229, 230, 244, 1)" 
                  colorTwo="rgba(244, 244, 229, 1)" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
