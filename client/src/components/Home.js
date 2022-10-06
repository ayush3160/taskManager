import React, { useEffect, useState } from "react";
import { FaTrash, FaEye, FaRegEdit } from "react-icons/fa";
import ViewModal from "./ViewModal";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

export default function Home() {
  const [allTasks, setAllTasks] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState({});
  const [sortedTasks,setSortedTasks] = useState([]);
  const [reload,setReload] = useState(false);

  useEffect(() => {
    fetch("/tasks")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.map((value) => {
          const startDate = new Date(value.start);

          value.start = startDate.toLocaleDateString();

          const endDate = new Date(value.end);

          value.end = endDate.toLocaleDateString();
        });

        setAllTasks(data);
        setSortedTasks(data)
      });
  }, [reload]);

  const handleClose = () => {
    setViewModal(false);
    setUpdateModal(false);
    setAddModal(false);
    setTaskSelected({});
  };

  const handleReload = () => {
    setViewModal(false);
    setUpdateModal(false);
    setAddModal(false);
    setReload(!reload)
  }

  const handleDelete = (id) => {
    fetch(`/deleteTask/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.msg == "Task Deleted") {
          const newTasks = allTasks.filter((value) => {
            return value.id !== id;
          });

          setSortedTasks(newTasks)
          setAllTasks(newTasks);
        }
      });
  };

  const sortByPriority = () => {
    let high = [],medium = [],low = [];

    allTasks.map((value) => {
      if(value.priority === 'High'){
        high.push(value)
      }else if(value.priority === 'Medium'){
        medium.push(value)
      }else if(value.priority === 'Low'){
        low.push(value)
      }
    })

    setSortedTasks([...high,...medium,...low])
  }
  
  const sortByStart = () => {
    setSortedTasks(allTasks)
  }

  const sortByStatus = () => {
    let completed = [],progress = [],notStarted = [];

    allTasks.map((value) => {
      if(value.status === 'Completed'){
        completed.push(value)
      }else if(value.status === 'In-Progress'){
        progress.push(value)
      }else if(value.status === 'Not-Started'){
        notStarted.push(value)
      }
    })

    setSortedTasks([...completed,...progress,...notStarted])
  }

  return (
    <>
      <div className="container-fluid">
        <h5>By Ayush Sharma</h5>
        <div className="row">
          <div className="col-sm-9 mx-auto text-black shadow-lg p-3">
            <h1 className="text-center">Welcome To Task-Manager</h1>
            <p className="text-center">
              Here you can create the task list for you and can delete the same.
            </p>
            <div class="btn-group" role="group">
              <button
                id="btnGroupDrop1"
                type="button"
                class="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort By
              </button>
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <p class="dropdown-item my-0" onClick={sortByStart}>
                  By Start Date
                </p>
                <p class="dropdown-item my-0" onClick={sortByPriority}>
                  By Priority
                </p>
                <p class="dropdown-item my-0" onClick={sortByStatus}>
                  By Status
                </p>
              </div>
            </div>
            <button
              className="btn btn-primary my-2"
              style={{ float: "right" }}
              onClick={() => {
                setAddModal(true);
              }}
            >
              + Add Task
            </button>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Start-Time</th>
                  <th scope="col">End-Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Priority</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((value, id) => {
                  return (
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{value.title}</td>
                      <td>{value.start}</td>
                      <td>{value.end}</td>
                      <td>{value.status}</td>
                      <td>{value.priority}</td>
                      <td style={{ color: "blue" }}>
                        <FaEye
                          onClick={() => {
                            setViewModal(true);
                            setTaskSelected(value);
                          }}
                        />
                      </td>
                      <td style={{ color: "white" }}>
                        <FaRegEdit
                          onClick={() => {
                            setUpdateModal(true);
                            setTaskSelected(value);
                          }}
                        />
                      </td>
                      <td style={{ color: "red" }}>
                        <FaTrash
                          onClick={() => {
                            handleDelete(value.id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {viewModal && <ViewModal task={taskSelected} close={handleClose} />}
      {updateModal && <EditModal handleReload = {handleReload} task={taskSelected} close={handleClose} />}
      {addModal && <AddModal handleReload = {handleReload} close={handleClose} />}
    </>
  );
}
