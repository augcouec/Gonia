import React, { useState } from "react";
import Api from "../services/Api.js";
import AuthenticationManager from "../services/AuthenticationManager";
import logo from "../styles/asset/Logotype-Gonia.svg";
import background from "../styles/asset/login_background.png";
import Loader from "../components/Loader";
import Error from "../components/Error";

const SignIn = (props) => {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const handleSubmit = () => {
    setErrorSignIn(false);
    setLoadingSignIn(true);
    Api.post("/signin", { email: emailValue, password: passwordValue })
      .then((response) => {
        setLoadingSignIn(false);
        if (response.status !== 200) {
          setErrorSignIn(true);
          return;
        }
        AuthenticationManager.saveCredentials(response.data);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        setLoadingSignIn(false);
        setErrorSignIn(true);
      });
    console.log(emailValue, passwordValue);
  };

  return (
    <section className="signin-page">
      <main className="main-layout">
        <div className="right-side">
          <img src={logo} alt="" className="logo" />
          <h1>
            L'outil numéro 1 de mise en relation avec des infographistes 3D
            qualifiés
          </h1>
          <h4>Faites entrer votre entreprise dans une nouvelle dimension</h4>
          <hr />
          <span>Login</span>
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
                placeholder="Email"
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </label>
            <label>
              Mot de passe :
              <input
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </label>
            <a className="password-reset" href="">
              Mot de passe oublié ?
            </a>
            <div className="label-checkbox">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked
              />
              <label for="rememberMe">Se souvenir de moi !</label>
            </div>
            <button>Se connecter</button>
            {loadingSignIn && <Loader />}
            {errorSignIn && (
              <Error error="Les identifiants saisis sont invalides." />
            )}
          </form>
          <p className="signature">Ce produit à été concu par HILO</p>
        </div>
        <div className="background-image-container">
          <img src={background} alt="" className="background-image" />
        </div>
      </main>
    </section>
  );
};

export default SignIn;
