import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../services/Api";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Project = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);

  useEffect(() => {
    setError(false);
    setLoading(true);
    Api.get(`/projects/${id}`)
      .then((response) => {
        setLoading(false);
        if (response.status !== 200) {
          setError(true);
          return;
        }
        console.log(response.data);
        setProject(response.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const renderProject = () => {
    return (
      <>
        <span className={`product-status product-status--${project.status}`}>
          {project.status}
        </span>
      </>
    );
  };

  return (
    <main className="project-page">
      <h1>Fiche annonce {project && `| ${project.product.name}`}</h1>
      {error && <Error error="Une erreur est survenue." />}
      {loading && <Loader />}
      {project && renderProject()}
    </main>
  );
};

export default Project;
