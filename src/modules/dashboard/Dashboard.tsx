import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import img1 from '../../assets/Images/dashboard-1.png';
import img2 from '../../assets/Images/dashboard-2.png';
import img3 from '../../assets/Images/dashboard-3.png';
import { privateInstance } from '../../services/apiConfig';
import { PROJECTS_URLS, TASKS_URLS, USERS_URLS } from '../../services/apiUrls';
import PieChartComponent from '../shared/Charts/Charts';

const Dashboard = () => {
  const { loginData } = useAuthContext();
  const [taskNums, setTaskNums] = useState(0);
  const [progress, setProgress] = useState(0);
  const [projects, setProjects] = useState(0);
  const [active, setActive] = useState(0);
  const [inActive, setInActive] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await privateInstance.get(TASKS_URLS.COUNT_TASKS);
        setTaskNums(taskResponse.data.toDo);
        setProgress(taskResponse.data.inProgress);

        const projectResponse = await privateInstance.get(PROJECTS_URLS.GET_ALL_PROJECTS);
        setProjects(projectResponse.data.totalNumberOfRecords);

        const userResponse = await privateInstance.get(USERS_URLS.COUNT_USERS);
        setActive(userResponse?.data?.activatedEmployeeCount);
        setInActive(userResponse?.data?.deactivatedEmployeeCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <header className='rounded-4 p-5 text-light mb-5 '>
        <div className="header-container">
          <div className="header-content py-4">
            <h1 className='mb-4 fw-normal'>
              Welcome <span style={{ color: "rgba(239, 155, 40, 1)" }}>{loginData?.userName}</span>
            </h1>
            <h2 className='fw-normal'>You can add projects and assign tasks to your team</h2>
          </div>
        </div>
      </header>

      <div className="container ">
        <div className="d-flex flex-wrap justify-content-center w-100 gap-3">
          <div className="bg-light p-3 col-12 col-md-6 rounded-3">
            <div className="border-start border-warning border-4 px-3 mb-4">
              <h2 className="mb-1">Tasks</h2>
              <p className="text-muted">Manage your tasks efficiently.</p>
            </div>

            <div className="row">
              {[{ label: "Progress", value: progress, bgColor: "rgba(229, 230, 244, 1)", img: img1 },
                { label: "Tasks Numbers", value: taskNums, bgColor: "rgba(244, 244, 229, 1)", img: img2 },
                { label: "Projects Numbers", value: projects, bgColor: "rgba(244, 229, 237, 1)", img: img3 }].map((item, index) => (
                  <div key={index} className="col-12 col-sm-6 col-lg-4 mb-3">
                    <div className="box-Progress p-3 shadow-sm rounded" style={{ backgroundColor: item.bgColor }}>
                      <div className="box-img text-center mb-2">
                        <img src={item.img} alt="Icon" className="img-fluid" />
                      </div>
                      <p className="text-center fw-bold">{item.label}</p>
                      <h3 className="text-center text-primary">{item.value}</h3>
                    </div>
                  </div>
              ))}
            </div>

            <div className="w-100 d-flex justify-content-center mt-4">
              <PieChartComponent one={progress} two={taskNums} three={projects} colorOne="rgba(54, 162, 235, 0.2)" colorTwo="rgba(255, 205, 86, 0.2)" colorThree="rgba(244, 229, 237, 1)" />
            </div>
          </div>

          {loginData?.userGroup !== 'Employee' && (
            <div className="bg-light p-3 col-12 col-md-5 rounded-3">
              <div className="border-start border-warning border-4 px-3 mb-4">
                <h2 className="mb-1">Users</h2>
                <p className="text-muted">User activity overview.</p>
              </div>

              <div className="row gap-3">
                {[{ label: "Active", value: active, bgColor: "rgba(229, 230, 244, 1)", img: img1 },
                  { label: "Inactive", value: inActive, bgColor: "rgba(244, 244, 229, 1)", img: img2 }].map((item, index) => (
                    <div key={index} className="col-12 col-sm-6 col-lg-4 mb-3">
                      <div className="box-Progress p-3 shadow-sm rounded" style={{ backgroundColor: item.bgColor }}>
                        <div className="box-img text-center mb-2">
                          <img src={item.img} alt="Icon" className="img-fluid" />
                        </div>
                        <p className="text-center fw-bold">{item.label}</p>
                        <h3 className="text-center text-primary">{item.value}</h3>
                      </div>
                    </div>
                ))}
              </div>

              <div className="w-100 d-flex justify-content-center mt-4">
                <PieChartComponent one={active} two={inActive} colorOne='rgba(229, 230, 244, 1)' colorTwo='rgba(244, 244, 229, 1)' />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;