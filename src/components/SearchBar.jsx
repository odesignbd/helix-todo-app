import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
    return (
        <input
            type="text"
            className="form-control mt-3"
            placeholder="Search tasks..."
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
    );
};

export default SearchBar;
