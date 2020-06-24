import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import LabelValue from "../components/LabelValue";

const Project = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
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
        <h4 className="mt--xl">1. Identification annonce</h4>
        <div className="label-value-group">
          <LabelValue label="Nom du produit" value={project.product.name} />
          <LabelValue label="SKU" value={project.product.sku} />
          <LabelValue label="Catégorie" value={project.product.category} />
        </div>
        <h4 className="mt--l">2. Informations modélisation</h4>
        <span className="d-block bold mb--s">
          Dimensions (en{" "}
          {project.product.dimensions.unit === "Pouces"
            ? "pouces"
            : "millimètres"}
          )
        </span>
        <div className="label-value-group">
          <LabelValue
            label="Hauteur"
            value={project.product.dimensions.width}
          />
          <LabelValue
            label="Longueur"
            value={project.product.dimensions.length}
          />
          <LabelValue
            label="Profondeur"
            value={project.product.dimensions.depth}
          />
        </div>
        <div className="label-value-group">
          <LabelValue label="Matériel" value={project.product.material} />
          <LabelValue label="URL" value={project.product.url} />
        </div>
        <LabelValue label="Détails" value={project.product.details} />
        <span className="d-block bold mb--s">Photos :</span>
        <div className="product-gallery">
          {[...Array(6).keys()].map((el, index) => {
            return (
              <img
                src={`https://picsum.photos/300?grayscale?random=${index + 1}`}
                alt="Photo du produit"
              />
            );
          })}
        </div>
      </>
    );
  };

  return (
    <main className="project-page">
      <h3>Fiche annonce {project && `| ${project.product.name}`}</h3>
      {error && <Error error="Une erreur est survenue." />}
      {loading && <Loader />}
      {project && renderProject()}
    </main>
  );
};

export default Project;
