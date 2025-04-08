interface HeaderTableProps {
  handleAdd: () => void;
  header: string;
  namebtn: string;
}
const HeaderTable = ({ handleAdd, header, namebtn }: HeaderTableProps) => {
  return (
    <div className="bg-white mt-2 d-flex justify-content-between align-items-center p-4 shadow-sm border-top1">
      <div className="header">
        <h2 className="m-0 ps-md-5">{header}</h2>
      </div>
      <div className=" px-3 d-flex align-items-center rounded-pill auth-btn text-light">
        <i className="fa-solid fa-plus"></i>
        <button className="btn  border-0 text-light" onClick={handleAdd}>
          {namebtn}
        </button>
      </div>
    </div>
  );
};
export default HeaderTable;
