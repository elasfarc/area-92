import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import { faUser, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faAngleLeft);

const Navbar = ({ children }) => {
  const history = useHistory();

  return (
    <div className="navbar mb-1">
      <div className="container  flex">
        <div onClick={() => history.push("/")}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Navbar;
