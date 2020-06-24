import React, { useState, useEffect } from "react";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import Loader from "../components/Loader";
import ProjectCardAdmin from "../components/ProjectCardAdmin";

const Dashboard = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [todoProjects, setTodoProjects] = useState([]);
  const [doingProjects, setDoingProjects] = useState([]);
  const [doneProjects, setDoneProjects] = useState([]);
  const [finishedProjects, setFinishedProjects] = useState([]);

  useEffect(() => {
    Api.get("/projects")
      .then((response) => {
        if (response.status !== 200) {
          setLoading(false);
          setError(true);
          return;
        }
        console.log(response.data);
        setProjects(response.data);
        setPendingProjects(
          response.data.filter((project) => project.status === "pending")
        );
        setTodoProjects(
          response.data.filter((project) => project.status === "todo")
        );
        setDoingProjects(
          response.data.filter((project) => project.status === "doing")
        );
        setDoneProjects(
          response.data.filter((project) => project.status === "done")
        );
        setFinishedProjects(
          response.data.filter((project) => project.status === "finished")
        );
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <main className="projects-list-page">
      <h1>Mes Annonces</h1>
      <h4>Annonce en attente de modération </h4>
      <div className="listing-card">
        {pendingProjects.map((project, index) => (
          <ProjectCardAdmin project={project} key={index} />
        ))}
      </div>
      <h4>Annonce en attente d'infographiste </h4>
      <div className="listing-card">
        {todoProjects.map((project, index) => (
          <ProjectCardAdmin project={project} key={index} />
        ))}
      </div>
      <h4>Annonce en cours de création </h4>
      <div className="listing-card">
        {doingProjects.map((project, index) => (
          <ProjectCardAdmin project={project} key={index} />
        ))}
      </div>
      <h4>Annonce en attente de validation de qualité </h4>
      <div className="listing-card">
        {doneProjects.map((project, index) => (
          <ProjectCardAdmin project={project} key={index} />
        ))}
      </div>
      <h4>Annonce archivées </h4>
      <div className="listing-card">
        {finishedProjects.map((project, index) => (
          <ProjectCardAdmin project={project} key={index} />
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
