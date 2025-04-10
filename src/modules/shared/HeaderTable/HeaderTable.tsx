interface HeaderTableProps {
  handleAdd?: () => void
  header?: string
  namebtn?: string
  type?: string
  goBack?: () => void
}

const HeaderTable: React.FC<HeaderTableProps> = ({
  handleAdd,
  header,
  namebtn,
  type,
  goBack,
}) => {
  if (type === 'update') {
    return (
      <div className="bg-white mt-2 d-flex justify-content-between align-items-center p-4 shadow-sm">
        <div className="ps-2 ps-md-5 py-1 item">
          <div role="button" onClick={goBack}>
            <i className="fa-solid fa-angle-left pe-2"></i>
            {namebtn}
          </div>
          <h3>{header}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white mt-2 d-flex justify-content-between align-items-center p-4 shadow-sm border-top1">
      <div className="header">
        <h2 className="m-0 ps-md-5">{header}</h2>
      </div>
      <div className="px-3 py-1 d-flex align-items-center rounded-pill auth-btn text-light">
        <i className="fa-solid fa-plus"></i>
        <button
          className="btn fw-medium border-0 text-light"
          onClick={handleAdd}
        >
          {namebtn}
        </button>
      </div>
    </div>
  )
}

export default HeaderTable
