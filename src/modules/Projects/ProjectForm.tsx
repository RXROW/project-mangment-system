import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddNewProject, Headers } from '../../interfaces/projectsListInterfaces'
import { PROJECTS_URLS } from '../../services/apiUrls'
import { privateInstance } from '../../services/apiConfig'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import HeaderTable from '../shared/HeaderTable/HeaderTable'
import { useMoveBack } from '../../hooks/useMoveBack'
import useThemeContext from '../../hooks/useThemeContext'

export default function ProjectForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<AddNewProject>({ mode: 'onChange' })
  const navigate = useNavigate()
  const { theme } = useThemeContext()
  const isDarkMode = theme === 'dark'

  const { projectId } = useParams<{ projectId: string }>()
  const newProject: boolean = !projectId

  const goBack = useMoveBack()

  const onSubmit = async (data: AddNewProject) => {
    const parsedId = parseInt(projectId!, 10)
    try {
      await privateInstance[newProject ? 'post' : 'put'](
        newProject
          ? PROJECTS_URLS.ADD_PROJECT
          : PROJECTS_URLS.EDIT_PROJECT(parsedId),
        data,
        Headers
      )

      newProject
        ? toast.success('Project added successfully')
        : toast.success('Project updated successfully')
      goBack()
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    if (!newProject) {
      const parsedId = parseInt(projectId!, 10)
      const getProject = async () => {
        const response = await privateInstance.get(
          PROJECTS_URLS.GET_PROJECT(parsedId),
          Headers
        )
        setValue('title', response?.data?.title)
        setValue('description', response?.data?.description)
      }
      getProject()
    }
  }, [newProject, projectId, setValue])

  // Style objects for dark mode
  const formContainerStyle = {
    backgroundColor: isDarkMode ? '#1e1e1e' : 'white',
    color: isDarkMode ? '#e0e0e0' : 'inherit',
    borderRadius: '0.3rem'
  }

  const inputStyle = {
    backgroundColor: isDarkMode ? '#2d2d2d' : 'white',
    color: isDarkMode ? '#e0e0e0' : 'inherit',
    borderColor: isDarkMode ? '#444' : 'light'
  }

  const labelStyle = {
    color: isDarkMode ? '#e0e0e0' : 'inherit'
  }

  const cancelButtonStyle = {
    backgroundColor: isDarkMode ? 'transparent' : 'transparent',
    color: isDarkMode ? '#e0e0e0' : '#212529',
    borderColor: isDarkMode ? '#e0e0e0' : '#212529'
  }

  return (
    <>
      <HeaderTable
        goBack={goBack}
        type="update"
        header={newProject ? 'Add a new Project ' : 'Edit Project Details'}
        namebtn="View All Projects"
      />
      <form className="py-4 px-5 mx-5">
        <div
          className="row p-3 shadow-sm"
          style={formContainerStyle}
        >
          <div className="col-md-12 p-3">
            <div className="mb-3">
              <label
                htmlFor="projectName"
                className="form-label h5"
                style={labelStyle}
              >
                Title
              </label>
              <input
                type="text"
                className="form-control rounded-4 border-3 py-3"
                id="projectName"
                placeholder="Enter Project Title"
                style={inputStyle}
                {...register('title', {
                  required: 'project title is required',
                })}
              />
            </div>
            {errors.title && (
              <span className="text-danger">{errors.title.message}</span>
            )}
            <div className="mb-3">
              <label
                htmlFor="projectDescription"
                className="form-label h5"
                style={labelStyle}
              >
                Description
              </label>
              <input
                type="text"
                className="form-control rounded-4 border-3 py-3"
                id="projectDescription"
                placeholder="Enter Description"
                style={inputStyle}
                {...register('description', {
                  required: 'project description is required',
                })}
              />
            </div>
            {errors.description && (
              <span className="text-danger my-2">
                {errors.description.message}
              </span>
            )}
          </div>
          <div
            className="btn-container d-flex justify-content-between align-items-center border-1 py-4"
            style={{
              borderTop: isDarkMode ? '1px solid #444' : '1px solid #dee2e6'
            }}
          >
            <button
              type="button"
              onClick={() => goBack()}
              className="btn btn-outline-dark rounded-pill py-2 px-md-4"
              style={cancelButtonStyle}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-warning rounded-pill py-2 px-md-4 text-white"
            >
              {isSubmitting ? (
                <i className="fas fa-spin fa-spinner bg-transparent text-white"></i>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}