import { useSearchParams } from 'react-router-dom'
import styles from './Filter.module.css'
import useThemeContext from '../../../hooks/useThemeContext'

type FiltrationProps = {
  pageName: string
  onFilter?: (filterParams: { [key: string]: string }) => void
  initialValues?: {
    [key: string]: string
  }
} 
const Filtration = ({ pageName }: FiltrationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useThemeContext();

  const isDarkMode = theme === 'dark';

  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchParams({ ...Object.fromEntries(searchParams), name: value })
  }
  const getEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchParams({ ...Object.fromEntries(searchParams), email: value })
  }
  const getCountryValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchParams({ ...Object.fromEntries(searchParams), country: value })
  }
  const getGroupsValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSearchParams({ ...Object.fromEntries(searchParams), groups: value })
  }
  const getStatusValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSearchParams({ ...Object.fromEntries(searchParams), status: value })
  }

  // Define dark mode classes
  const containerClass = `row mx-0 gap-lg-0 py-3 px-2 mt-3 align-items-center 
    ${styles['filtration-container']} ${isDarkMode ? styles['dark-container'] : ''}`;

  const inputGroupClass = `input-group-text border-end-0 ${isDarkMode ? 'bg-dark text-light' : 'bg-white'} ${styles['icon']}`;

  const inputClass = `form-control border-start-0 ${styles['input']} ${isDarkMode ? styles['dark-input'] : ''}`;

  return (
    <div className={containerClass}>
 
const Filtration = ({ pageName, onFilter, initialValues }: FiltrationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)

    if (onFilter) {
      const filterParams: { [key: string]: string } = {}
      // Only include the changed parameter to avoid overwriting other filters
      filterParams[key] = value
      onFilter(filterParams)
    }
  }

  return (
    <div
      className={`row mx-0 gap-lg-0 py-3 px-2 mt-3 align-items-center 
         ${styles['filtration-container']}`}
    >
      {/* Search by Title/Name */}
 
      <div
        className={`${pageName === 'projects'
            ? 'col-12 col-md-8 col-lg-5'
            : pageName === 'users'
 
              ? ' col-md-3'
              : ''
          }`}
      >
        <div
          className={` ${pageName !== 'projects' ? 'col' : 'col-md-3'
            }  input-group pb-2  rounded-2  bg-transparent`}
 
            ? 'col-md-3'
            : ''
        }`}
      >
        <div
          className={`${
            pageName !== 'projects' ? 'col' : 'col-md-3'
          } input-group pb-2 rounded-2`}
 
        >
          <span
            className={`${inputGroupClass} ps-4`}
            id="input-group-left-example"
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
 
            placeholder="Search By Title "
            className={inputClass}
            onChange={getNameValue}
            value={searchParams.get('name') || ''}
 
            placeholder={
              pageName === 'projects' ? 'Search By Title' : 'Search By Name'
            }
            className={`form-control border-start-0 ${styles['input']}`}
            onChange={(e) =>
              handleFilterChange(
                pageName === 'projects' ? 'title' : 'name',
                e.target.value
              )
            }
            value={
              (pageName === 'projects'
                ? initialValues?.title
                : initialValues?.name) || ''
            }
 
          />
        </div>
      </div>
      {pageName === 'users' && (
        <>
          <div className="col-md-3">
 
            <div className=" input-group  bg-transparent  pb-2">
 
            <div className="input-group pb-2">
 
              <span
                className={inputGroupClass}
                id="input-group-left-example"
              >
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Email address"
 
                className={`${inputClass} border border-1`}
                onChange={getEmailValue}
                value={searchParams.get('email') || ''}
              />
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="input-group bg-transparent  pb-2 ">
 
                className={`form-control border-start-0 border border-1 ${styles['input']}`}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                value={initialValues?.email || ''}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group pb-2">
 
              <span
                className={inputGroupClass}
                id="input-group-left-example"
              >
                <i className="fa fa-globe" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Country"
 
                className={inputClass}
                onChange={getCountryValue}
                value={searchParams.get('country') || ''}
 
                className={`form-control border-start-0 ${styles['input']}`}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                value={initialValues?.country || ''}
 
              />
            </div>
          </div>
          <div className="col-md-3">
 
            <div className="input-group bg-transparent  pb-2">
 
            <div className="input-group pb-2">
 
              <span
                className={inputGroupClass}
                id="input-group-left-example"
              >
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              <select
 
                className={inputClass}
                onChange={getGroupsValue}
                value={searchParams.get('groups') || ''}
 
                className={`form-control border-start-0 ${styles['input']}`}
                onChange={(e) => handleFilterChange('groups', e.target.value)}
                value={initialValues?.groups || ''}
 
              >
                <option value="">User Type</option>
                <option value="1">Admin user</option>
                <option value="2">System user</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Tasks-specific filters */}
      {pageName === 'tasks' && (
        <div className="col-sm-5">
          <div className="input-group pb-3">
            <div className="filter position-relative">
              <select
 
                className={`form-select rounded-pill ps-5 ${isDarkMode ? styles['dark-select'] : ''}`}
                aria-label="Default select example"
                onChange={getStatusValue}
                value={searchParams.get('status') || 'ToDo'}
              >
                <option value={'ToDo'} key={0}>
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
 
                className="form-select rounded-pill ps-5"
                aria-label="Task status filter"
                onChange={(e) => handleFilterChange('status', e.target.value)}
                value={initialValues?.status || ''}
              >
                <option value="">Filter</option>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
 
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filtration