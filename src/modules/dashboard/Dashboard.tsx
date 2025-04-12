import { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import img1 from '../../assets/Images/dashboard-1.png';
import img2 from '../../assets/Images/dashboard-2.png';
import img3 from '../../assets/Images/dashboard-3.png';
import { TasksData } from '../../services/tasksData';
import { UsersData } from '../../services/usersData';
import StatCard from './StateCard/StatCard';
import ChartComponent from '../shared/Charts/Charts';
import useThemeContext from '../../hooks/useThemeContext';

const Dashboard = () => {
  const { loginData } = useAuthContext();
  const [tasksToDo, setTaskToDo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [taskDone, setTaskDone] = useState(0);
  const [active, setActive] = useState(0);
  const [inActive, setInActive] = useState(0);
  const { theme } = useThemeContext();

  const isDarkMode = theme === 'dark';

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

  const taskCards = [
    { title: "In Progress", count: progress, image: img1, bgColor: isDarkMode ? "rgba(45, 55, 72, 0.8)" : "rgba(229, 230, 244, 1)" },
    { title: "To Do", count: tasksToDo, image: img2, bgColor: isDarkMode ? "rgba(55, 65, 81, 0.8)" : "rgba(244, 244, 229, 1)" },
    { title: "Done", count: taskDone, image: img3, bgColor: isDarkMode ? "rgba(67, 56, 71, 0.8)" : "rgba(244, 229, 237, 1)" },
  ];

  const userCards = [
    { title: "Active", count: active, image: img1, bgColor: isDarkMode ? "rgba(45, 55, 72, 0.8)" : "rgba(229, 230, 244, 1)" },
    { title: "Inactive", count: inActive, image: img2, bgColor: isDarkMode ? "rgba(55, 65, 81, 0.8)" : "rgba(244, 244, 229, 1)" },
  ];

  // Header styles based on theme
  const headerStyle = {
    backgroundColor: isDarkMode ? "#1a2634" : "#007bff",
  };

  // Text color styles based on theme
  const textStyle = {
    color: isDarkMode ? "#e0e0e0" : "inherit"
  };

  // Panel background style based on theme
  const panelStyle = {
    backgroundColor: isDarkMode ? "#0e2416" : "#ffffff",
    color: isDarkMode ? "#e0e0e0" : "inherit"
  };

  return (
    <div className="" style={isDarkMode ? { backgroundColor: "#121212", color: "#e0e0e0" } : {}}>
      <div className="container p-4">
        <header className='rounded-4 p-5 text-light mb-5' style={headerStyle}>
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
          <div className="col-12 col-md-6 p-4 rounded-3 shadow-sm" style={panelStyle}>
            <div className="border-start border-warning border-4 px-3 mb-4">
              <h2 className="mb-1" style={textStyle}>Tasks</h2>
              <p className={isDarkMode ? "text-light-emphasis" : "text-muted"}>Manage your tasks efficiently.</p>
            </div>

            <div className="row">
              {taskCards.map((card, idx) => (
                <div className="col-12 col-sm-6 col-lg-4 mb-3" key={idx}>
                  <StatCard {...card} isDarkMode={isDarkMode} />
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center">
              <ChartComponent
                one={progress}
                two={tasksToDo}
                three={taskDone}
                colorOne={isDarkMode ? "rgba(54, 162, 235, 0.7)" : "rgba(54, 162, 235, 0.5)"}
                colorTwo={isDarkMode ? "rgba(255, 205, 86, 0.7)" : "rgba(255, 205, 86, 0.5)"}
                colorThree={isDarkMode ? "rgba(244, 229, 237, 0.9)" : "rgba(244, 229, 237, 0.7)"}
               
              />
            </div>
          </div>

          {loginData?.userGroup !== 'Employee' && (
            <div className="col-12 col-md-5 p-4 rounded-3 shadow-sm" style={panelStyle}>
              <div className="border-start border-warning border-4 px-3 mb-4">
                <h2 className="mb-1" style={textStyle}>Users</h2>
                <p className={isDarkMode ? "text-light-emphasis" : "text-muted"}>User activity overview.</p>
              </div>

              <div className="row">
                {userCards.map((card, idx) => (
                  <div className="col-12 col-md-5 col-sm-6 mb-3" key={idx}>
                    <StatCard {...card} isDarkMode={isDarkMode} />
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-center">
                <ChartComponent
                  one={active}
                  two={inActive}
                  colorOne={isDarkMode ? "rgba(75, 192, 192, 0.7)" : "rgba(229, 230, 244, 1)"}
                  colorTwo={isDarkMode ? "rgba(255, 159, 64, 0.7)" : "rgba(244, 244, 229, 1)"}
               
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