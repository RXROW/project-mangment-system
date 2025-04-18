import { SubmitHandler, useForm } from 'react-hook-form'
import { useMoveBack } from '../../hooks/useMoveBack'
import {
  projectfortask,
  RouteParams,
  TaskData,
  TaskResponse,
} from '../../interfaces/taskinterface'
import { TASKS_URLS } from '../../services/apiUrls'
import { privateInstance } from '../../services/apiConfig'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import { JSX, useEffect, useState } from 'react'
import HeaderTable from '../shared/HeaderTable/HeaderTable'
import useThemeContext from '../../hooks/useThemeContext'

export default function Taskdata(): JSX.Element {
  const { alltasks, userfortask, projectfortask } = useAuthContext()
  const [isFormEdited, setIsFormEdited] = useState<boolean>(false)
  const params = useParams<any>()
  const taskId = params.taskId
  const goBack = useMoveBack()
  const { theme } = useThemeContext()
  const isDarkMode = theme === "dark"

  const handleInputChange = (): void => {
    setIsFormEdited(true)
  }

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskData>()

  const onSubmit: SubmitHandler<TaskData> = async (
    data: TaskData
  ): Promise<void> => {
    try {
      if (taskId) {
        await privateInstance.put(TASKS_URLS.UPDATE_TASK(taskId), data)
        toast.success('Task Updated Successfully')
      } else {
        await privateInstance.post(TASKS_URLS.ADD_TASK, data)
        toast.success('Task Added Successfully')
      }
      reset()
      alltasks()
      goBack()
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.toString() : 'Failed to add task')
    }
  }

  const getTaskById = async (): Promise<void> => {
    try {
      if (!taskId) return
      const res = await privateInstance.get<TaskResponse>(
        TASKS_URLS.GET_TASK(taskId)
      )
      setValue('title', res?.data?.title)
      setValue('description', res?.data?.description)
      setValue('employeeId', res?.data?.employee?.id)
    } catch (error) {
      console.error(error || 'Failed to get data')
    }
  }

  useEffect(() => {
    if (taskId) {
      getTaskById()
    }
  }, [taskId])

  // Dynamic classes based on theme
  const containerClass = isDarkMode
    ? "container w-75 bg-dark text-white my-5 p-3 rounded-4 shadow-sm"
    : "container w-75 bg-white my-5 p-3 rounded-4 shadow-sm"

  const inputClass = isDarkMode
    ? "form-control rounded-4 my-2 bg-dark text-white border-secondary"
    : "form-control rounded-4 my-2"

  const cancelBtnClass = isDarkMode
    ? "btn btn-outline-light rounded-pill py-2 px-md-4"
    : "btn btn-outline-dark rounded-pill py-2 px-md-4"

  const formDividerClass = isDarkMode
    ? "btn-container d-flex justify-content-between align-items-center border-1 border-top border-secondary py-4"
    : "btn-container d-flex justify-content-between align-items-center border-1 border-top py-4"

  return (
    <div className={isDarkMode ? "bg-dark text-white" : ""}>
      <HeaderTable
        goBack={goBack}
        type="update"
        header={taskId ? 'Update Task ' : 'Add a New Task'}
        namebtn="View All Tasks"
      />
      <div className={containerClass}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="my-2 ms-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              className={inputClass}
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              name="title"
              onChange={handleInputChange}
            />
            {errors.title && (
              <span className="text-danger">{errors.title.message}</span>
            )}
          </div>
          <div className="my-4">
            <label className="my-2 ms-2">Description</label>
            <textarea
              {...register('description', {
                required: 'Description is required',
              })}
              className={inputClass}
              placeholder="Description"
              name="description"
              onChange={handleInputChange}
            ></textarea>
            {errors.description && (
              <span className="text-danger">{errors.description.message}</span>
            )}
          </div>
          <div className="row my-4">
            <div className="col-md-6">
              <div className="mb-4">
                <label className="my-2 ms-2">User</label>
                <select
                  className={inputClass}
                  {...register('employeeId', { required: 'User is required' })}
                  name="employeeId"
                  onChange={handleInputChange}
                >
                  {userfortask?.length === 0 && (
                    <option value="">No User Available</option>
                  )}
                  {userfortask?.length > 0 && (
                    <option value="">Select User</option>
                  )}
                  {userfortask?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))}
                </select>
              </div>
              {errors.employeeId && (
                <span className="text-danger">{errors.employeeId.message}</span>
              )}
            </div>
            {!taskId && (
              <div className="col-md-6">
                <div className="mb-4">
                  <label className="my-2 ms-2">Project</label>
                  <select
                    {...register('projectId', {
                      required: 'Project is required',
                    })}
                    className={inputClass}
                    name="projectId"
                    onChange={handleInputChange}
                  >
                    {projectfortask?.length === 0 && (
                      <option value="">No Project Available</option>
                    )}
                    {projectfortask?.length > 0 && (
                      <option value="">Select Project</option>
                    )}
                    {projectfortask?.map((project: projectfortask) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.projectId && (
                  <span className="text-danger">
                    {errors.projectId.message}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={formDividerClass}>
            <span
              onClick={() => goBack()}
              className={cancelBtnClass}
            >
              Cancel
            </span>
            <button
              className="btn btn-warning rounded-pill py-2 px-md-4 text-white"
              type="submit"
              disabled={!isFormEdited || isSubmitting}
            >
              {isSubmitting ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : taskId ? (
                'Update Task'
              ) : (
                'Add Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}