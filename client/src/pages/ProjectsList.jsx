import React, { useState, useEffect } from "react";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import ProjectCardAdmin from "../components/ProjectCardAdmin";

const Dashboard = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
  const user = AuthenticationManager.getUser();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [todoProjects, setTodoProjects] = useState([]);
  const [doingProjects, setDoingProjects] = useState([]);
  const [doneProjects, setDoneProjects] = useState([]);
  const [finishedProjects, setFinishedProjects] = useState([]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    const settings = { params: {} };

    if (role === "client") {
      settings.params.clientId = user._id;
    }

    Api.get("/projects", settings)
      .then((response) => {
        if (response.status !== 200) {
          setLoading(false);
          setError(true);
          return;
        }

        // Pending
        if (user.role !== "infographiste") {
          setPendingProjects(
            response.data.filter((project) => project.status === "pending")
          );
        }

        // Todo
        setTodoProjects(
          response.data.filter((project) => project.status === "todo")
        );

        // Doing
        if (user.role === "infographiste") {
          const doingProjects = response.data.filter(
            (project) => project.status === "doing"
          );
          setDoingProjects(
            doingProjects.filter(
              (project) => project.infographiste._id === user._id
            )
          );
        } else {
          setDoingProjects(
            response.data.filter((project) => project.status === "doing")
          );
        }

        // Done
        if (user.role === "infographiste") {
          const doneProjects = response.data.filter(
            (project) => project.status === "done"
          );

          setDoneProjects(
            doneProjects.filter(
              (project) => project.infographiste._id === user._id
            )
          );
        } else {
          setDoneProjects(
            response.data.filter((project) => project.status === "done")
          );
        }

        // Finished
        if (user.role === "infographiste") {
          const finishedProjects = response.data.filter(
            (project) => project.status === "finished"
          );
          setFinishedProjects(
            finishedProjects.filter(
              (project) => project.infographiste._id === user._id
            )
          );
        } else {
          setFinishedProjects(
            response.data.filter((project) => project.status === "finished")
          );
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <main className="projects-list-page">
      <h1>Mes annonces</h1>
      {error && (
        <Error error="Une erreur est survenue lors du chargement des annonces." />
      )}
      {loading && <Loader />}
      {pendingProjects.length > 0 && (
        <>
          <h4>Annonce en attente de modération </h4>
          <div className="listing-card">
            {pendingProjects.map((project, index) => (
              <ProjectCardAdmin project={project} key={index} />
            ))}
          </div>
        </>
      )}
      {todoProjects.length > 0 && (
        <>
          <h4>Annonce en attente d'infographiste </h4>
          <div className="listing-card">
            {todoProjects.map((project, index) => (
              <ProjectCardAdmin project={project} key={index} />
            ))}
          </div>
        </>
      )}
      {doingProjects.length > 0 && (
        <>
          <h4>Annonce en cours de création </h4>
          <div className="listing-card">
            {doingProjects.map((project, index) => (
              <ProjectCardAdmin project={project} key={index} />
            ))}
          </div>
        </>
      )}
      {doneProjects && doneProjects.length > 0 && (
        <>
          <h4>Annonce en attente de validation de qualité </h4>
          <div className="listing-card">
            {doneProjects.map((project, index) => (
              <ProjectCardAdmin project={project} key={index} />
            ))}
          </div>
        </>
      )}
      {finishedProjects && finishedProjects.length > 0 && (
        <>
          <h4>Annonce archivées </h4>
          <div className="listing-card">
            {finishedProjects.map((project, index) => (
              <ProjectCardAdmin project={project} key={index} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Dashboard;
