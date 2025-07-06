import React, { useState } from "react";
import {
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import UserPool from "../cognito";

const AuthForm = ({ setSession }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const user = new CognitoUser({ Username: email, Pool: UserPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        const jwt = session.getIdToken().getJwtToken();
        setSession(jwt);
      },
      onFailure: (err) => {
        alert(err.message);
      }
    });
  };

  const signup = () => {
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) return alert(err.message);
      alert("User registered! Now login.");
    });
  };

  return (
    <div>
      <h2>Login / Sign Up</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>
    </div>
  );
};

export default AuthForm;
