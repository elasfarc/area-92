import React from "react";
import PropTypes from "prop-types";

const Search = ({ handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input
      name="inputSearch"
      placeholder="search..."
      className="nav__search"
      onChange={handleChange}
    />
    <button className="btn search__btn" type="submit">
      GO
    </button>
  </form>
);

export default Search;

Search.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
