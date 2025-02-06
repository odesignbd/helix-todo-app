import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import AddTodoPage from './components/AddTodoPage';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<TodoList tasks={tasks} setTasks={setTasks} />} />
                <Route path="/add" element={<AddTodoPage setTasks={setTasks} />} />
            </Routes>
        </>
    );
};

export default App;
