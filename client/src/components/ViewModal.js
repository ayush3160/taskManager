import './modal.css'


export default function ViewModal({task , close}) {
  return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <button className="button" onClick = {close}>X</button>
            <h1 className="modal-title mx-auto">{task.title}</h1>
          </div>
          <div className="modal-body">
            <h5 className='text-light'><span style={{color : '#30fbef'}}>Description ={">"} </span> {task.description}</h5>
          </div>
          <div className="modal-body">
            <p className='text-light'>Start Date :- {task.start}<span style={{float : "right"}}>End Date :- {task.end}</span></p>
          <p className='text-light'>Status :- {task.status}<span style={{float : "right"}}>Priority :- {task.priority}</span></p>
          </div>
        </div>
      </div>
  );
}
