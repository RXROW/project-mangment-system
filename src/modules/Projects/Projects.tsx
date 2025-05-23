import { useCallback, useContext, useEffect, useState } from 'react'
import  Filtration  from '../shared/Filter/Filter'
import { privateInstance } from '../../services/apiConfig'
import { PROJECTS_URLS, TASKS_URLS } from '../../services/apiUrls'
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
  const { theme } = useThemeContext()
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
  const titleFilter = searchParams.get('title') || ''
  const statusFilter = searchParams.get('status') || ''

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
  const handleCloseDetails = () =>
    setSelectedProject((prev) => ({ ...prev, viewModalOpen: false }))

  const handleEditProject = (id: number) => navigate(`${id}`)
  const handleShowDelete = (id: number) => {
    setSelectedId(id)
    setShowDelete(true)
  }

  const getAllProjects = useCallback(
    async (params: { title?: string; status?: string } = {}) => {
      setLoading(true)
      try {
        const response = await privateInstance.get(
          loginData?.userGroup === 'Manager'
            ? PROJECTS_URLS.LIST_MANAGER
            : PROJECTS_URLS.LIST_EMPLOYEE,
          {
            params: {
              pageSize: 10,
              pageNumber: pagination.currentPage,
              title: params.title || titleFilter,
              isActivated:
                params.status
                  ? params.status === 'active'
                  : statusFilter
                    ? statusFilter === 'active'
                    : null,
            },
          }
        )

        setProjectsList(response?.data?.data || [])
        setprojectfortask(response?.data?.data || [])
        setpagination({
          currentPage: response?.data?.pageNumber,
          totalNumberOfRecords: response?.data?.totalNumberOfRecords,
          totalNumberOfPages: response?.data?.totalNumberOfPages,
        })
      } catch (error) {
        toast.error('Failed to load projects')
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [loginData?.userGroup, pagination.currentPage, titleFilter, statusFilter, setprojectfortask]
  )

  const handleFilter = useCallback(
    async (filterParams: { title?: string; status?: string }) => {
      setFilterLoading(true)
      try {
        const newSearchParams = new URLSearchParams()
        if (filterParams.title) newSearchParams.set('title', filterParams.title)
        if (filterParams.status) newSearchParams.set('status', filterParams.status)
        setSearchParams(newSearchParams)

        setpagination((prev) => ({ ...prev, currentPage: 1 }))
        await getAllProjects(filterParams)
      } catch (error) {
        toast.error('Failed to filter projects')
        console.error(error)
      } finally {
        setFilterLoading(false)
      }
    },
    [getAllProjects, setSearchParams]
  )

  const getTaskNumber = async () => {
    setLoading(true)
    try {
      const response = await privateInstance.get(TASKS_URLS.COUNT_TASKS)
      setTasks(response?.data?.toDo)
    } catch (error) {
      console.error(error)
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
      console.error(error)
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
    if (titleFilter || statusFilter) {
      handleFilter({ title: titleFilter, status: statusFilter })
    } else {
      getAllProjects()
    }
  }, [titleFilter, statusFilter, getAllProjects, handleFilter])

  useEffect(() => {
    getTaskNumber()
  }, [])

  const isLoading = loading || filterLoading
  const handleAddProject = () => navigate('/dashboard/projects/new-project')

  return (
    <div className={`p-2 rounded ${theme === 'dark' ? 'bg-dark text-white' : 'bg-body text-dark'}`}>
      <HeaderTable header="Projects" handleAdd={handleAddProject} namebtn="Add New Project" />
      <div className="mx-2 my-3 rounded">
        <div className={`table rounded-3 shadow-sm ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
          <Filtration
            pageName="projects"
            onFilter={handleFilter}
            initialValues={{ title: titleFilter, status: statusFilter }}
          />

          <table className={`table table-striped table-hover text-center align-middle ${theme === 'dark' ? 'table-dark' : ''}`}>
            <TheadTable
              colone="Title"
              coltwo="Status"
              colthree="Num Task"
              colfour="Project"
              dateCreated="Date Created"
              action={loginData?.userGroup === 'Manager' ? 'Action' : ''}
            />
            <tbody>
              {projectsList.length > 0 ? (
                projectsList.map((project) => (
                  <tr key={project.id}>
                    <td>{project.title}</td>
                    <td>
                      <div className={`badge ${project.isActivated ? 'bg-danger' : 'bg-custom-green'}`}>
                        {project.isActivated ? 'Non-Active' : 'Active'}
                      </div>
                    </td>
                    <td>{project.task?.length}</td>
                    <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                    {loginData?.userGroup === 'Manager' ? (
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
                        onEdit={() => handleEditProject(project.id)}
                        onDelete={() => handleShowDelete(project.id)}
                      />
                    ): (null)}
                 
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
