import React from "react";
import AuthenticationManager from "../services/AuthenticationManager";

const AddProject = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
  return (
    <main className="add-project-page">
      <h1>Ajout d'une nouvelle commande</h1>
    </main>
  );
};

export default AddProject;
