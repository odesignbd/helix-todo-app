import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [scheduleTime, setScheduleTime] = useState("");
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Load tasks from localStorage when the page loads
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    // ✅ Save tasks to localStorage when tasks update
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // ✅ Function to get Bangladesh time formatted
    const getBangladeshTime = () => {
        return new Date().toLocaleString("en-US", {
            timeZone: "Asia/Dhaka",
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }).replace(",", "").replace("AM", "am").replace("PM", "pm");
    };

    // ✅ Check & update past-due status every minute
    useEffect(() => {
        const interval = setInterval(() => {
            setTasks(prevTasks => 
                prevTasks.map(task => {
                    const taskTime = new Date(task.scheduleTime).getTime();
                    const currentTime = new Date().getTime();
                    if (!task.completed && taskTime < currentTime) {
                        return { ...task, status: "past-due" };
                    }
                    return task;
                })
            );
        }, 60000); // Runs every 60 seconds

        return () => clearInterval(interval);
    }, [setTasks]);

    // ✅ Add new task (Stores it permanently)
    const addTask = () => {
        if (!task.trim() || !scheduleTime) return;

        const newTask = {
            text: task,
            completed: false,
            status: "undone",
            createdAt: getBangladeshTime(), // Auto-generated
            scheduleTime: new Date(scheduleTime).toLocaleString("en-US", {
                timeZone: "Asia/Dhaka",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            }).replace(",", "").replace("AM", "am").replace("PM", "pm")
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save immediately

        setTask("");
        setScheduleTime("");
    };

    // ✅ Handle Enter key for adding tasks
    const handleKeyDown = (e) => {
        if (e.key === "Enter") addTask();
    };

    // ✅ Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    }).filter(task => task.text.toLowerCase().includes(searchQuery));

    return (
        <div className="container">
            <h2 className="text-center">Todo List</h2>
            <SearchBar setSearchQuery={setSearchQuery} />
            <FilterBar setFilter={setFilter} />
            <div className="input-group mt-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Add new task..." 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)}
                    onKeyDown={handleKeyDown} 
                />
                <input 
                    type="datetime-local" 
                    className="form-control" 
                    value={scheduleTime} 
                    onChange={(e) => setScheduleTime(e.target.value)} 
                />
                <button className="btn btn-primary" onClick={addTask}>Add Task</button>
            </div>
            <ul className="list-group mt-3">
                {filteredTasks.map((task, index) => (
                    <TodoItem key={index} task={task} index={index} setTasks={setTasks} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
