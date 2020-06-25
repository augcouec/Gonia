import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import AuthenticationManager from "../services/AuthenticationManager";
import Api from "../services/Api";
import Loader from "../components/Loader";
import Error from "../components/Error";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

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
  const [productDimensionUnit, setProductDimensionUnit] = useState(
    "Millimètres"
  );
  const [productLength, setProductLength] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [productDepth, setProductDepth] = useState("");
  const [productMaterial, setProductMaterial] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [filesPartOne, setFilesPartOne] = useState([]);
  const [filesPartTwo, setFilesPartTwo] = useState([]);
  const [contactMode, setContactMode] = useState("");

  const handleSubmit = () => {
    setErrorSubmit(false);
    setLoadingSubmit(true);

    const project = {
      status: "pending",
      clientId: userId,
      product: {
        name: productName,
        sku: productSku,
        category: productCategory,
        dimensions: {
          unit: productDimensionUnit,
          length: productLength,
          width: productWidth,
          depth: productDepth,
        },
        material: productMaterial,
        url: productUrl,
        details: productDetails,
        contactMode,
      },
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

  const handleInit = () => {
    console.log("init file pond");
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
      <div className="step-one">
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
          <option value="">Sélectionnez une catégorie</option>
          <option value="bottle">Bouteille</option>
          <option value="desk">Bureau</option>
          <option value="chair">Chaise</option>
        </select>
      </div>
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
        <div className="detail-container">
          <div className="detail-left-side">
            <h4>Dimensions</h4>
            <span className="d-block bold mb--s">Unité de mesure</span>
            <div className="input-radio">
              <input
                type="radio"
                checked
                value="Millimètres"
                id="milimeter"
                name="dimensionUnit"
                onChange={(e) => setProductDimensionUnit(e.target.value)}
              />
              <label htmlFor="milimeter">Milimètres</label>
            </div>
            <div className="input-radio">
              <input
                type="radio"
                value="Pouces"
                id="inch"
                name="dimensionUnit"
                onChange={(e) => setProductDimensionUnit(e.target.value)}
              />
              <label htmlFor="inch">Pouces</label>
            </div>
            <div className="dimentions-inputs mb--m mt--s">
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
            <h4>Autres informations</h4>
            <label>
              Matériel :
              <input
                type="text"
                placeholder="Matériel"
                value={productMaterial}
                onChange={(e) => setProductMaterial(e.target.value)}
              />
            </label>
            <label>
              URL de la fiche produit (optionnel) :
              <input
                type="text"
                placeholder="URL"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
              />
            </label>
            <label htmlFor="productDetails"> Details :</label>
            <textarea
              placeholder="Détails"
              value={productDetails}
              id="productDetails"
              rows="10"
              onChange={(e) => setProductDetails(e.target.value)}
            />
          </div>
          <div className="detail-right-side">
            <h4>Fichiers</h4>
            <label htmlFor="productDetails"> Photos ( 6 photos) :</label>

            <FilePond
              files={filesPartOne}
              allowMultiple={true}
              maxFiles={3}
              className="file-input"
              server="/api/files"
              oninit={() => handleInit()}
              onupdatefiles={(fileItems) => {
                setFilesPartOne(fileItems.map((fileItem) => fileItem.file));
              }}
            />
            <label htmlFor="productDetails">
              {" "}
              Autres fichier (optionnel) :
            </label>

            <FilePond
              files={filesPartTwo}
              allowMultiple={true}
              maxFiles={3}
              style="width:100%"
              server="/api/files"
              oninit={() => handleInit()}
              onupdatefiles={(fileItems) => {
                setFilesPartTwo(fileItems.map((fileItem) => fileItem.file));
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const renderStepThree = () => {
    return (
      <>
        <h3 className="mt--xl">3. Validation et paiement</h3>
        <h4>Suivi de l'état de l'annonce</h4>
        <span className="d-block bold mb--xs">Préférences de contact</span>
        <div className="input-radio">
          <input
            type="radio"
            value="onEachStep"
            id="onEachStep"
            name="contactMode"
            onChange={(e) => setContactMode(e.target.value)}
          />
          <label htmlFor="onEachStep">
            Je souhaite être notifié(e) par mail à chaque étape de l'avancée de
            mon annonce.
          </label>
        </div>
        <div className="input-radio">
          <input
            type="radio"
            value="onFinished"
            id="onFinished"
            name="contactMode"
            onChange={(e) => setContactMode(e.target.value)}
          />
          <label htmlFor="onFinished">
            Je souhaite être notifié(e) par mail lorsque ma modélisation sera
            terminée.
          </label>
        </div>
        <div className="input-radio">
          <input
            type="radio"
            value="none"
            id="none"
            name="contactMode"
            onChange={(e) => setContactMode(e.target.value)}
          />
          <label htmlFor="none">
            Je ne souhaite pas être notifié(e) par mail.
          </label>
        </div>
        <h4 className="d-block mt--m">
          Informations de paiement et de facturation
        </h4>
        <div className="stripe-placeholder"></div>
      </>
    );
  };

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
