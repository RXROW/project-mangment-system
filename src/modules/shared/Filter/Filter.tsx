import { useSearchParams } from 'react-router-dom'
import styles from './Filter.module.css'

type FiltrationProps = {
  pageName: string
}

const Filtration = ({ pageName }: FiltrationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
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
  return (
    <div
      className={`row mx-0 gap-lg-0   py-3 px-2 mt-3 align-items-center 
         ${styles['filtration-container']}`}
    >
      <div
        className={`${
          pageName === 'projects'
            ? 'col-12 col-md-8 col-lg-5'
            : pageName === 'users'
            ? ' col-md-3'
            : ''
        }`}
      >
        <div
          className={` ${
            pageName !== 'projects' ? 'col' : 'col-md-3'
          }  input-group pb-2  rounded-2 `}
        >
          <span
            className={`input-group-text border-end-0 bg-white ps-4 ${styles['icon']}`}
            id="input-group-left-example"
          >
            <i className="fa fa-search " aria-hidden="true"></i>
          </span>
          <input
            type="text"
            placeholder="Search By Title "
            className={`form-control border-start-0 " ${styles['input']}`}
            onChange={getNameValue}
            value={searchParams.get('name') || ''}
          />
        </div>
      </div>
      {pageName === 'users' && (
        <>
          <div className="col-md-3">
            <div className=" input-group pb-2">
              <span
                className={`input-group-text border-end-0 bg-white ${styles['icon']}`}
                id="input-group-left-example"
              >
                <i className="fa fa-envelope " aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Email address"
                className={`form-control border-start-0 border border-1  ${styles['input']}`}
                onChange={getEmailValue}
                value={searchParams.get('email') || ''}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group pb-2 ">
              <span
                className={`input-group-text border-end-0 bg-white ${styles['icon']}`}
                id="input-group-left-example"
              >
                <i className="fa fa-globe " aria-hidden="true"></i>
              </span>
              <input
                type="text"
                placeholder="Country"
                className={`form-control border-start-0 ${styles['input']}`}
                onChange={getCountryValue}
                value={searchParams.get('country') || ''}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="input-group  pb-2">
              <span
                className={`input-group-text border-end-0 bg-white ${styles['icon']}`}
                id="input-group-left-example"
              >
                <i className="fa fa-user " aria-hidden="true"></i>
              </span>
              <select
                className={`form-control border-start-0 ${styles['input']}`}
                onChange={getGroupsValue}
                value={searchParams.get('groups') || ''}
              >
                <option value="">User Type</option>
                <option value={1}>Admin user</option>
                <option value={2}>System user</option>
              </select>
            </div>
          </div>
        </>
      )}
      {pageName === 'tasks' && (
        <div className="col-sm-5">
          <div className="input-group  pb-3 ">
            <div className="filter position-relative">
              <select
                className="form-select  rounded-pill ps-5"
                aria-label="Default select example"
                onChange={getStatusValue}
              >
                <option selected value={'ToDo'} key={0}>
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
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filtration
