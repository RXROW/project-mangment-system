import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { privateInstance } from '../../../services/apiConfig'
import { USERS_URLS } from '../../../services/apiUrls'
import NoData from '../../shared/NoData/NoData'
import ViewDetailsModal from '../../shared/Modals/ViewDetailsModal'
import Filtration from '../../shared/Filter/Filter'
import { Button, Card, Badge, Table } from 'react-bootstrap'
import { formatDate } from '../../shared/helperFunctions/formatDate'
import {
  AxiosErrorResponse,
  User,
  UserRequestParams,
  UsersListResponse,
} from '../../../interfaces/userListInterfaces'
import { useAuthContext } from '../../../context/AuthContext'
import Newpagination from '../../shared/Newpagination/Newpagination'
import TheadTable from '../../shared/TheadTable/TheadTable/TheadTable'
import HeaderTable from '../../shared/HeaderTable/HeaderTable'
import ActionMenu from '../../shared/ActionTable/ActionMenu'
import SpinnerTable from '../../shared/Spinner/SpinnerTable'

const SortIcon: React.FC = () => (
  <span className="ms-1  fw-light ">
    <i className="fa fa-sort text-white" aria-hidden="true"></i>
  </span>
)

const UsersList: React.FC = () => {
  // State management
  const navigate = useNavigate()
  const [usersList, setUsersList] = useState<User[]>([])
  const { setUserfortask } = useAuthContext()
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null)
  const [pagination, setpagination] = useState({
    currentPage: 1,
    totalNumberOfRecords: 0,
    totalNumberOfPages: 0,
  })
  const [loading, setLoading] = useState(false)
  const [filterLoading, setFilterLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<{
    id: number | null
    data: User | null
    loading: boolean
    viewModalOpen: boolean
  }>({
    id: null,
    data: null,
    loading: false,
    viewModalOpen: false,
  })
  const [activeMenu, setActiveMenu] = useState<number | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  // API request to get all users
  const getAllUsers = useCallback(
    async (params: UserRequestParams = {}) => {
      setLoading(true)
      try {
        const response = await privateInstance.get<UsersListResponse>(
          USERS_URLS.GET_ALL_USERS,
          {
            params: {
              pageSize: 20,
              pageNumber: pagination.currentPage,
              userName: params.userName || null,
              email: params.email || null,
              country: params.country || null,
              groups: params.groups || null,
            },
          }
        )

        setpagination({
          currentPage: response?.data?.pageNumber,
          totalNumberOfRecords: response?.data?.totalNumberOfRecords,
          totalNumberOfPages: response?.data?.totalNumberOfPages,
        })
        setUsersList(response.data.data)
        setUserfortask(response.data.data)
      } catch (error) {
        const axiosError = error as AxiosError<AxiosErrorResponse>
        toast.error(
          axiosError.response?.data?.message || 'Failed to load users'
        )
      } finally {
        setLoading(false)
      }
    },
    [pagination.currentPage, setUserfortask]
  )
  console.log(usersList)
  // API request to filter users
  const getFilteredUsers = useCallback(async () => {
    setFilterLoading(true)
    try {
      const response = await privateInstance.get<UsersListResponse>(
        USERS_URLS.FILTER_USERS,
        {
          params: {
            pageSize: 20,
            pageNumber: pagination.currentPage,
            userName: searchParams.get('name') || null,
            email: searchParams.get('email') || null,
            country: searchParams.get('country') || null,
            groups: searchParams.get('groups') || null,
          },
        }
      )
      setFilteredUsers(response.data.data)
      setpagination({
        currentPage: response?.data?.pageNumber,
        totalNumberOfRecords: response?.data?.totalNumberOfRecords,
        totalNumberOfPages: response?.data?.totalNumberOfPages,
      })
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>
      toast.error(
        axiosError.response?.data?.message || 'Failed to filter users'
      )
    } finally {
      setFilterLoading(false)
    }
  }, [pagination.currentPage, searchParams])

  // API request to toggle user activation status
  const toggleActivation = async (id: number) => {
    try {
      const response = await privateInstance.put(USERS_URLS.TOGGLE_USER(id), {})
      getAllUsers()
      toast.success(
        `User has been ${
          response.data.isActivated ? 'activated' : 'deactivated'
        } successfully.`
      )
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>
      toast.error(
        axiosError.response?.data?.message || 'Failed to update user status'
      )
    }
  }

  // API request to get user details
  const viewUser = useCallback(async () => {
    if (selectedUser.id) {
      setSelectedUser((prev) => ({ ...prev, loading: true }))
      try {
        const response = await privateInstance.get<User>(
          USERS_URLS.GET_USER_BY_ID(selectedUser.id)
        )
        setSelectedUser((prev) => ({
          ...prev,
          data: response.data,
          loading: false,
        }))
      } catch (error) {
        const axiosError = error as AxiosError<AxiosErrorResponse>
        toast.error(
          axiosError.response?.data?.message || 'Failed to fetch user details'
        )
        setSelectedUser((prev) => ({ ...prev, loading: false }))
      }
    }
  }, [selectedUser.id])

  // Effects
  useEffect(() => {
    if (searchParams.toString()) {
      getFilteredUsers()
    } else {
      getAllUsers()
    }
  }, [searchParams, getAllUsers, getFilteredUsers])

  useEffect(() => {
    if (selectedUser.id && selectedUser.viewModalOpen) {
      viewUser()
    }
  }, [selectedUser.id, selectedUser.viewModalOpen, viewUser])

  // Handlers
  const handleOpenDetails = (id: number) => {
    setSelectedUser({
      id,
      data: null,
      loading: false,
      viewModalOpen: true,
    })
  }

  const handleCloseDetails = () => {
    setSelectedUser((prev) => ({ ...prev, viewModalOpen: false }))
  }

  const handleMenuToggle = (id: number | null) => {
    setActiveMenu((prev) => (prev === id ? null : id))
  }

  const handleAddUser = () => {
    navigate('/register')
    toast.info('Add user functionality would be implemented here')
  }

  const usersListToDisplay = useMemo(
    () => (searchParams.toString() ? filteredUsers : usersList),
    [searchParams, filteredUsers, usersList]
  )

  const isLoading = loading || filterLoading

  return (
    <>
      <HeaderTable
        header="Users"
        namebtn="Add New Users "
        handleAdd={handleAddUser}
      />
      <div className=" mx-2 my-3 bg-body rounded">
        <Filtration pageName="users" />
        <div className="user-table">
          <table className="table table-striped table-hover text-center align-middle">
            <TheadTable
              colone="User Name"
              coltwo="Status"
              colthree="Phone Number"
              colfour="Email"
              dateCreated="Date Created"
              action="Action"
              nametable="project"
            />
            <tbody>
              {usersListToDisplay && usersListToDisplay.length > 0 ? (
                usersListToDisplay.map((user) => (
                  <tr key={user.id} className="border-bottom">
                    <td className="py-3 fw-medium">{user.userName}</td>
                    <td className="py-3">
                      <Badge
                        bg={user.isActivated ? 'success' : 'danger'}
                        className="px-3 py-2 rounded-pill"
                      >
                        {user.isActivated ? 'Active' : 'Non-Active'}
                      </Badge>
                    </td>
                    <td className="py-3">{user.phoneNumber}</td>
                    <td
                      className="py-3 text-truncate"
                      style={{ maxWidth: '200px' }}
                    >
                      {user.email}
                    </td>
                    <td className="py-3">{formatDate(user.creationDate)}</td>
                    <ActionMenu
                      onView={() => handleOpenDetails(user.id)}
                      onEdit={() => toggleActivation(user?.id)}
                      name="user"
                      user={user}
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
        <Newpagination
          setpagination={setpagination}
          currentPage={pagination.currentPage}
          totalNumberOfPages={pagination.totalNumberOfPages}
          totalNumberOfRecords={pagination.totalNumberOfRecords}
        />
      </div>
      {selectedUser.viewModalOpen && (
        <ViewDetailsModal
          show={selectedUser.viewModalOpen}
          handleClose={handleCloseDetails}
          loading={selectedUser.loading}
          details={selectedUser.data}
        />
      )}
    </>
  )
}

export default UsersList
