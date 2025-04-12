import { ChangeEvent, useState } from 'react' 
import useThemeContext from '../../../hooks/useThemeContext'

interface NewpaginationProps {
  totalNumberOfPages: number
  totalNumberOfRecords: number
  currentPage: number
  setpagination: (value: any) => void
}

function Newpagination({
  totalNumberOfPages,
  totalNumberOfRecords,
  currentPage,
  setpagination,
}: NewpaginationProps) {
  const { theme } = useThemeContext()
  const [selectedOption, setSelectedOption] = useState(currentPage)

  const arrayoftotalNumberOfPages = Array.from(
    { length: totalNumberOfPages },
    (_, i) => i + 1
  )

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(e.target.value))
    setpagination((prev: { currentPage: number }) => ({
      ...prev,
      currentPage: Number(e.target.value),
    }))
  }

  const handleNextpages = () => {
    if (currentPage < totalNumberOfPages) {
      const nextPage = currentPage + 1
      setSelectedOption(nextPage)
      setpagination((prev: { currentPage: number }) => ({
        ...prev,
        currentPage: nextPage,
      }))
    }
  }

  const handlePrevpages = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1
      setSelectedOption(prevPage)
      setpagination((prev: { currentPage: number }) => ({
        ...prev,
        currentPage: prevPage,
      }))
    }
  }

  return (
    <div className={`d-flex justify-content-end   w-100 border-2 border-top ${theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-white'} p-3 rounded-bottom-4 shadow-sm`}>
      <div className="d-flex align-items-center   justify-content-end gap-4">
        <div className={`d-flex ${theme === 'dark' ? 'bg-transparent border-secondary text-white'  : 'bg-white'} justify-content-around justify-content-md-end align-items-center py-2 `}>
          <span className="mx-2">showing</span>
          <select
            className={`px-2 rounded-3 ${theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}`}
            value={selectedOption}
            onChange={handleSelectChange}
          >
            {arrayoftotalNumberOfPages?.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <span className="mx-2">of {totalNumberOfRecords} Results</span>
        </div>
        <div className={`d-flex   justify-content-center justify-content-md-end align-items-center py-2  ${theme === 'dark' ? 'bg-transparent border-secondary text-white' : 'bg-white'} `}>
          <span className="mx-3">
            Page {currentPage} of {totalNumberOfPages}
          </span>
          <button
            className={`border-0 bg-transparent ${theme === 'dark' ? 'text-white' : ''}`}
            onClick={handlePrevpages}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-angle-left mx-2"></i>
          </button>
          <button
            className={`border-0 bg-transparent ${theme === 'dark' ? 'text-white' : ''}`}
            onClick={handleNextpages}
            disabled={currentPage === totalNumberOfPages}
          >
            <i className="fa-solid fa-angle-right mx-2"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newpagination