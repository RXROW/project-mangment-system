import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AddNewProject, Headers } from '../../interfaces/projectsListInterfaces'
import { PROJECTS_URLS } from '../../services/apiUrls'
import { privateInstance } from '../../services/apiConfig'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function ProjectForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
  } = useForm<AddNewProject>({ mode: 'onChange' })
  const navigate = useNavigate()

  const { projectId } = useParams<{ projectId: string }>()
  const newProject: boolean = !projectId

  console.log(projectId)

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
      navigate('/dashboard/projects')
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
        console.log(response)
        setValue('title', response?.data?.title)
        setValue('description', response?.data?.description)
      }
      getProject()
    }
  }, [])

  return (
    <>
      <div className="bg-white px-5 py-4">
        <Link
          to={'/dashboard/projects'}
          className=""
          style={{ textDecoration: 'none' }}
        >
          <i className="fas fa-arrow-left text-black"></i>
          <button className="bg-transparent border-0 mb-3">
            View All Projects
          </button>
        </Link>
        {newProject ? (
          <h2>Add a new Project</h2>
        ) : (
          <h2>Edit Project Details</h2>
        )}
      </div>

      <form className="py-4 px-5 mx-5">
        <div className="row table bg-white rounded-3 p-3 shadow-sm">
          <div className="col-md-12 p-3">
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label h5">
                Title
              </label>
              <input
                type="text"
                className="form-control rounded-4 border-light border-3 py-3"
                id="projectName"
                placeholder="Enter Project Title"
                {...register('title', {
                  required: 'project title is required',
                })}
              />
            </div>
            {errors.title && (
              <span className="text-danger ">{errors.title.message}</span>
            )}
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label h5">
                Description
              </label>
              <input
                type="text"
                className="form-control rounded-4 border-light border-3 py-3"
                id="projectDescription"
                placeholder="Enter Description"
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
          <div className="p-3 d-flex justify-content-between">
            <Link
              to={'/dashboard/projects'}
              className="rounded-pill px-4 py-3 text-decoration-none text-black border border-3"
            >
             Cancel
            </Link>
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-custom-warning rounded-pill px-4 py-3 border-0 text-white"
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
