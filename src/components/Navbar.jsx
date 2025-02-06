import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Helix Todo</Link>
                <div>
                    <Link className="btn btn-outline-light me-2" to="/">Todo List</Link>
                    <Link className="btn btn-light" to="/add">Add Todo</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
