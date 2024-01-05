const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const path = require('path');
const { log } = require("console");

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *"
        , [fname, lname, email, password]);

        res.json(newUser.rows[0]); // Send the newly created user back to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//login
app.post("/",async(req,res) => {
    try {
        const { email, password } = req.body;
        // console.log("email: " + email + "password: " + password);
        // console.log(JSON.stringify(req.body, null, 2));        
        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND password = $2",
            [email, password]
        );
        if (user.rows.length > 0) {
            // console.log("this is the id in the server user id user.rows[0].user_id: ");
            // console.log(JSON.stringify(user.rows[0], null, 2)); 
            res.json({ message: "Login successful", userId: user.rows[0].id });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Add Task
app.post("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { taskName, taskDescription} = req.body;
        console.log("im in the server add task: " + req.body.taskName + " " + req.body.taskDescription + " " + id);
        // Execute the SQL query using the pool
        const newTask = await pool.query(
            "INSERT INTO tasks (task_name, task_description, user_id, checked) VALUES ($1, $2, $3 ,$4) RETURNING *"
        , [taskName, taskDescription, id, 0]);

        res.json(newTask.rows[0]); // Send the newly created user back to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get tasks
app.get("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        console.log("iddddd " + req.params);
        console.log(JSON.stringify(req.params, null, 2)); 
        const allTasks = await pool.query("SELECT * FROM tasks WHERE user_id = $1",[id]);
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

//Update task
app.put("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const {taskName, taskDescription} = req.body;
        console.log(req.body);
        console.log(taskName);
        console.log(taskDescription);
        console.log(id);
        const updateTask = await pool.query(
            "UPDATE tasks SET task_name = $1, task_description = $2 WHERE task_id = $3"
            ,[taskName,taskDescription,id]);
        
        res.json("task was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

//update checked column
app.patch("/tasks/:id", async (req, res) => {
    console.log("hello from the server hhdhhhhdhdhdhdhdhhdhdhdhdhdhdhdhhdhdhhdhh");
    try {
        const { id } = req.params;

        // Fetch the current value of the 'checked' column
        const currentCheckedValue = await pool.query("SELECT checked FROM tasks WHERE task_id = $1", [id]);
        
        // Toggle the value (0 to 1, 1 to 0)
        console.log("req.body: ");
        console.log(JSON.stringify(req.body, null, 2));  
        const newVal = req.body.checked;

        const updateCol = await pool.query("UPDATE tasks SET checked = $1 WHERE task_id = $2", [newVal, id]);
        
        res.json("task was updated!");

    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//Delete task
app.delete("/tasks/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query("DELETE FROM tasks WHERE task_id = $1",[id]);

        res.json("task was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

//get user name
app.get("/users/:id", async(req, res) => {
    try {
        const { id } = req.params;
        console.log("iddddd " + req.params);
        console.log(JSON.stringify(req.params, null, 2)); 
        const allTasks = await pool.query("SELECT first_name FROM users WHERE id = $1",[id]);
        res.json(allTasks.rows[0]);
    } catch (err) {
        console.error(err.message);
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});


app.listen(4000, () => {
    console.log("Server has started on port 4000");
});