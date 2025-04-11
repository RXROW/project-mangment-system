import { useCallback, useContext, useEffect, useState } from 'react'
import Filtration from '../shared/Filter/Filter'
import { privateInstance } from '../../services/apiConfig'
import { PROJECTS_URLS, TASKS_URLS } from '../../services/apiUrls'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ProjectsType } from '../../interfaces/projectsListInterfaces'
import { AuthContext, useAuthContext } from '../../context/AuthContext'
import NoData from '../shared/NoData/NoData'
import DeleteConfirmation from '../shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import ViewDetailsModal from '../shared/Modals/ViewDetailsModal'
import HeaderTable from '../shared/HeaderTable/HeaderTable'
import Newpagination from '../shared/Newpagination/Newpagination'
import TheadTable from '../shared/TheadTable/TheadTable/TheadTable'
import ActionMenu from '../shared/ActionTable/ActionMenu'
import SpinnerTable from '../shared/Spinner/SpinnerTable'
import useThemeContext from '../../hooks/useThemeContext'

export default function Projects() {
  const navigate = useNavigate()
  const { theme } = useThemeContext();
  const { setprojectfortask } = useAuthContext()
  const authContext = useContext(AuthContext)
  const { loginData } = authContext || {}
  const [selectedId, setSelectedId] = useState<number>(0)
  const [showDelete, setShowDelete] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pagination, setpagination] = useState({
    currentPage: 1,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const [projectsList, setProjectsList] = useState<ProjectsType[]>([])
  const [tasks, setTasks] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<{
    id: number | null
    data: ProjectsType | null
    loading: boolean
    viewModalOpen: boolean
  }>({
    id: null,
    data: null,
    loading: false,
    viewModalOpen: false,
  })

  const handleClose = () => setShowDelete(false)
  const handleCloseDetails = () => {
    setSelectedProject((prev) => ({ ...prev, viewModalOpen: false }))
  }
  const titleFilter = searchParams.get('title') || ''
  const statusFilter = searchParams.get('status') || ''
  const handleEditProject = (id: number) => {
    navigate(`${id}`)
  }
  const handleShowDelete = (id: number) => {
    setSelectedId(id)
    setShowDelete(true)
  }

  const getAllProjects = useCallback(
    async (params: any = {}) => {
      setLoading(true)
      try {
        const response = await privateInstance.get(
          loginData?.userGroup === 'Manager'
            ? PROJECTS_URLS.LIST_MANAGER
            : PROJECTS_URLS.LIST_EMPLOYEE,
          {
            params: {
              pageSize: 1,
              pageNumber: pagination.currentPage,
              title: params.title || titleFilter,
              isActivated: statusFilter ? statusFilter === 'active' : null,
            },
          }
        )
        setProjectsList(response?.data?.data)
        setprojectfortask(response?.data?.data)
        setpagination({
          currentPage: response?.data?.pageNumber,
          totalNumberOfRecords: response?.data?.totalNumberOfRecords,
          totalNumberOfPages: response?.data?.totalNumberOfPages,
        })
      } catch (error) {
        toast.error('Failed to load projects')
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
    [loginData?.userGroup, pagination.currentPage, titleFilter, statusFilter]
  )

  const getFilteredProjects = useCallback(async () => {
    setFilterLoading(true)
    try {
      const response = await privateInstance.get(
        loginData?.userGroup === 'Manager'
          ? PROJECTS_URLS.LIST_MANAGER
          : PROJECTS_URLS.LIST_EMPLOYEE,
        {
          params: {
            pageSize: 20,
            pageNumber: pagination.currentPage,
            title: titleFilter,
            isActivated: statusFilter ? statusFilter === 'active' : null,
          },
        }
      )
      setProjectsList(response?.data?.data)
      setpagination({
        currentPage: response?.data?.pageNumber,
        totalNumberOfRecords: response?.data?.totalNumberOfRecords,
        totalNumberOfPages: response?.data?.totalNumberOfPages,
      })
    } catch (error) {
      toast.error('Failed to filter projects')
      console.log(error)
    } finally {
      setFilterLoading(false)
    }
  }, [loginData?.userGroup, pagination.currentPage, titleFilter, statusFilter])

  const getTaskNumber = async () => {
    setLoading(true)
    try {
      const response = await privateInstance.get(TASKS_URLS.COUNT_TASKS)
      setTasks(response?.data?.toDo)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async () => {
    try {
      setLoading(true)
      const response = await privateInstance.delete(
        PROJECTS_URLS.DELETE_PROJECT(selectedId)
      )
      if (response?.data.affected !== 0) {
        toast.success('Project deleted successfully')
        await getAllProjects()
      } else {
        toast.error('Project not found')
      }
    } catch (error) {
      toast.error('An unknown error occurred')
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  const viewProject = async (id: number) => {
    setSelectedProject((prev) => ({ ...prev, loading: true }))
    try {
      const response = await privateInstance.get<ProjectsType>(
        PROJECTS_URLS.GET_PROJECT(id)
      )
      setSelectedProject((prev) => ({
        ...prev,
        data: response.data,
        loading: false,
      }))
    } catch (error) {
      toast.error('Failed to fetch project details')
      setSelectedProject((prev) => ({ ...prev, loading: false }))
    }
  }

  useEffect(() => {
    if (searchParams.toString()) {
      getFilteredProjects()
    } else {
      getAllProjects()
    }
  }, [searchParams, getAllProjects, getFilteredProjects])

  useEffect(() => {
    getTaskNumber()
  }, [])

  const isLoading = loading || filterLoading
  const handleAddProject = () => {
    navigate('/dashboard/projects/new-project')
  }

  return (
    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-dark text-white' : 'bg-body text-dark'}`}>
      <HeaderTable
        header="Projects"
        handleAdd={handleAddProject}
        namebtn="Add New Project"
      />
      <div className="mx-2 my-3 rounded">
        <div className={`table rounded-3 shadow-sm ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
          <Filtration pageName="projects" />

          <table className={`table table-striped table-hover text-center align-middle ${theme === 'dark' ? 'table-dark' : ''}`}>
            <TheadTable
              colone="Title"
              coltwo="Status"
              colthree="Num Task"
              colfour="Project"
              dateCreated="Date Created"
              action="Action"
            />
            <tbody>
              {projectsList?.length > 0 ? (
                projectsList?.map((project: ProjectsType) => (
                  <tr key={project?.id}>
                    <td>{project?.title}</td>
                    <td>
                      <div
                        className={`badge ${project?.isActivated ? 'bg-danger' : 'bg-custom-green'}`}
                      >
                        {project?.isActivated ? 'Non-Active' : 'Active'}
                      </div>
                    </td>
                    <td>{project?.task?.length}</td>
                    <td>{new Date(project?.creationDate).toLocaleDateString()}</td>
                    <ActionMenu
                      onView={() => {
                        setSelectedProject({
                          id: project.id,
                          data: null,
                          loading: true,
                          viewModalOpen: true,
                        })
                        viewProject(project.id)
                      }}
                      onEdit={() => handleEditProject(project?.id)}
                      onDelete={() => handleShowDelete(project?.id)}
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
          <Newpagination
            setpagination={setpagination}
            currentPage={pagination.currentPage}
            totalNumberOfPages={pagination.totalNumberOfPages}
            totalNumberOfRecords={pagination.totalNumberOfRecords}
          />
        </div>
      </div>
      <DeleteConfirmation
        deleteFunction={deleteProject}
        toggleShow={showDelete}
        handleClose={handleClose}
      />
      {selectedProject.viewModalOpen && (
        <ViewDetailsModal
          show={selectedProject.viewModalOpen}
          handleClose={handleCloseDetails}
          loading={selectedProject.loading}
          details={selectedProject.data}
          type="project"
        />
      )}
    </div>
  )
}