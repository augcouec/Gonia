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
    Api.get("/projects")
      .then((response) => {
        if (response.status !== 200) {
          setLoading(false);
          setError(true);
          return;
        }
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
        setLoading(false);
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
        {error && (
          <div className="ml--s">
            <Error error="Une erreur est survenue." />
          </div>
        )}
        {loading && (
          <div className="ml--s">
            <Loader />
          </div>
        )}
        {!loading &&
          pendingProjects.map((project, index) => (
            <ProjectCardAdmin project={project} key={index} />
          ))}
      </div>
      <h4>Annonce en attente d'infographiste </h4>
      <div className="listing-card">
        {error && (
          <div className="ml--s">
            <Error error="Une erreur est survenue." />
          </div>
        )}
        {loading && (
          <div className="ml--s">
            <Loader />
          </div>
        )}
        {!loading &&
          todoProjects.map((project, index) => (
            <ProjectCardAdmin project={project} key={index} />
          ))}
      </div>
      <h4>Annonce en cours de création </h4>
      <div className="listing-card">
        {error && (
          <div className="mr--s">
            <Error error="Une erreur est survenue." />
          </div>
        )}
        {loading && (
          <div className="ml--s">
            <Loader />
          </div>
        )}
        {!loading &&
          doingProjects.map((project, index) => (
            <ProjectCardAdmin project={project} key={index} />
          ))}
      </div>
      <h4>Annonce en attente de validation de qualité </h4>
      <div className="listing-card">
        {error && (
          <div className="ml--s">
            <Error error="Une erreur est survenue." />
          </div>
        )}
        {loading && (
          <div className="ml--s">
            <Loader />
          </div>
        )}
        {!loading &&
          doneProjects.map((project, index) => (
            <ProjectCardAdmin project={project} key={index} />
          ))}
      </div>
      <h4>Annonce archivées </h4>
      <div className="listing-card">
        {error && (
          <div className="ml--s">
            <Error error="Une erreur est survenue." />
          </div>
        )}
        {loading && (
          <div className="ml--s">
            <Loader />
          </div>
        )}
        {!loading &&
          finishedProjects.map((project, index) => (
            <ProjectCardAdmin project={project} key={index} />
          ))}
      </div>
    </main>
  );
};

export default Dashboard;
