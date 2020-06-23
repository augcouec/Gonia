import React from "react";
import { NavLink } from "react-router-dom";
import AuthenticationManager from "../services/AuthenticationManager";

const Sidebar = () => {
  const role = AuthenticationManager.getRole();
  return (
    <aside className="sidebar">
      <span className="sidebar__brand">Gonia</span>
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
