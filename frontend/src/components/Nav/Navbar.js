import React from "react";
import { Link } from "react-router-dom";
import "../../css/Navbar.css";

function Navbar({ user }) {
  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/" className="link">
          <p>Home</p>
        </Link>
      </div>
      <div className="navbar__right">
        {user ? (
          <p>
            Welcome: <small>{user}</small>{" "}
          </p>
        ) : (
          <>
            {" "}
            <Link to="/login" className="link">
              <p>Log in</p>
            </Link>
            <Link to="/signup" className="link">
              <p>Sign up</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
