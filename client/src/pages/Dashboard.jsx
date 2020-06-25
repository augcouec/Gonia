import React, { useState, useEffect } from "react";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import illu from "../styles/asset/Shield.png";
import illu2 from "../styles/asset/Sablier.png";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Dashboard = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
  const user = AuthenticationManager.getUser();
  const userFirstName = user.firstname;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);
  const [pendingProjects, setPendingProjects] = useState([]);
  const [infographiste, setInfographiste] = useState([]);

  const settings = { params: {} };
  if (role === "client") {
    settings.params.clientId = user._id;
  }

  if (role === "infographiste") {
    settings.params.infographisteId = user._id;
  }

  useEffect(() => {
    setError(false);
    setLoading(true);
    Api.get("/projects", settings)
      .then((response) => {
        setLoading(false);
        if (response.status !== 200) {
          setError(true);
          return;
        }
        setProjects(response.data);
        setPendingProjects(
          response.data.filter((project) => project.status === "pending")
        );
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    Api.get("/users", { params: { role: "infographiste" } })
      .then((response) => {
        setLoading(false);
        if (response.status !== 200) {
          setError(true);
          return;
        }
        console.log(response.data);
        setInfographiste(response.data);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <main className="dashboard-page">
      {user.role === "client" && (
        <div name="dashboard-client">
          <div className="dashboard-title-container">
            <span className="dashboard-title">
              Bienvenue sur votre dashboard {userFirstName} !
            </span>
            <span className="dashboard-subtitle">
              Que voulez vous faire aujourd'hui ?
            </span>
          </div>
          <div className="dashboard-container">
            <div className="dashboard-left">
              {loading && <Loader />}
              {error && (
                <Error error="Une erreur est survenue lors du chargement des commandes." />
              )}
              {projects.length > 0 && (
                <div className="card-resume">
                  <div className="card-resume-left">
                    <img src={illu} alt="" />
                  </div>
                  <div className="card-resume-right">
                    <span> Suivi de votre commande </span>
                    <span className="card-resume-subtitle">
                      Votre commande est en validation par nos experts
                    </span>
                    <div className="product-code-sku mb--xs">
                      <div className="product-category-container  mb--m">
                        <span className="semi-bold">Nom du produit : </span>
                        <span>{projects[0].product.name}</span>
                      </div>
                      <div className="product-category-container  mb--m">
                        <span className=" semi-bold">État : </span>
                        <span
                          className={`product-status product-status--${projects[0].status}`}
                        >
                          {projects[0].status}
                        </span>
                      </div>
                      <div className="product-category-container ">
                        <span className="semi-bold">Infographiste : </span>
                        <span>
                          {(projects[0].infographiste &&
                            projects[0].infographiste.firstname) ||
                            "Non attribué"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="card-facturation">
                <div className="card-facturation-spaces semi-bold">
                  <span>Numéro de facture</span>
                  <span> Montant</span>
                  <span>Statut du paiement</span>
                </div>
                <div className="card-facturation-spaces">
                  <span>Facture n°2</span>
                  <span>320€</span>
                  <span>En attente</span>
                </div>
                <div className="card-facturation-spaces background-grey">
                  <span>Facture n°2</span>
                  <span>320€</span>
                  <span>Payé</span>
                </div>
              </div>
            </div>
            <div className="dashboard-right">
              <div className="dashboard-cta">
                <a href="/projects/add" className="button">
                  Ajouter une commande
                </a>
              </div>
              <div className="card-annonces">
                <div className="card-commandes-listing">
                  {loading && <Loader />}
                  {error && (
                    <Error error="Une erreur est survenue lors des annonces." />
                  )}
                  {projects.length > 0 &&
                    projects.slice(0, 10).map((project, index) => (
                      <div className="card-commandes-line" key={index}>
                        <a href={`projects/${project._id}`}>
                          <span>{project.product.name}</span>
                          <div
                            className={`cercle cercle--${project.status}`}
                          ></div>
                        </a>
                      </div>
                    ))}
                </div>

                <a href="/projects" className="button mt--s">
                  Voir toute mes annonces
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {user.role === "admin" && (
        <div name="dashboard-client">
          <div className="dashboard-title-container">
            <span className="dashboard-title">
              Bienvenue sur votre dashboard {userFirstName} !
            </span>
            <span className="dashboard-subtitle">
              Que voulez vous faire aujourd'hui ?
            </span>
          </div>
          <div className="dashboard-container">
            <div className="dashboard-left-admin">
              <div className="dashboard-left-listing-admin">
                <span className="card-listing-admin-title semi-bold mb--m">
                  Nouvelles annonces
                </span>
                {pendingProjects.map((project, index) => (
                  <div key={index} className="card-listing-admin-project">
                    <a href={`projects/${project._id}`}>
                      <span className="">{project.product.name}</span>
                      <span>{project.product.sku}</span>
                      <div className="product-category-container">
                        <span
                          className={`product-status product-status--${project.status}`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              <div className="card-facturation">
                <div className="card-facturation-spaces semi-bold">
                  <span>Numéro de facture</span>
                  <span> Montant</span>
                  <span>Statut du paiement</span>
                </div>
                <div className="card-facturation-spaces">
                  <span>Facture n°2</span>
                  <span>320€</span>
                  <span>En attente</span>
                </div>
                <div className="card-facturation-spaces background-grey">
                  <span>Facture n°2</span>
                  <span>320€</span>
                  <span>Payé</span>
                </div>
              </div>
            </div>
            <div className="dashboard-right-admin">
              <div className="card-annonces">
                <span className="card-listing-admin-title semi-bold mb--m">
                  Infographistes disponibles
                </span>
                <div className="card-commandes-listing">
                  {loading && <Loader />}
                  {error && (
                    <Error error="Une erreur est survenue lors des annonces." />
                  )}
                  {projects.length > 0 &&
                    infographiste.slice(0, 10).map((infographiste, index) => (
                      <div className="card-commandes-line" key={index}>
                        <a href={`projects/${infographiste._id}`}>
                          <span>{infographiste.firstname}</span>
                          <div className={`cercle cercle--done`}></div>
                        </a>
                      </div>
                    ))}
                </div>

                <a href="/projects" className="disabled mt--s">
                  Voir tous les infographistes
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {user.role === "infographiste" && (
        <div name="dashboard-client">
          <div className="dashboard-title-container">
            <span className="dashboard-title">
              Bienvenue sur votre dashboard {userFirstName} !
            </span>
            <span className="dashboard-subtitle">
              Que voulez vous faire aujourd'hui ?
            </span>
          </div>
          <div className="dashboard-container">
            <div className="dashboard-left">
              {loading && <Loader />}
              {error && (
                <Error error="Une erreur est survenue lors du chargement des commandes." />
              )}
              {projects.length > 0 && (
                <div className="card-resume">
                  <div className="card-resume-left">
                    <img src={illu2} alt="" />
                  </div>
                  <div className="card-resume-right">
                    <span> Suivi de votre commande </span>
                    <span className="card-resume-subtitle">
                      Votre dernier projet pour {projects[0].client.firstname}
                    </span>
                    <div className="product-code-sku mb--xs">
                      <div className="product-category-container  mb--m">
                        <span className="semi-bold">Nom du produit : </span>
                        <span>{projects[0].product.name}</span>
                      </div>
                      <div className="product-category-container  mb--m">
                        <span className=" semi-bold">État : </span>
                        <span
                          className={`product-status product-status--${projects[0].status}`}
                        >
                          {projects[0].status}
                        </span>
                      </div>
                      <div className="product-category-container ">
                        <span className="semi-bold">Client : </span>
                        <span>
                          {projects[0].client.firstname}{" "}
                          {projects[0].client.lastname}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="card-facturation">
                <div className="card-facturation-spaces semi-bold">
                  <span>Numéro de facture</span>
                  <span> Montant</span>
                  <span>Statut du paiement</span>
                </div>
                <div className="card-facturation-spaces">
                  <span>Facture n°2</span>
                  <span>320€</span>
                  <span>En attente</span>
                </div>
                <div className="card-facturation-spaces background-grey">
                  <span>Facture n°2</span>
                  <span>320€</span>
                  <span>Payé</span>
                </div>
              </div>
            </div>
            <div className="dashboard-right">
              <div className="card-annonces">
                <div className="card-commandes-listing">
                  {loading && <Loader />}
                  {error && (
                    <Error error="Une erreur est survenue lors des annonces." />
                  )}
                  {projects.length > 0 &&
                    projects.slice(0, 10).map((project, index) => (
                      <div className="card-commandes-line" key={index}>
                        <a href={`projects/${project._id}`}>
                          <span>{project.product.name}</span>{" "}
                          <div
                            className={`cercle cercle--${project.status}`}
                          ></div>
                        </a>
                      </div>
                    ))}
                </div>

                <a href="/projects" className="button mt--s">
                  Voir toutes mes annonces
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
