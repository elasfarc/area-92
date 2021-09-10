import React from "react";

const Navbar = ({ children }) => {
  const f = true;

  return (
    <div className="navbar mb-1">
      <div className="container text-center">{children}</div>
    </div>
  );
};

export default Navbar;
