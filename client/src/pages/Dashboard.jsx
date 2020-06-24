import React, { useState, useEffect } from "react";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import illu from "../styles/asset/Shield.png";

const Dashboard = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }
  const user = AuthenticationManager.getUser();
  const userFirstName = user.firstname;
  const userId = user._id;
  console.log(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setError(false);
    setLoading(true);
    Api.get("/projects", {
      params: { clientId: userId },
    }).then((response) => {
      setLoading(false);
      if (response.status !== 200) {
        setError(true);
        return;
      }
      setProjects(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <main className="dashboard-page">
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
          {projects.length && (
            <div className="card-resume">
              <div className="card-resume-left">
                <img src={illu} alt="" />
              </div>
              <div className="card-resume-right">
                <span> Suivi de votre commande n°13</span>
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
              {projects.slice(0, 10).map((project, index) => (
                <div className="card-commandes-line">
                  <span>{project.product.name}</span>
                  <div className={`cercle cercle--${project.status}`}></div>
                </div>
              ))}
            </div>

            <a href="/projects/add" className="button mt--s">
              Voir toute mes commandes
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
