import React from "react";
import "./sidebar.component.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="side_bar">
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/add_product">Add Product</Link>
          </li>
          <li>
            <Link to="/view_product">View Product</Link>
          </li>
          <li>
            <Link to="/search_product">Search Product</Link>
          </li>
          <li>
            <Link to="/slider">Slider</Link>
          </li>
          <li>
            <Link to="/details">Details</Link>
          </li>
          <li>
            <Link to="/chat">Messages</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
