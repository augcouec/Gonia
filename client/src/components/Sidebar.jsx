import React from "react";
import { NavLink } from "react-router-dom";
import AuthenticationManager from "../services/AuthenticationManager";
import logo from "../styles/asset/Logotype-Gonia.svg";

const Sidebar = () => {
  const role = AuthenticationManager.getRole();
  return (
    <aside className="sidebar">
      <img src={logo} alt="" className="sidebar__brand" />
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" activeClassName="active">
            Commandes
          </NavLink>
        </li>
        <li>
          <a className="disabled">Facturation</a>
        </li>
        <li>
          <a className="disabled">Mon stockage</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
