import { useAuthContext } from '../../../../context/AuthContext'

interface TheadTableProps {
  colone: string
  coltwo: string
  colthree: string
  colfour?: string
  dateCreated: string
  action: string
  nametable?: string
}
function TheadTable({
  colone,
  coltwo,
  colthree,
  colfour,
  dateCreated,
  action,
  nametable,
}: TheadTableProps) {
  const { loginData } = useAuthContext()
  return (
    <thead className="table-secondary overflow-visible">
      <tr>
        <th scope="col" className="py-3">
          {colone} <i className="fa-solid fa-sort"></i>
        </th>
        <th scope="col" className="py-3">
          {coltwo} <i className="fa-solid fa-sort"></i>
        </th>
        <th scope="col" className="py-3">
          {colthree} <i className="fa-solid fa-sort"></i>
        </th>
        {nametable === 'task' || nametable === 'project' ? (
          <th scope="col" className="py-3">
            {colfour} <i className="fa-solid fa-sort"></i>
          </th>
        ) : null}
        <th scope="col" className="py-3">
          {dateCreated} <i className="fa-solid fa-sort"></i>
        </th>
        {loginData?.userGroup == 'Manger'?  (
          <th scope="col" className="py-3">
            {action} <i className="fa-solid fa-sort"></i>
          </th>
        ): null}
      </tr>
    </thead>
  )
}
export default TheadTable
