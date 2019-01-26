import React from 'react';
import services from '../services/services';

const Search = ({ makeSearch, buildQuery }) => (
  <div className="search">
    <input type="text" onChange={(e) => services.inputChange(e.target.value, buildQuery)} />
    <button onClick={(e) => services.submit(e, makeSearch)}>Click Me</button>
  </div>
);

export default Search;
