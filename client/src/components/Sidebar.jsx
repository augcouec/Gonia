import React from "react";
import { NavLink } from "react-router-dom";
import AuthenticationManager from "../services/AuthenticationManager";
import logo from "../styles/asset/Logotype-Gonia.svg";

const Sidebar = () => {
  const role = AuthenticationManager.getRole();
  return (
    <aside className="sidebar">
      <img src={logo} alt="" className="sidebar__brand" />
      <div className="sidebar__lists">
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              Tableau de bord
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" activeClassName="active">
              Annonces
            </NavLink>
          </li>
          <li>
            <a className="disabled">Facturation</a>
          </li>
          <li>
            <a className="disabled">Mon stockage</a>
          </li>
        </ul>
        <ul className="bottom-links">
          <li>
            <a className="disabled">Bibliotèque</a>
          </li>
          <li>
            <a className="disabled">Paramètres</a>
          </li>
        </ul>
      </div>
      <span className="powered">
        Powered by <strong>Hilo</strong>
      </span>
    </aside>
  );
};

export default Sidebar;
