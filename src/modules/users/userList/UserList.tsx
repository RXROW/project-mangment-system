import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useSearchParams } from "react-router-dom";
import { privateInstance } from "../../../services/apiConfig";
import { USERS_URLS } from "../../../services/apiUrls";
import Pagination from "../../shared/Pagination/Pagination";
import NoData from "../../shared/NoData/NoData";
import ViewDetailsModal from "../../shared/Modals/ViewDetailsModal";

import Filtration from "../../shared/Filter/Filter";
import { Dropdown, Button, Card, Spinner, Badge, Table } from "react-bootstrap";
import { formatDate } from "../../shared/helperFunctions/formatDate";
import {
  AxiosErrorResponse,
  User,
  UserRequestParams,
  UsersListResponse,
} from "../../../interfaces/userListInterfaces";

const SortIcon: React.FC = () => (
  <span className="ms-1  fw-light ">
    <i className="fa fa-sort text-white  " aria-hidden="true"></i>
  </span>
);

const UsersList: React.FC = () => {
  // State management
  const [usersList, setUsersList] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [pagination, setPagination] = useState({
    pages: [] as number[],
    totalRecords: 0,
  });
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number | null;
    data: User | null;
    loading: boolean;
    viewModalOpen: boolean;
  }>({
    id: null,
    data: null,
    loading: false,
    viewModalOpen: false,
  });
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNum = searchParams.get("pageNum") || "1";

  // API request to get all users
  const getAllUsers = useCallback(
    async (params: UserRequestParams = {}) => {
      setLoading(true);
      try {
        const response = await privateInstance.get<UsersListResponse>(
          USERS_URLS.GET_ALL_USERS,
          {
            params: {
              pageSize: 20,
              pageNumber: params.pageNumber || pageNum,
              userName: params.userName || null,
              email: params.email || null,
              country: params.country || null,
              groups: params.groups || null,
            },
          }
        );

        setPagination({
          pages: [...Array(response.data.totalNumberOfPages)].map(
            (_, i) => i + 1
          ),
          totalRecords: response.data.totalNumberOfRecords,
        });
        setUsersList(response.data.data);
      } catch (error) {
        const axiosError = error as AxiosError<AxiosErrorResponse>;
        toast.error(
          axiosError.response?.data?.message || "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    },
    [pageNum]
  );

  // API request to filter users
  const getFilteredUsers = useCallback(async () => {
    setFilterLoading(true);
    try {
      const response = await privateInstance.get<UsersListResponse>(
        USERS_URLS.FILTER_USERS,
        {
          params: {
            pageSize: 20,
            pageNumber: pageNum,
            userName: searchParams.get("name") || null,
            email: searchParams.get("email") || null,
            country: searchParams.get("country") || null,
            groups: searchParams.get("groups") || null,
          },
        }
      );
      setFilteredUsers(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data?.message || "Failed to filter users"
      );
    } finally {
      setFilterLoading(false);
    }
  }, [pageNum, searchParams]);

  // API request to toggle user activation status
  const toggleActivation = async (id: number) => {
    try {
      const response = await privateInstance.put(
        USERS_URLS.TOGGLE_USER(id),
        {}
      );
      getAllUsers();
      toast.success(
        `User has been ${
          response.data.isActivated ? "activated" : "deactivated"
        } successfully.`
      );
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data?.message || "Failed to update user status"
      );
    }
  };

  // API request to get user details
  const viewUser = useCallback(async () => {
    if (selectedUser.id) {
      setSelectedUser((prev) => ({ ...prev, loading: true }));
      try {
        const response = await privateInstance.get<User>(
          USERS_URLS.GET_USER_BY_ID(selectedUser.id)
        );
        setSelectedUser((prev) => ({
          ...prev,
          data: response.data,
          loading: false,
        }));
      } catch (error) {
        const axiosError = error as AxiosError<AxiosErrorResponse>;
        toast.error(
          axiosError.response?.data?.message || "Failed to fetch user details"
        );
        setSelectedUser((prev) => ({ ...prev, loading: false }));
      }
    }
  }, [selectedUser.id]);

  // Effects
  useEffect(() => {
    if (searchParams.toString()) {
      getFilteredUsers();
    } else {
      getAllUsers();
    }
  }, [searchParams, getAllUsers, getFilteredUsers]);

  useEffect(() => {
    if (selectedUser.id && selectedUser.viewModalOpen) {
      viewUser();
    }
  }, [selectedUser.id, selectedUser.viewModalOpen, viewUser]);

  // Handlers
  const handleOpenDetails = (id: number) => {
    setSelectedUser({
      id,
      data: null,
      loading: false,
      viewModalOpen: true,
    });
  };

  const handleCloseDetails = () => {
    setSelectedUser((prev) => ({ ...prev, viewModalOpen: false }));
  };

  const handleMenuToggle = (id: number | null) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const handleAddUser = () => {
    // Navigate to add user form or open modal
    toast.info("Add user functionality would be implemented here");
  };

  const usersListToDisplay = useMemo(
    () => (searchParams.toString() ? filteredUsers : usersList),
    [searchParams, filteredUsers, usersList]
  );

  const isLoading = loading || filterLoading;

  return (
    <Card className="  border-0 mb-4">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold m-0">USERS</h4>
          <Button
            variant="warning"
            className="rounded-circle"
            style={{ width: "48px", height: "48px" }}
          >
            <i className="fa fa-plus"></i>
          </Button>
        </div>

        <Filtration pageName="users" />

        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <div className="table-responsive mt-3">
            {usersListToDisplay && usersListToDisplay.length > 0 ? (
              <>
                <Table hover className="align-middle">
                  <thead>
                    <tr>
                      <th
                        className="py-3 text-white   "
                        style={{ backgroundColor: "#315951E5" }}
                      >
                        User Name <SortIcon />
                      </th>
                      <th
                        className="py-3  text-white  border border-white "
                        style={{ backgroundColor: "#315951E5" }}
                      >
                        Status <SortIcon />
                      </th>
                      <th
                        className="py-3  text-white  "
                        style={{ backgroundColor: "#315951E5" }}
                      >
                        Phone Number <SortIcon />
                      </th>
                      <th
                        className="py-3  text-white   "
                        style={{ backgroundColor: "#315951E5" }}
                      >
                        Email <SortIcon />
                      </th>
                      <th
                        className="py-3 text-white  border border-white "
                        style={{ backgroundColor: "#315951E5" }}
                      >
                        Date Created <SortIcon />
                      </th>
                      <th
                        className="py-3  text-end text-white border border-white "
                        style={{ backgroundColor: "#315951E5" }}
                      >
                        Actions <SortIcon />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersListToDisplay.map((user) => (
                      <tr key={user.id} className="border-bottom">
                        <td className="py-3 fw-medium">{user.userName}</td>
                        <td className="py-3">
                          <Badge
                            bg={user.isActivated ? "success" : "danger"}
                            className="px-3 py-2 rounded-pill"
                          >
                            {user.isActivated ? "Active" : "Non-Active"}
                          </Badge>
                        </td>
                        <td className="py-3">{user.phoneNumber}</td>
                        <td
                          className="py-3 text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {user.email}
                        </td>
                        <td className="py-3">
                          {formatDate(user.creationDate)}
                        </td>
                        <td className="py-3 text-end position-relative">
                          <Button
                            variant="light"
                            className="border-0 rounded-circle me-2"
                            onClick={() => handleMenuToggle(user.id)}
                          >
                            <i className="fa fa-ellipsis-h"></i>
                          </Button>

                          {activeMenu === user.id && (
                            <div
                              className="position-absolute end-0 bg-white shadow-sm border rounded p-2"
                              style={{ zIndex: 100, top: "70%" }}
                            >
                              <Button
                                variant="link"
                                className="d-flex align-items-center text-decoration-none text-success mb-2"
                                onClick={() => {
                                  toggleActivation(user.id);
                                  handleMenuToggle(null);
                                }}
                              >
                                <i
                                  className={`fa fa-toggle-${
                                    user.isActivated ? "off" : "on"
                                  } me-2`}
                                ></i>
                                <span>
                                  {user.isActivated ? "Deactivate" : "Activate"}
                                </span>
                              </Button>
                              <Button
                                variant="link"
                                className="d-flex align-items-center text-decoration-none text-primary"
                                onClick={() => {
                                  handleOpenDetails(user.id);
                                  handleMenuToggle(null);
                                }}
                              >
                                <i className="fa fa-eye me-2"></i>
                                <span>View</span>
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  pageNumber={Number(pageNum)}
                  numOfRecords={pagination.totalRecords}
                  totalNumberOfPages={pagination.pages}
                  paginatedListFunction={getAllUsers}
                  from="users"
                />
              </>
            ) : (
              <NoData />
            )}
          </div>
        )}
      </Card.Body>

      {selectedUser.viewModalOpen && (
        <ViewDetailsModal
          show={selectedUser.viewModalOpen}
          handleClose={handleCloseDetails}
          loading={selectedUser.loading}
          details={selectedUser.data}
        />
      )}
    </Card>
  );
};

export default UsersList;
