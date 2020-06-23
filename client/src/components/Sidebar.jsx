import React from "react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <span className="sidebar__brand">Gonia</span>
      <ul>
        <li>
          <a href="/dashboard">Home</a>
        </li>
        <li>
          <a href="/projects">Commandes</a>
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
