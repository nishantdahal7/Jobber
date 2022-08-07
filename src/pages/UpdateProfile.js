import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div class="screen">
        <div class="screen__content">
          <form class="login" onSubmit={handleSubmit}>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input
                type="email"
                class="login__input"
                placeholder="Email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
                disabled
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                type="password"
                class="login__input"
                placeholder="New Password"
                ref={passwordRef}
                required
              />
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input
                type="password"
                class="login__input"
                placeholder="Confirm New Password"
                ref={passwordConfirmRef}
                required
              />
            </div>
            <button
              class="button login__submit"
              disabled={loading}
              type="submit"
            >
              <span class="button__text">Update</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div class="signup">
            <p>
              <a href="/">Cancel</a>
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
    </>
  );
}
