import { useSearchParams } from 'react-router-dom'
import styles from './Filter.module.css'
import useThemeContext from '../../../hooks/useThemeContext'

type FiltrationProps = {
  pageName: string
  onFilter?: (filterParams: { [key: string]: string }) => void
  initialValues?: { [key: string]: string }
}

const Filtration = ({ pageName, onFilter, initialValues = {} }: FiltrationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { theme } = useThemeContext()
  const isDarkMode = theme === 'dark'

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
    onFilter?.({ [key]: value })
  }

  const containerClass = `row mx-0 gap-lg-0 py-3 px-2 mt-3 align-items-center 
    ${styles['filtration-container']} ${isDarkMode ? styles['dark-container'] : ''}`

  const inputGroupClass = `input-group-text   border-end-0 ${isDarkMode ? 'bg-dark text-light' : 'bg-white'} ${styles['icon']}`

  const inputClass = `form-control   border-start-0 ${styles['input']} ${isDarkMode ? styles['dark-input'] : ''}`

  return (
    <div className={containerClass}>
      {/* Name/Title Search */}
      <div className={`${pageName === 'projects' ? 'col-12 col-md-8 col-lg-5' : 'col-md-3'}`}>
        <div className="input-group bg-transparent pb-2 rounded-2">
          <span className={`${inputGroupClass} ps-4`}><i className="fa fa-search" /></span>
          <input
            type="text"
            placeholder={pageName === 'projects' ? 'Search By Title' : 'Search By Name'}
            className={inputClass}
            onChange={(e) =>
              handleFilterChange(pageName === 'projects' ? 'title' : 'name', e.target.value)
            }
            value={
              searchParams.get(pageName === 'projects' ? 'title' : 'name') ||
              initialValues[pageName === 'projects' ? 'title' : 'name'] ||
              ''
            }
          />
        </div>
      </div>

      {/* Users Filters */}
      {pageName === 'users' && (
        <>
          {/* Email */}
          <div className="col-md-3">
            <div className="input-group bg-transparent pb-2">
              <span className={inputGroupClass}><i className="fa fa-envelope" /></span>
              <input
                type="text"
                placeholder="Email address"
                className={inputClass}
                onChange={(e) => handleFilterChange('email', e.target.value)}
                value={searchParams.get('email') || initialValues.email || ''}
              />
            </div>
          </div>

          {/* Country */}
          <div className="col-md-3">
            <div className="input-group bg-transparent pb-2">
              <span className={inputGroupClass}><i className="fa fa-globe" /></span>
              <input
                type="text"
                placeholder="Country"
                className={inputClass}
                onChange={(e) => handleFilterChange('country', e.target.value)}
                value={searchParams.get('country') || initialValues.country || ''}
              />
            </div>
          </div>

          {/* Groups */}
          <div className="col-md-3">
            <div className="input-group bg-transparent pb-2">
              <span className={inputGroupClass}><i className="fa fa-user" /></span>
              <select
                className={inputClass}
                onChange={(e) => handleFilterChange('groups', e.target.value)}
                value={searchParams.get('groups') || initialValues.groups || ''}
              >
                <option value="">User Type</option>
                <option value="1">Admin user</option>
                <option value="2">System user</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Tasks Filters */}
      {pageName === 'tasks' && (
        <div className="col-sm-5">
          <div className="input-group bg-transparent pb-3">
            <div className="filter position-relative w-100">
              <select
                className={`form-select rounded-pill ps-5 ${isDarkMode ? styles['dark-select'] : ''}`}
                aria-label="Task status filter"
                onChange={(e) => handleFilterChange('status', e.target.value)}
                value={searchParams.get('status') || initialValues.status || ''}
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
