import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { privateInstance } from "../../services/apiConfig";
import { TASKS_URLS } from "../../services/apiUrls";
import Button from "react-bootstrap/Button";
import NoData from "../shared/NoData/NoData";
import Spinner from "../shared/Spinner/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import DeleteConfirmation from "../shared/DeleteConfirmation/DeleteConfirmation";
import TaskDetailsModal from "./TaskDetailsModal";
import Newpagination from "../shared/Newpagination/Newpagination";
import HeaderTable from "../shared/HeaderTable/HeaderTable";
import { CurrentTask } from "../../interfaces/taskinterface";
// Define types for task and props

function Tasklist() {
  const {
    tasks,
    setSearchQueryTasks,
    isLoading,
    setStatsTasks,
    alltasks,
    paginationtask,
    setpaginationtask,
  } = useAuthContext();
  const { currentPage, totalNumberOfRecords, totalNumberOfPages } =
    paginationtask;

  console.log(currentPage, totalNumberOfRecords, totalNumberOfPages);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalShowdetails, setModalShowdetails] = useState<boolean>(false);
  const [currenttask, setcurrenttask] = useState<CurrentTask | null>(null);
  const [taskId, settaskId] = useState<number>(0);
  const navigate = useNavigate();
  const handleSearchBarTasks = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQueryTasks(e.target.value);
  };
  const handleSelectTasks = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatsTasks(e.target.value);
  };

  const handleAddTask = () => {
    navigate("/dashboard/tasklist/newtask");
  };

  const deletettask = async (id: number) => {
    try {
      await privateInstance.delete(TASKS_URLS.DELETE_TASK(id));
      toast.success("The task has been deleted successfully");
      alltasks();
    } catch (error) {
      console.log(error || "Failed to delete task");
    }
  };
  const handleDeletetask = (id: number) => {
    setModalShow(true);
    settaskId(id);
  };
  const GetCurrentTask = (currentTask: CurrentTask) => {
    setcurrenttask(currentTask);
    setModalShowdetails(true);
  };
  return (
    <>
      <HeaderTable
        header="Tasks"
        namebtn="Add New Task"
        handleAdd={handleAddTask}
      />
      <div className="task-filter-table-pagination mx-2 my-3 bg-body rounded">
        <div className="task-filter py-3 d-flex align-items-center gap-2">
          <div className="search-bar d-flex align-items-center">
            <div
              className="position-relative fs-6"
              style={{ left: "40px", marginTop: "-2px" }}
            >
              <i className="fa-solid fa-magnifying-glass text-secondary"></i>
            </div>
            <input
              type="search"
              placeholder="Search Fleets"
              className="px-5 py-2 rounded-pill border-1 border"
              onChange={handleSearchBarTasks}
            />
          </div>
          <div className="filter position-relative">
            <select
              className="form-select rounded-pill ps-5"
              aria-label="Default select example"
              onChange={handleSelectTasks}
            >
              <option selected value={"ToDo"} key={0}>
                Filter
              </option>
              <option key={1} value={"ToDo"}>
                To Do
              </option>
              <option key={2} value={"InProgress"}>
                In Progress
              </option>
              <option key={3} value={"Done"}>
                Done
              </option>
            </select>
          </div>
        </div>
        <div className="task-table">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-secondary overflow-visible">
              <tr>
                <th scope="col" className="py-4">
                  Title <i className="fa-solid fa-sort"></i>
                </th>
                <th scope="col" className="py-4">
                  Status <i className="fa-solid fa-sort"></i>
                </th>
                <th scope="col" className="py-4">
                  User <i className="fa-solid fa-sort"></i>
                </th>
                <th scope="col" className="py-4">
                  Project <i className="fa-solid fa-sort"></i>
                </th>
                <th scope="col" className="py-4">
                  Date Created <i className="fa-solid fa-sort"></i>
                </th>
                <th scope="col" className="py-4">
                  Action <i className="fa-solid fa-sort"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.length > 0 ? (
                tasks?.map((task: CurrentTask) => (
                  <tr key={task?.id}>
                    <td data-label="title">{task?.title}</td>
                    <td data-label="status">{task?.status}</td>
                    <td data-label="userName">{task?.employee?.userName}</td>
                    <td data-label="description">{task?.description}</td>
                    <td data-label="creationDate" className="text-wrap">
                      {new Date(task?.creationDate).toLocaleString()}
                    </td>
                    <td>
                      <button
                        className="border-0 bg-transparent"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <li role="button" onClick={() => GetCurrentTask(task)}>
                          <a className="text-decoration-none dropdown-item">
                            <i className="mx-2 text-success fa-regular fa-eye"></i>
                            View
                          </a>
                        </li>
                        <Link
                          to={`/dashboard/tasklist/${task?.id}`}
                          className="text-decoration-none dropdown-item"
                        >
                          <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                          Edit
                        </Link>
                        <li>
                          <Button
                            variant="primary"
                            className="dropdown-item"
                            onClick={() => handleDeletetask(task?.id)}
                          >
                            <i className="mx-2 text-success fa-solid fa-trash-can"></i>
                            Delete
                          </Button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={7}>
                    {isLoading ? <Spinner /> : <NoData />}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="task-pagination">
          <Newpagination
            setpagination={setpaginationtask}
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
            totalNumberOfRecords={totalNumberOfRecords}
          />
        </div>
        <DeleteConfirmation
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={taskId}
          deletettask={deletettask}
        />
        <TaskDetailsModal
          show={modalShowdetails}
          onHide={() => setModalShowdetails(false)}
          task={currenttask}
        />
      </div>
    </>
  );
}

export default Tasklist;
