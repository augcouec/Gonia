import React, { useState } from "react";

const SignIn = (props) => {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);

  const handleSubmit = () => {
    console.log(emailValue, passwordValue);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Email :
          <input
            type="mail"
            required
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </label>
        <label>
          Mot de passe :
          <input
            type="password"
            required
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </label>
        <button>Se connecter</button>
      </form>
    </div>
  );
};

export default SignIn;
