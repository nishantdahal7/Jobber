import { doc, setDoc } from "@firebase/firestore";
import React, { useRef, useState } from "react";
import { Alert, Button, Card, Container, Form, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { registration, emailVerification } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { db } = useDatabase();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      registration(emailRef.current.value, passwordRef.current.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userRef = doc(db, "user", user.uid);
          setDoc(userRef, {
            userId: user.uid,
            isOnBoarded: false,
          });

          await emailVerification().then(navigate("/login"));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
      setError("Failed to create an account!!!");
    }

    setLoading(false);
  }

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/logo.svg" alt="" />
        </a>
      </Nav>
      <div class="screen">
        <div class="screen__content">
          <form class="signupContainer" onSubmit={handleSubmit}>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                type="email"
                class="login__input"
                placeholder="Email"
                ref={emailRef}
                required
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                type="password"
                class="login__input"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                type="password"
                class="login__input"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
                required
              />
            </div>
            <button
              class="button login__submit"
              disabled={loading}
              type="submit"
            >
              <span class="button__text">SignUp</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div class="signup">
            <p>
              Already have an accoount? <a href="/login">Login</a>
            </p>
          </div>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </Container>
  );
}
