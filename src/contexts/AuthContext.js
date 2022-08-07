import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();
const provider = new GoogleAuthProvider();

export function useAuth() {
  return useContext(AuthContext);
}

//value wuthin Auth provider contains all the values we want to provide
//with our authentication.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState(); // This will hold the user data such as firstname,lastname etc. Later need to merge it with the current user.
  const [loading, setLoading] = useState(true);
  //***

  //this function will sighup user using firebase and value***
  function registration(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateUserPassword(password) {
    return updatePassword(auth.currentUser, password);
  }

  function emailVerification() {
    return sendEmailVerification(auth.currentUser);
  }

  function googleLogin() {
    return signInWithPopup(auth, provider)
      .then((result) => {
        console.log("In Auth", result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  //we use use effect so that auth is used only when we mount our component only once and not for rendering.
  //use effect with empty parenthesis will run it only once
  //unsubscribe will unsubscribe us from the listener 'onAuthStateChanged' whenever we unmount the auth.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  //***current user stored here which will be handled by useState.
  const value = {
    currentUser,
    login,
    registration,
    logout,
    resetPassword,
    updateUserPassword,
    userData,
    setUserData,
    emailVerification,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
