import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../Firebase-conf";
import { useEffect } from "react";
import {auth} from '../Firebase-conf';
import { signOut } from "firebase/auth";

const Navbar = () => {
  const user = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const logout = async (e) => {
   
    await signOut(auth);
   
 };
   
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setShowMenu(mediaQuery.matches);
    const handleMediaQueryChange = (e) => {
      setShowMenu(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  fixed-top" style={{ backgroundColor: "#F5EAB655", height: "70px", paddingLeft: "20px", paddingRight: "30px" }}>
      <div className="container-fluid menu-navbar">
        <Link className="navbar-brand" to="/">
          <img src={logo} className="login-logo" alt="logo" style={{ height: "90px" }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {showMenu && (
          <div  className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink  exact className="nav-link" activeClassName="active" to="/home">
                  Home
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink  className="nav-link" activeClassName="active" to={`/profile?uid=${user?.uid}`}>
                  Profile
                </NavLink>
              </li>
              
              <li className="nav-item">
                <NavLink  onClick={logout} className="nav-link text-danger" activeClassName="active" to="/">
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
