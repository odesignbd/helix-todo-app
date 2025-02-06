import React, { useState } from "react";

const TodoItem = ({ task, index, setTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [editedTime, setEditedTime] = useState(task.scheduleTime);

    const toggleTask = () => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.map((t, i) => 
                i === index ? { ...t, completed: !t.completed, status: t.completed ? "undone" : "done" } : t
            );
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    const deleteTask = () => {
        setTasks(prevTasks => {
            const updatedTasks = prevTasks.filter((_, i) => i !== index);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    return (
        <li className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? "completed" : ""} 
            ${task.status === "past-due" ? "bg-danger text-white" : task.status === "done" ? "bg-success text-white" : "bg-primary text-white"}`}>
            <span className="badge rounded-pill me-2">
                {task.status === "past-due" ? "Past Due" : task.status === "done" ? "Done" : "Undone"}
            </span>
            <span className="fw-bold">{task.text} <small className="text-muted">({task.scheduleTime})</small></span>
            <div>
                <button className="btn btn-sm btn-light me-2 text-dark" onClick={toggleTask}>✔</button>
                <button className="btn btn-sm btn-light text-dark" onClick={deleteTask}>❌</button>
            </div>
        </li>
    );
};

export default TodoItem;
