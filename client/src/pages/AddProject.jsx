import React, { useState } from "react";
import AuthenticationManager from "../services/AuthenticationManager";

const AddProject = () => {
  const role = AuthenticationManager.getRole();
  if (!role) {
    window.location.href = "/signin";
  }

  const [step, setStep] = useState(1);

  const handleSubmit = () => {};

  const renderStepOne = () => {};

  const renderStepTwo = () => {};

  const renderStepThree = () => {};

  return (
    <main className="add-project-page">
      <h1>Ajout d'une nouvelle commande</h1>
      <div className="steps-progression">
        <div className={`steps-progression__step ${step >= 1 && "active"}`}>
          <span>Étape 1 - </span>
          <span>Identification</span>
          <span> - OK</span>
        </div>
        <div className={`steps-progression__step ${step >= 2 && "active"}`}>
          <span>Étape 2 - </span>
          <span>Détails modélisation</span>
          <span> - OK</span>
        </div>
        <div className={`steps-progression__step ${step === 3 && "active"}`}>
          <span>Étape 3 - </span>
          <span>Validation</span>
          <span> - OK</span>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </form>
    </main>
  );
};

export default AddProject;
