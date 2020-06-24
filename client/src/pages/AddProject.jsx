import React, { useState } from "react";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import Loader from "../components/Loader";
import Error from "../components/Error";

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
  const [productCategory, setProductCategory] = useState("");
  const [productDimensionUnit, setProductDimensionUnit] = useState("milimeter");
  const [productLength, setProductLength] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [productDepth, setProductDepth] = useState("");

  const handleSubmit = () => {
    setErrorSubmit(false);
    setLoadingSubmit(true);

    const project = {
      status: "pending",
      clientId: userId,
      products: [
        {
          name: productName,
          sku: productSku,
          category: productCategory,
          dimensions: {
            unit: productDimensionUnit,
            length: productLength,
            width: productWidth,
            depth: productDepth,
          },
        },
      ],
    };

    Api.post("/projects", project)
      .then((response) => {
        if (response.status !== 201) {
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
        <p className="mb--m">
          Les informations saisies dans cette partie du formulaire serviront à
          identifier le produit et la modélisation.
        </p>
        <label>
          Nom du produit :
          <input
            type="text"
            placeholder="Nom du produit"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          SKU :
          <input
            type="text"
            placeholder="SKU"
            value={productSku}
            onChange={(e) => setProductSku(e.target.value)}
          />
        </label>
        <p className="info-text d-block mb--m">
          Nous vous recommandons de saisir le SKU présent pour ce produit dans
          votre catalogue.
        </p>
        <label htmlFor="productCategory">Catégorie (optionnel)</label>
        <select
          id="productCategory"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="">--Sélectionnez une catégorie--</option>
          <option value="bottle">Bouteille</option>
          <option value="desk">Bureau</option>
          <option value="chair">Chaise</option>
        </select>
      </>
    );
  };

  const renderStepTwo = () => {
    return (
      <>
        <h3 className="mt--xl">2. Détails du produit</h3>
        <p className="mb--m">
          Les informations saisies dans cette partie du formulaire permettront à
          l'infographiste d'avoir les données nécessaires pour faire la
          modélisation.
        </p>
        <h3>Dimensions</h3>
        <span className="d-block bold mb--xs">Unité de mesure</span>
        <div className="input-radio">
          <label htmlFor="milimeter">Milimètres</label>
          <input
            type="radio"
            checked
            value={productDimensionUnit}
            id="milimeter"
            name="dimensionUnit"
            onChange={(e) => setProductDimensionUnit(e.target.value)}
          />
        </div>
        <div className="input-radio">
          <label htmlFor="inch">Pouces</label>
          <input
            type="radio"
            value={productDimensionUnit}
            id="inch"
            name="dimensionUnit"
            onChange={(e) => setProductDimensionUnit(e.target.value)}
          />
        </div>
        <div className="dimentions-inputs">
          <label>
            Longueur :
            <input
              type="number"
              placeholder="Longueur"
              value={productLength}
              onChange={(e) => setProductLength(e.target.value)}
            />
          </label>
          <label>
            Largeur :
            <input
              type="number"
              placeholder="Largeur"
              value={productWidth}
              onChange={(e) => setProductWidth(e.target.value)}
            />
          </label>
          <label>
            Profondeur :
            <input
              type="number"
              placeholder="Profondeur"
              value={productDepth}
              onChange={(e) => setProductDepth(e.target.value)}
            />
          </label>
        </div>
      </>
    );
  };

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
      {loadingSubmit && <Loader />}
      {!loadingSubmit && (
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
          {errorSubmit && <Error error="Une erreur est survenue." />}
        </form>
      )}
    </main>
  );
};

export default AddProject;
