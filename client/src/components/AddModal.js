import { useState } from "react";
import "./modal.css";

export default function AddModal({ close,handleReload }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState("Completed");
  const [priority, setPriority] = useState("High");

  const handleChange = (e) => {
    if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "description") {
      setDescription(e.target.value);
    } else if (e.target.name == "start") {
      setStart(e.target.value);
    } else if (e.target.name == "end") {
      setEnd(e.target.value);
    } else if (e.target.name == "status") {
      setStatus(e.target.value);
    } else if (e.target.name == "priority") {
      setPriority(e.target.value);
    }
  };

  const handleAdd = () => {
    fetch("http://localhost:5000/add-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        start,
        end,
        status,
        priority,
      }),
    }).then((res) => {
      if (res.status === 201) {
        handleReload();
      }
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="button" onClick={close}>
            X
          </button>
          <h1 className="modal-title mx-auto">Add-Task</h1>
        </div>
        <div className="modal-body">
          <form>
            <div class="form-group row my-3">
              <label
                for="staticEmail"
                class="col-sm-2 col-form-label text-light"
              >
                Title
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control text-light"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                  value={title}
                  name="title"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            <div class="form-group row my-3">
              <label
                for="inputPassword"
                class="col-sm-2 col-form-label text-light"
              >
                Description
              </label>
              <div class="col-sm-10">
                <textarea
                  style={{ backgroundColor: "transparent" }}
                  class="form-control text-light"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Description"
                  value={description}
                  name="description"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                ></textarea>
              </div>
            </div>
            <div class="form-group row my-3">
              <label
                for="inputPassword"
                class="col-sm-2 col-form-label text-light"
              >
                Start Date
              </label>
              <div class="col-sm-10">
                <input
                  type="date"
                  style={{ backgroundColor: "transparent" }}
                  class="form-control text-light"
                  id="exampleFormControlInput1"
                  value={start}
                  name="start"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            <div class="form-group row my-3">
              <label
                for="inputPassword"
                class="col-sm-2 col-form-label text-light"
              >
                End Date
              </label>
              <div class="col-sm-10">
                <input
                  type="date"
                  style={{ backgroundColor: "transparent" }}
                  class="form-control text-light"
                  id="exampleFormControlInput1"
                  value={`${end}`}
                  name="end"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </div>
            </div>
            <div class="form-group row my-3">
              <label
                for="inputPassword"
                class="col-sm-2 col-form-label text-light"
              >
                Status
              </label>
              <div class="col-sm-10">
                <select class="form-control" id="exampleFormControlSelect1" name="status" value={status} onChange={(e) => handleChange(e)}>
                  <option>Completed</option>
                  <option>In-Progress</option>
                  <option>Not-Started</option>
                </select>
              </div>
            </div>
            <div class="form-group row my-3">
              <label
                for="inputPassword"
                class="col-sm-2 col-form-label text-light"
              >
                Priority
              </label>
              <div class="col-sm-10">
                <select class="form-control" id="exampleFormControlSelect1" name="priority" value={priority} onChange={(e) => handleChange(e)}>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </form>
          <div className="modal-footer">
            <button className="register mx-auto" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
