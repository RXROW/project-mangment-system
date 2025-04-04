import { useMoveBack } from "../../hooks/useMoveBack";
export default function Taskdata() {
  const goBack = useMoveBack();
  return (
    <div>
      <div className="bg-white mt-2 d-flex justify-content-between align-items-center p-4 shadow-sm ">
        <div className=" ps-2 ps-md-5 py-1 item">
          <div role="button" onClick={goBack}>
            <i className="fa-solid fa-angle-left pe-2 "></i>View All Tasks
          </div>
          <h3>Add a New Task</h3>
        </div>
      </div>
      <div className="container w-75 bg-white my-5 p-3 rounded-4 shadow-sm">
        <form>
          <div className="mb-4">
            <label className="my-2 ms-2">Title</label>
            <input
              type="text"
              className="form-control rounded-4 my-2"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
              name="title"
              value=""
            />
          </div>
          <div className="my-4">
            <label className="my-2 ms-2">Description</label>
            <textarea
              className="form-control rounded-4 my-2"
              placeholder="Description"
              name="description"
            ></textarea>
          </div>
          <div className="row my-4">
            <div className="col-md-6">
              <div className="mb-4">
                <label className="my-2 ms-2">User</label>
                <select
                  className="form-control rounded-4 my-2"
                  name="employeeId"
                >
                  <option value="">User</option>
                  <option value="853">yara55</option>
                  <option value="852">mmatter3</option>
                  <option value="851">mona09</option>
                  <option value="850">mo44</option>
                  <option value="849">amira15</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <label className="my-2 ms-2">Project</label>
                <select
                  className="form-control rounded-4 my-2"
                  name="projectId"
                >
                  <option value="">Project</option>
                  <option value="1380">fd</option>
                </select>
              </div>
            </div>
          </div>
          <div className="btn-container d-flex justify-content-between align-items-center border-1 border-top py-4">
            <button className="btn btn-outline-dark rounded-pill py-2 px-md-4">
              Cancel
            </button>
            <button
              className="btn btn-warning rounded-pill py-2 px-md-4 text-white"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
