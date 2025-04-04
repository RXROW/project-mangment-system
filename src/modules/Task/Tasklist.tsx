/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthContext } from "../../context/AuthContext";
import NoData from "../shared/NoData/NoData";
import Spinner from "../shared/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
function Tasklist() {
  const { tasks, setSearchQueryTasks, isLoading, setStatsTasks } =
    useAuthContext();
  const navigate = useNavigate();
  function handleSearchBarTasks(e) {
    setSearchQueryTasks(e.target.value);
  }
  function handleSelectTasks(e) {
    console.log(e.target.value);
    setStatsTasks(e.target.value);
  }
  const handleAddTask = () => {
    navigate("/dashboard/tasklist/newtask");
  };
  return (
    <>
      <div
        role="button"
        className="bg-white mt-2 d-flex justify-content-between align-items-center p-4 shadow-sm border-top"
        onClick={handleAddTask}
      >
        <h3 className="m-0 ps-md-5">Tasks</h3>
        <div className=" py-2 px-4 rounded-pill auth-btn text-light ">
          <i className="fa-solid fa-plus"></i>
          <span className="ps-3 ">Add New Task</span>
        </div>
      </div>
      <div className="task-filter-table-pagination mx-2 my-3 bg-body rounded">
        <div className="task-filter py-3 d-flex align-items-center gap-2">
          <div className="search-bar d-flex align-items-center ">
            <div
              className=" position-relative fs-6"
              style={{ left: "40px", marginTop: "-2px" }}
            >
              <i className="fa-solid fa-magnifying-glass text-secondary"></i>
            </div>
            <input
              type="search"
              placeholder="Search Fleets"
              className=" px-5 py-2 rounded-pill  border-1 border"
              onChange={handleSearchBarTasks}
            />
          </div>
          <div className="filter position-relative">
            <select
              className="form-select rounded-pill ps-5"
              aria-label="Default select example"
              onChange={handleSelectTasks}
            >
              <option selected key={0}>
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
          <table className="table table-striped  table-hover text-center align-middle">
            <thead className="table-secondary overflow-visible">
              <tr>
                <th scope="col" className="py-4">
                  Title <i className="fa-solid fa-sort"></i>
                </th>
                <th scope="col" className="py-4">
                  Statues <i className="fa-solid fa-sort"></i>
                </th>
                <th scope="col " className="py-4">
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
                tasks?.map((task) => (
                  <tr key={task?.id}>
                    <td data-label="title">{task?.title}</td>
                    <td data-label="status">{task?.status} </td>
                    <td data-label="userName">
                      {task?.project?.manager?.userName}
                    </td>
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
                        <li role="button">
                          <a className="dropdown-item">
                            <i className="mx-2 text-success fa-regular fa-eye"></i>
                            View
                          </a>
                        </li>
                        <li>
                          <a
                            className="text-decoration-none dropdown-item"
                            href="#/dashboard/task-edit/1348"
                          >
                            <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                            Edit
                          </a>
                        </li>
                        <li>
                          <button className="dropdown-item">
                            <i className="mx-2 text-success fa-solid fa-trash-can"></i>
                            Delete
                          </button>
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
      </div>
    </>
  );
}
export default Tasklist;
