import Dropdown from "react-bootstrap/Dropdown"; 
import useThemeContext from "../../../hooks/useThemeContext";

interface paginationInfo {
  totalNumberOfPages: number[];
  currentPage?: number | string;
  numberOfPages?: number | string;
  paginatedListFunction: (UsersFilterOptions: {
    pageNumber: number;
    pageSize: number;
  }) => void;
  pageNumber: number;
  numOfRecords: number;
  from?: string;
}

const Pagination: React.FC<paginationInfo> = ({
  totalNumberOfPages,
  paginatedListFunction,
  pageNumber,
  numOfRecords,
  from,
}) => {
  const { theme } = useThemeContext();

  const nextBtn = (pageSize: number, pageNumber: number) => {
    if (pageNumber <= totalNumberOfPages.length) {
      paginatedListFunction({ pageNumber: pageNumber, pageSize: pageSize });
    }
  };
  const prevBtn = (pageSize: number, pageNumber: number) => {
    if (pageNumber >= 1) {
      paginatedListFunction({ pageNumber: pageNumber, pageSize: pageSize });
    }
  };

  return (
    <>
      <div className={`py-3 paginateWrapper ${theme === 'dark' ? 'text-white' : ''}`}>
        <nav aria-label="Page navigation example">
          <ul className="pagination align-items-center gap-3 justify-content-end">
            <span>showing</span>
            <Dropdown>
              <Dropdown.Toggle
                variant={theme === 'dark' ? 'dark' : 'transparent'}
                className={`paginationDropDownStyle ${theme === 'dark' ? 'border-secondary text-white' : ''}`}
                id="dropdown-basic"
              >
                {pageNumber}{" "}
                {totalNumberOfPages.length < 2 ? (
                  ""
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </Dropdown.Toggle>

              {totalNumberOfPages.length < 2 ? (
                ""
              ) : (
                <Dropdown.Menu className={`dropDownMenuStyle ${theme === 'dark' ? 'bg-dark border-secondary' : ''}`}>
                  {totalNumberOfPages?.map((page) => (
                    <Dropdown.Item
                      key={page}
                      onClick={() =>
                        paginatedListFunction({
                          pageNumber: page,
                          pageSize: from == "users" ? 20 : 5,
                        })
                      }
                      className={theme === 'dark' ? 'text-white' : ''}
                    >
                      {page}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              )}
            </Dropdown>

            <span> of {numOfRecords} Results</span>

            <div>
              <span>Page {pageNumber}</span>
              <span className="mx-2">of {totalNumberOfPages?.length}</span>
            </div>

            {numOfRecords < 10 ? (
              ""
            ) : (
              <>
                <li className="page-item">
                  <a
                    className={
                      pageNumber == 1
                        ? `page-link pagniationLink disabledArrow ${theme === 'dark' ? 'bg-dark border-secondary' : ''}`
                        : `page-link pagniationLink ${theme === 'dark' ? 'bg-dark border-secondary text-white' : ''}`
                    }
                    onClick={() =>
                      prevBtn(from == "users" ? 20 : 5, pageNumber - 1)
                    }
                    aria-label="Previous"
                  >
                    <i className={`fa-solid fa-chevron-left ${theme === 'dark' ? 'text-white' : ''}`}></i>
                  </a>
                </li>

                <li className="page-item">
                  <a
                    className={
                      pageNumber == totalNumberOfPages.length
                        ? `page-link pagniationLink disabledArrow ${theme === 'dark' ? 'bg-dark border-secondary' : ''}`
                        : `page-link pagniationLink enabledArrow ${theme === 'dark' ? 'bg-dark border-secondary text-white' : ''}`
                    }
                    onClick={() =>
                      nextBtn(from == "users" ? 20 : 5, pageNumber + 1)
                    }
                    aria-label="Next"
                  >
                    <i className={`fa-solid fa-chevron-right ${theme === 'dark' ? 'text-white' : ''}`}></i>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;