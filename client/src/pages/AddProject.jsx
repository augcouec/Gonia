import React, { useState } from "react";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";

const AddProject = () => {
  const role = AuthenticationManager.getRole();
  const userId = AuthenticationManager.getId();
  if (!role) {
    window.location.href = "/signin";
  }

  const [errorSubmit, setErrorSubmit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [step, setStep] = useState(1);
  const [productName, setProductName] = useState("");
  const [productSku, setProductSku] = useState("");

  const handleSubmit = () => {
    setErrorSubmit(false);
    setLoadingSubmit(true);

    const project = {
      status: "pending",
      clientId: userId,
      productName,
      productSku,
    };

    Api.post("/projects", project)
      .then((response) => {
        if (response !== 201) {
          setLoadingSubmit(false);
          setErrorSubmit(true);
          return;
        }
        window.location.href = "/dashboard";
      })
      .catch(() => {
        setErrorSubmit(true);
        setLoadingSubmit(false);
      });
  };

  const nextStep = () => {
    if (step === 3) {
      handleSubmit();
      return;
    }
    setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStepOne = () => {
    return (
      <>
        <h3 className="mt--xl">1. Identification du produit</h3>
        <p className="mb--xl">
          Les informations saisies dans cette partie du formulaire serviront à
          identifier le produit et la modélisation.
        </p>
        <label>
          Nom du produit :
          <input
            type="text"
            required
            placeholder="Nom du produit"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          SKU :
          <input
            type="text"
            required
            placeholder="SKU"
            value={productSku}
            onChange={(e) => setProductSku(e.target.value)}
          />
        </label>
      </>
    );
  };

  const renderStepTwo = () => {};

  const renderStepThree = () => {};

  return (
    <main className="add-project-page">
      <h1>Ajout d'une nouvelle commande</h1>
      <div className="steps-progression">
        <div className={`steps-progression__step ${step >= 1 ? "active" : ""}`}>
          <span>Étape 1 - </span>
          <span>Identification</span>
          <span> ●</span>
        </div>
        <div className={`steps-progression__step ${step >= 2 ? "active" : ""}`}>
          <span>Étape 2 - </span>
          <span>Détails modélisation</span>
          <span> ●</span>
        </div>
        <div
          className={`steps-progression__step ${step === 3 ? "active" : ""}`}
        >
          <span>Étape 3 - </span>
          <span>Validation</span>
          <span> ●</span>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
        <div className="steps-buttons">
          <button
            onClick={previousStep}
            className={`${step === 1 ? "disabled" : ""}`}
          >
            Étape précédente
          </button>
          <button onClick={nextStep}>
            {step === 3 ? "Visualiser l'annonce" : "Étape suivante"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddProject;
