import React from 'react';

const FilterBar = ({ setFilter }) => {
    return (
        <div className="btn-group mt-3 w-100">
            <button className="btn btn-outline-primary" onClick={() => setFilter("all")}>All</button>
            <button className="btn btn-outline-secondary" onClick={() => setFilter("active")}>Active</button>
            <button className="btn btn-outline-success" onClick={() => setFilter("completed")}>Completed</button>
        </div>
    );
};

export default FilterBar;
