import React, { useRef, useState } from "react";
import { Alert, Container, Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
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
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
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
              />
            </div>
            <button
              class="button login__submit"
              disabled={loading}
              type="submit"
            >
              <span class="button__text">Reset password</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div class="signup">
            <p>
              Need an account? <a href="/signup">Signup</a>
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
