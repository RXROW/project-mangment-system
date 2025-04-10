import { toast } from 'react-toastify'
import { useAuthContext } from '../../context/AuthContext'
import { privateInstance } from '../../services/apiConfig'
import { TASKS_URLS } from '../../services/apiUrls'
import NoData from '../shared/NoData/NoData'
import { useNavigate } from 'react-router-dom'
import { useState, ChangeEvent } from 'react'
import DeleteConfirmation from '../shared/DeleteConfirmation/DeleteConfirmation'
import Newpagination from '../shared/Newpagination/Newpagination'
import HeaderTable from '../shared/HeaderTable/HeaderTable'
import { CurrentTask } from '../../interfaces/taskinterface'
import ViewDetailsModal from '../shared/Modals/ViewDetailsModal'
import ActionMenu from '../shared/ActionTable/ActionMenu'
import TheadTable from '../shared/TheadTable/TheadTable/TheadTable'
import Filtration from '../shared/Filter/Filter'
import SpinnerTable from '../shared/Spinner/SpinnerTable'
import TaskBoard from './TaskBoard/TaskBoard'
import { div } from 'framer-motion/client'
// import TaskBoard from './TaskBoard/TaskBoard'
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
    loginData,
  } = useAuthContext()
  const { currentPage, totalNumberOfRecords, totalNumberOfPages } =
    paginationtask

  console.log(currentPage, totalNumberOfRecords, totalNumberOfPages)
  console.log(loginData?.userGroup);

  const [modalShow, setModalShow] = useState<boolean>(false)
  const [modalShowdetails, setModalShowdetails] = useState<boolean>(false)
  const [currenttask, setcurrenttask] = useState<CurrentTask | null>(null)
  const [taskId, settaskId] = useState<number>(0)
  const navigate = useNavigate()
  const handleSearchBarTasks = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQueryTasks(e.target.value)
  }
  const handleSelectTasks = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatsTasks(e.target.value as 'ToDo' | 'InProgress' | 'Done')
  }
  const handleAddTask = () => {
    navigate('/dashboard/tasks/newtask')
  }
  const handleDeletetTaskApi = async () => {
    try {
      await privateInstance.delete(TASKS_URLS.DELETE_TASK(taskId))
      toast.success('The task has been deleted successfully')
      alltasks()
    } catch (error) {
      console.log(error || 'Failed to delete task')
    }
  }
  const handleDeletetask = (id: number) => {
    setModalShow(true)
    settaskId(id)
    console.log(id)
  }
  function handleEditTask(id: number) {
    navigate(`/dashboard/tasks/${id}`)
  }
  const GetCurrentTask = (currentTask: CurrentTask) => {
    setcurrenttask(currentTask)
    setModalShowdetails(true)
  }
  return (
    <>
      <HeaderTable
        // header="Tasks"
        header={loginData?.userGroup === 'Manager' ? 'Tasks' : 'Tasks Board'}
        namebtn="Add New Task"
        handleAdd={handleAddTask}
      />
      {loginData?.userGroup === 'Manager' ? (
        <div className="task-filter-table-pagination mx-2 my-3 bg-body rounded">
        <div className="task-filter py-3 d-flex align-items-center gap-2">
          <div className="search-bar d-flex align-items-center">
            <div
              className="position-relative fs-6"
              style={{ left: '40px', marginTop: '-2px' }}
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
              <option selected value={'ToDo'} key={0}>
                Filter
              </option>
              <option key={1} value={'ToDo'}>
                To Do
              </option>
              <option key={2} value={'InProgress'}>
                In Progress
              </option>
              <option key={3} value={'Done'}>
                Done
              </option>
            </select>
          </div>
        </div>
        {/* <Filtration pageName="tasks" /> */}

        <div className="task-table">
          <table className="table table-striped table-hover text-center align-middle">
            <TheadTable
              colone="Title"
              coltwo="Status"
              colthree="User"
              colfour="Project"
              dateCreated="Date Created"
              action="Action"
              nametable="task"
            />
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

                    <ActionMenu
                      onView={() => GetCurrentTask(task)}
                      onEdit={() => handleEditTask(task.id)}
                      onDelete={() => handleDeletetask(task.id)}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={7}>
                    {isLoading ? <SpinnerTable /> : <NoData />}
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
        </div>
      ) : (
          
            <TaskBoard/>
      )}
      

      <DeleteConfirmation
        toggleShow={modalShow}
        handleClose={() => setModalShow(false)}
        deleteFunction={handleDeletetTaskApi}
      />
      <ViewDetailsModal
        show={modalShowdetails}
        handleClose={() => setModalShowdetails(false)}
        details={currenttask}
        type="task"
      />
    </>
  )
}

export default Tasklist
