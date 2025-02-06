import React, { useState } from 'react';

const AddTodoPage = ({ setTasks }) => {
    const [task, setTask] = useState("");

    return (
        <div className="container">
            <h2>Add Todo</h2>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Add new task..." value={task} onChange={(e) => setTask(e.target.value)} />
                <button className="btn btn-success" onClick={() => { 
                    setTasks(prev => [...prev, { text: task, completed: false, date: new Date().toLocaleString() }]); 
                    setTask(""); 
                }}>Add Task</button>
            </div>
        </div>
    );
};

export default AddTodoPage;
