import React from "react";

const Search = ({ handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input name="inputSearch" className="nav__search" onChange={handleChange} />
    <button type="submit">GO</button>
  </form>
);

export default Search;
