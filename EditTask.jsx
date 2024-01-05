import React, { Fragment, useState } from "react";

function EditTask({task}){
    // console.log("this is the task: " + task.user_id);

    // console.log("Task prop in EditTask:");
    // console.log('My Object:', JSON.stringify(task, null, 2));
    // console.log("task_name:", task.task_name);
    // console.log("task_description:", task.task_description);
    // console.log("task_id:", task.task_id);

    const [newTask, setTask] = useState({
        taskName: task.task_name,
        taskDescription: task.task_description
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setTask({
            ...newTask,
            [name]: value
          });
    }
    //edit task
    async function handleClick(e) {
        try {
            const body = newTask;
            const response = await fetch(`http://localhost:4000/tasks/${task.task_id}`,{
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = `/tasks/${task.user_id}`;
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <button type="button" className="btn btn-warning custom-btn" data-bs-toggle="modal" data-bs-target={`#id${task.task_id}`}>
            Edit
            </button>

            <div className="modal" id={`id${task.task_id}`}>
            <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                    <h4 className="modal-title">Edit Task</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={() => {
            setTask({
                taskName: task.task_name,
                taskDescription: task.task_description
            });
        }}
    ></button>
                </div>

                <div className="modal-body">
                    <input type="text" name="taskName" className="form-control" value={newTask.taskName} onChange={handleChange}/>
                    <input type="text" name="taskDescription" className="form-control" value={newTask.taskDescription} onChange={handleChange}/>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={handleClick}>Edit</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>

                </div>
            </div>
            </div>
        </Fragment>
    );
}

export default EditTask;