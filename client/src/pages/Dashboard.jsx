import React from "react";
import AuthenticationManager from "../services/AuthenticationManager";

const Dashboard = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
  return (
    <main className="dashboard-page">
      <h1>Tableau de board</h1>
      <a href="/projects/add" className="button">
        Ajouter une commande
      </a>
    </main>
  );
};

export default Dashboard;
