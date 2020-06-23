import React from "react";
import AuthenticationManager from "../services/AuthenticationManager";

const Dashboard = () => {
  const role = AuthenticationManager.getRole();
  return <h1>Dashboard</h1>;
};

export default Dashboard;
