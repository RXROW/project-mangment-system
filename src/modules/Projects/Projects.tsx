import { useCallback, useContext, useEffect, useState } from 'react'
import Filtration from '../shared/Filter/Filter'
import { privateInstance } from '../../services/apiConfig'
import { PROJECTS_URLS, TASKS_URLS } from '../../services/apiUrls'
import Dropdown from 'react-bootstrap/Dropdown'
import Pagination from '../shared/Pagination/Pagination'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ProjectsType } from '../../interfaces/projectsListInterfaces'
import { AuthContext } from '../../context/AuthContext'
import { Spinner } from 'react-bootstrap'
import NoData from '../shared/NoData/NoData'
import DeleteConfirmation from '../shared/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import ViewDetailsModal from '../shared/Modals/ViewDetailsModal'

const SortIcon: React.FC = () => (
  <span className="ms-1  fw-light ">
    <i className="fa fa-sort text-white  " aria-hidden="true"></i>
  </span>
)

export default function Projects() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)
  const { loginData } = authContext || {}

  const [selectedId, setSelectedId] = useState<number>(0)
  const [showDelete, setShowDelete] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    pages: [] as number[],
    totalRecords: 0,
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

  const pageNum = searchParams.get('pageNum') || '1'
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
              pageSize: 20,
              pageNumber: params.pageNumber || pageNum,
              title: params.title || titleFilter,
              isActivated: statusFilter ? statusFilter === 'active' : null,
            },
          }
        )
        setProjectsList(response?.data?.data)
        setPagination({
          pages: [...Array(response?.data?.totalNumberOfPages)].map(
            (_, i) => i + 1
          ),
          totalRecords: response?.data?.totalNumberOfRecords,
        })
      } catch (error) {
        toast.error('Failed to load projects')
        console.log(error)
      } finally {
        setLoading(false)
      }
    },
    [loginData?.userGroup, pageNum, titleFilter, statusFilter]
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
            pageNumber: pageNum,
            title: titleFilter,
            isActivated: statusFilter ? statusFilter === 'active' : null,
          },
        }
      )
      setProjectsList(response?.data?.data)
      setPagination({
        pages: [...Array(response?.data?.totalNumberOfPages)].map(
          (_, i) => i + 1
        ),
        totalRecords: response?.data?.totalNumberOfRecords,
      })
    } catch (error) {
      toast.error('Failed to filter projects')
      console.log(error)
    } finally {
      setFilterLoading(false)
    }
  }, [loginData?.userGroup, pageNum, titleFilter, statusFilter])

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

  return (
    <>
      <div className="bg-white d-flex justify-content-between px-5 py-4">
        <h2>Projects</h2>

        <Link
          to={'/dashboard/projects/new-project'}
          className="rounded-pill px-4 bg-custom-warning d-flex justify-content-center align-items-center text-white"
          style={{ textDecoration: 'none' }}
        >
          <i className="fas fa-plus"></i>
          <button className="bg-transparent border-0 text-white">
            Add New Project
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <div className="py-4 px-5 bg-light">
          <div className="table bg-white rounded-3 shadow-sm">
            <Filtration
              pageName="projects"
              onFilter={() => getFilteredProjects()}
            />
            {projectsList.length > 0 ? (
              <>
                <table className="table table-striped text-center mb-0">
                  <thead>
                    <tr style={{ fontWeight: 'lighter' }}>
                      <th
                        className="text-white py-3"
                        style={{
                          backgroundColor: '#315951E5',
                          borderRight: 'solid white 2px',
                        }}
                        scope="col"
                      >
                        Title <SortIcon />
                      </th>
                      <th
                        className="text-white py-3"
                        style={{
                          backgroundColor: '#315951E5',
                          borderRight: 'solid white 2px',
                        }}
                        scope="col"
                      >
                        Status <SortIcon />
                      </th>
                      <th
                        className="text-white py-3"
                        style={{
                          backgroundColor: '#315951E5',
                          borderRight: 'solid white 2px',
                        }}
                        scope="col"
                      >
                        Num Tasks <SortIcon />
                      </th>
                      <th
                        className="text-white py-3"
                        style={{
                          backgroundColor: '#315951E5',
                          borderRight: 'solid white 2px',
                        }}
                        scope="col"
                      >
                        Date Created <SortIcon />
                      </th>
                      <th
                        className="text-white py-3"
                        style={{ backgroundColor: '#315951E5' }}
                        scope="col"
                      ></th>
                    </tr>
                  </thead>

                  <tbody>
                    {projectsList?.map((project: ProjectsType) => (
                      <tr key={project?.id}>
                        <td>{project?.title}</td>
                        <td>
                          <div
                            bg={project?.isActivated ? 'danger' : 'success'}
                            className={`${
                              project?.isActivated
                                ? 'bg-danger'
                                : 'bg-custom-green'
                            } badge`}
                          >
                            {project?.isActivated ? 'Non-Active' : 'Active'}
                          </div>
                        </td>
                        <td>{project?.task?.length}</td>
                        <td>
                          {new Date(project?.creationDate).toLocaleDateString()}
                        </td>
                        <td className="position-relative">
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              className="border-0 rounded-circle"
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => {
                                  setSelectedProject({
                                    id: project.id,
                                    data: null,
                                    loading: true,
                                    viewModalOpen: true,
                                  })
                                  viewProject(project.id)
                                }}
                              >
                                <i className="fas fa-eye me-2"></i>
                                View
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleEditProject(project?.id)}
                              >
                                <i className="fas fa-pen-to-square me-2"></i>
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="text-danger"
                                onClick={() => handleShowDelete(project?.id)}
                              >
                                <i className="fas fa-trash-can me-2"></i>
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  pageNumber={Number(pageNum)}
                  numOfRecords={pagination.totalRecords}
                  totalNumberOfPages={pagination.pages}
                  paginatedListFunction={getAllProjects}
                  from="projects"
                />
              </>
            ) : (
              <NoData />
            )}
          </div>
        </div>
      )}

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
    </>
  )
}
