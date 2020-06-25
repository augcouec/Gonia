import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import LabelValue from "../components/LabelValue";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

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
  const [files, setFiles] = useState([]);

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

  const handleInit = () => {
    console.log("filepond init");
  };

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

  const sendModelisation = () => {
    const form = { status: "done" };
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

  const validateModelisation = () => {
    const form = { status: "finished" };
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

  const refuseModelisation = () => {
    const form = { status: "doing" };
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
          <img
            src="https://www.drawer.fr/44743-thickbox_default/fauteuil-retro-velours-brooks.jpg"
            alt="Image fauteuil"
          />
          <img
            src="https://www.drawer.fr/44745-thickbox_default/fauteuil-retro-velours-brooks.jpg"
            alt="Image fauteuil"
          />
          <img
            src="https://www.drawer.fr/44747-thickbox_default/fauteuil-retro-velours-brooks.jpg"
            alt="Image fauteuil"
          />
          <img
            src="https://www.drawer.fr/44760-thickbox_default/fauteuil-retro-velours-brooks.jpg"
            alt="Image fauteuil"
          />
          <img
            src="https://www.drawer.fr/44758-thickbox_default/fauteuil-retro-velours-brooks.jpg"
            alt="Image fauteuil"
          />
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
            <div>
              Si vous êtes intéressé par cette annonce, veuillez la
              sélectionner.
            </div>
            <button onClick={selectProject}>Sélectionner</button>
          </>
        )}
        {role === "infographiste" && project.status === "doing" && (
          <>
            <h4 className="mt--l">3. Modélisation</h4>
            <label htmlFor="productDetails">Fichiers de modélisation :</label>
            <FilePond
              files={files}
              allowMultiple={true}
              maxFiles={3}
              style="width:100%"
              server="/api/files"
              oninit={() => handleInit()}
              onupdatefiles={(fileItems) => {
                setFiles(fileItems.map((fileItem) => fileItem.file));
              }}
            />
            <button onClick={sendModelisation}>Envoyer modélisation</button>
          </>
        )}
        {(project.status === "done" || project.status === "finished") && (
          <>
            <h4 className="mt--l">3. Modélisation</h4>
            <img
              className="modelisation-img"
              src="https://visengine.com/wp-content/uploads/2017/03/3D_model_preview-1-3.jpg"
              alt="Modélisation d'un fauteuil"
            />
          </>
        )}
        {role === "admin" && project.status === "done" && (
          <div className="steps-buttons">
            <button className="negative-button" onClick={refuseModelisation}>
              Refuser la modélisation
            </button>
            <button onClick={validateModelisation}>
              Valider la modélisation
            </button>
          </div>
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
