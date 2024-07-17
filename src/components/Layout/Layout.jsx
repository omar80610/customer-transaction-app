import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaChartBar, FaExchangeAlt, FaUser } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import icon from "../../imgs/light.svg";
import "../../App.css"

export default function Layout() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNavLinkClick = () => {
    setShow(false);
  };
  return (
    <>
      <div
        style={{ backgroundColor: "#1f2937" }}
        className="w-100 p-2 text-white  sticky-top  d-none"
        onClick={handleShow}
      >
        <FiAlignJustify size={30} className="mx-3 " style={{ color: "#f0bc74" }}/> 
        <h6 className=" my-auto">Transactions Manager</h6>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1 p-0">
            <Navbar />
          </div>
          <div className="col-md-11">
            <Outlet />
          </div>
        </div>
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "#1f2937" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "#f2f4f6" }}>
            <img src={icon} alt="icon" className="pe-1 icon" />
            Customer Transactions App <hr />
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
