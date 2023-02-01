import React from "react";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
import "../styles/Auth.css";

const cookies = new Cookies();

const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);

      cookies.set("auth-token", result.user.refreshToken);

      setIsAuth(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="body">
      <div className="auth">
        <p>Sign in With Google To Continue</p>
        <button onClick={signInWithGoogle} className="btn">
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
