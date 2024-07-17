import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import icon from "../../imgs/light.svg";
import { NavLink } from "react-router-dom";
import { FaChartBar, FaExchangeAlt, FaUser } from "react-icons/fa";
import "../../App.css"

export default function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNavLinkClick = () => {
    setShow(false);
  };

  return (
    <>
      <nav
        className="navbar position-fixed d-flex flex-column align-items-center text-white"
        style={{ height: "100vh", width: "80px", backgroundColor: "#405D72" }}
      >
        <div className="text-center mt-4">
          <img src={icon} alt="logo" className="w-50" />
        </div>
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <i className="fa-solid fa-bars fa-2x " onClick={handleShow} />
        </div>
        <div className="mt-auto pb-3 ">
          <i className="fa-solid fa-globe pb-1 pe-3" />
          <i className="fa-solid fa-share-nodes mt-3" />
        </div>
      </nav>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "#405D72" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "#f2f4f6" }}>
            <img src={icon} alt="icon" className="pe-1 icon" />
            Customer Transactions Menue <hr />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink
            to="/customer"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={handleNavLinkClick}
          >
            <FaUser size={30} />
            <span>Customers</span>
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={handleNavLinkClick}
          >
            <FaExchangeAlt size={30} />
            <span>Transactions</span>
          </NavLink>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={handleNavLinkClick}
          >
            <FaChartBar size={30} />
            <span>Statistics</span>
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
