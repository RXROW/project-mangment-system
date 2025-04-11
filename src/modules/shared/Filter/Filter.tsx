import { useSearchParams } from 'react-router-dom'
import styles from './Filter.module.css'

type FiltrationProps = {
  pageName: string
  onFilter?: (filterParams: { [key: string]: string }) => void
  initialValues?: {
    [key: string]: string
  }
}

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
        className={`${
          pageName === 'projects'
            ? 'col-12 col-md-8 col-lg-5'
            : pageName === 'users'
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
            className={`input-group-text border-end-0 bg-white ps-4 ${styles['icon']}`}
            id="input-group-left-example"
          >
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
          <input
            type="text"
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
            <div className="input-group pb-2">
              <span
                className={`input-group-text border-end-0 bg-white ${styles['icon']}`}
                id="input-group-left-example"
              >
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Email address"
                className={`form-control border-start-0 border border-1 ${styles['input']}`}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                value={initialValues?.email || ''}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group pb-2">
              <span
                className={`input-group-text border-end-0 bg-white ${styles['icon']}`}
                id="input-group-left-example"
              >
                <i className="fa fa-globe" aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Country"
                className={`form-control border-start-0 ${styles['input']}`}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                value={initialValues?.country || ''}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group pb-2">
              <span
                className={`input-group-text border-end-0 bg-white ${styles['icon']}`}
                id="input-group-left-example"
              >
                <i className="fa fa-user" aria-hidden="true"></i>
              </span>
              <select
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
