import React, { Fragment, useState } from "react";
import { useParams } from 'react-router-dom';


function AddTask(userID) {
    const { userId } = useParams();
    console.log("this is the user id in the Add Task Comp: " + userId);

    const [task,setTask] = useState({
        taskName: "",
        taskDescription: ""
    });

    function handleChange(event){
        const {name, value} = event.target;

        setTask((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    async function onSubmitForm(e){
        e.preventDefault();
        try {
            const body = task;
            const response = await fetch(`http://localhost:4000/tasks/${userId}`,{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = `/tasks/${userId}`;
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
    <Fragment>
        <h3 className="text-center mt-5 mb-3">Add Task</h3>
        <form className="mt-3" onSubmit={onSubmitForm}>
        {/* <form className="d-flex mt-5"> */}
            <input type="text" name="taskName" placeholder="Task Name" value={task.taskName} onChange={handleChange}/>
            <input type="text" name="taskDescription" placeholder="Task Description" value={task.taskDescription} onChange={handleChange}/>
            <div className="text-center">
                <button className="btn btn-success mt-2 custom-btn">Add</button>
            </div>
        </form>
    </Fragment>
    );
}

export default AddTask;