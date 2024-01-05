import React, { Fragment, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import EditTask from "./EditTask";
import Tooltip from "./Tooltip";
import Footer from "./Footer"
import './style.css';

function TaskList(userID) {
    const { userId } = useParams();
    const id = userId;
    const [list,setList] = useState([]);

    // State to track checked status of each row
    const [error, setError] = useState(null);

    //delete function
    async function deleteTask(id, checked) {
        try {
            if (!checked) {
                // If checkbox is not checked, show alert message
                setError("Check to delete");
                return;
            }
    
            const deleteTask = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: "DELETE"
            });
    
            setList(list.filter(task => task.task_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }
    

    //get tasks
    async function getTaskList(){
        try {
            console.log("getTaskList hiiii" + id);
            const response = await fetch(`http://localhost:4000/tasks/${id}`);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            const jsonData = await response.json();
            console.log("jsonData:", jsonData);
            setList(jsonData);
        } catch (err) {
            console.error(err.message);
            // Handle error, e.g., set an error state
        }
    }
      
// Toggle checked state of a row
    function toggleChecked(taskId) {
        setList((prevList) => {
      // Create a new array with updated checked property
        const newList = prevList.map(task => {
        if (task.task_id === taskId) {
          // Toggle the checked property between 0 and 1
          const updatedTask = { ...task, checked: task.checked === 1 ? 0 : 1 };
          // Update the database by sending a request to the server
          fetch(`http://localhost:4000/tasks/${taskId}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checked: updatedTask.checked }),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            // If the server update is successful, you can optionally handle the response
            console.log("Database update successful:", data);
          })
          .catch(error => {
            console.error("Error updating database:", error);
            // Optionally handle the error, e.g., show an error message to the user
          });
  
          return updatedTask;
        } else {
          return task;
        }
      });
  
      // Update state with the new list
      return newList;
    });
  }
  

    

    useEffect(() => {
        getTaskList();
    },[]);



    return(
    <Fragment>
        <table className="table mt-5 text-center bg-info ">
            <thead>
            <tr>
                <th>Done ✅</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {/*<tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr>*/}
            {list.map(task => (
                <tr key={task.task_id} className={(task.checked) ? 'checked-row' : ''}>
                
                <td><input 
                    type="checkbox" 
                    checked={task.checked === 1} 
                    onChange={() => toggleChecked(task.task_id)} 
                        required
                    />
                    {/* {task.checked === 0 && <span 
                        style={{ color: 'red', marginLeft: '5px' }}>Check to delete</span>}*/}</td> 
                <td>{task.task_name}</td>
                <td>{task.task_description}</td>
                <td><EditTask 
                    task={task}
                    userid={id}
                /></td>
                <td>
                    <button
                        className="btn btn-danger custom-btn"
                        onClick={() => {
                        if (task.checked) {
                            deleteTask(task.task_id, task.checked);
                        } else {
                            <Tooltip />
                        }
                        }}
                    >Delete
                    </button></td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="parent-container">
            {/* <Footer className="sticky-footer" /> */}
        </div>

    </Fragment>
    );
}
export default TaskList;