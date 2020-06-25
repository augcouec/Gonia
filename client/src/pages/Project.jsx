import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import LabelValue from "../components/LabelValue";

const Project = () => {
  const user = AuthenticationManager.getUser();
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }

  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
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

        setProject(response.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const handleValidation = () => {
    const form = { status: "todo", adminId: user._id };
    Api.put(`/projects/${project._id}`, form)
      .then((response) => {
        if (response.status !== 200) {
          setLoadingSubmit(false);
          setErrorSubmit(true);
          return;
        }
        document.location.reload();
      })
      .catch(() => {
        setErrorSubmit(true);
        setLoadingSubmit(false);
      });
  };

  const selectProject = () => {
    const form = { status: "doing", infographisteId: user._id };
    Api.put(`/projects/${project._id}`, form)
      .then((response) => {
        if (response.status !== 200) {
          setLoadingSubmit(false);
          setErrorSubmit(true);
          return;
        }
        document.location.reload();
      })
      .catch(() => {
        setErrorSubmit(true);
        setLoadingSubmit(false);
      });
  };

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
          {role === "admin" && (
            <LabelValue
              label="Client"
              value={`${project.client.firstname} ${project.client.lastname}`}
            />
          )}
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
                key={index}
              />
            );
          })}
        </div>
        {role === "admin" && project.status === "pending" && (
          <>
            <h4 className="mt--l">3. Validation et attribution de l'annonce</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="input-radio">
                <input
                  type="radio"
                  value="true"
                  id="automatic"
                  name="attribution"
                  defaultChecked
                />
                <label htmlFor="automatic">
                  Proposer l'annonce à l'ensemble des infographistes
                </label>
              </div>
              <div className="input-radio">
                <input
                  type="radio"
                  value="true"
                  id="notAutomatic"
                  name="attribution"
                />
                <label htmlFor="notAutomatic">
                  Sélectionner des infographistes indentifiés
                </label>
              </div>
              <label>
                Adresse email de l'infographiste :
                <input
                  type="text"
                  placeholder="Adresse email de l'infographiste"
                  disabled
                  value={""}
                />
              </label>
              <label htmlFor="productCategory">
                Catégorie de prédilection :
              </label>
              <select id="infographisteEmail" disabled>
                <option value="">Sélectionnez une catégorie</option>
                <option value="bottle">Bouteille</option>
                <option value="desk">Bureau</option>
                <option value="chair">Chaise</option>
              </select>

              <button onClick={handleValidation}>Validation et envoi</button>
              {loadingSubmit && <Loader />}
              {errorSubmit && (
                <Error error="Une erreur est survenue lors de la mise à jour de la commande" />
              )}
            </form>
          </>
        )}
        {role === "infographiste" && project.status === "todo" && (
          <>
            <h4 className="mt--l">3. Modélisation</h4>
            Si vous êtes intéressé par cette annonce, veuillez la sélectionner.
            <button onClick={selectProject}>Sélectionner</button>
          </>
        )}
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
