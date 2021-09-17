import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleLeft);

const Navbar = ({ children }) => {
  const history = useHistory();

  return (
    <div className="navbar mb-1">
      <div className="container  flex main-center cross-center">
        <button
          type="button"
          className="btn navbar__btn"
          onClick={() => history.push("/")}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Navbar;

Navbar.propTypes = {
  children: PropTypes.node,
};

Navbar.defaultProps = {
  children: null,
};
