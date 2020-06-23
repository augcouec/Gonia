import React from "react";
import AuthenticationManager from "../services/AuthenticationManager";

const Dashboard = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
  return (
    <main className="projects-list-page">
      <h1>Commandes</h1>
    </main>
  );
};

export default Dashboard;
