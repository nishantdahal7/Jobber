import { doc, getDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Alert, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useDatabase } from "../contexts/DatabaseContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, setUserData } = useAuth();
  const { db } = useDatabase();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await login(
        emailRef.current.value,
        passwordRef.current.value
      );

      const { user } = userCredential;
      if (!user) {
        throw new Error("Error user not found");
      }
      const userRef = doc(db, "user", user.uid);
      const userDoc = (await getDoc(userRef)).data();
      if (!userDoc) {
        throw new Error("Error user not found");
      }
      if (userDoc.isOnBoarded) {
        setUserData(userDoc);
        navigate("/dashboard");
      } else {
        if (user.emailVerified == true) {
          navigate("/onboard");
        } else {
          throw new Error("Error email not verified");
        }
      }
    } catch (err) {
      console.log("err", err);
      switch (err.code) {
        case "auth/user-not-found":
          setError("User Not Found");
          break;
        case "auth/too-many-requests":
          setError("Too many requests for login. Please try again later");
          break;

        default:
          setError("Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/logo.svg" alt="" />
        </a>
      </Nav>
      {error && <Alert variant="danger">{error}</Alert>}
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
            <button
              class="button login__submit"
              disabled={loading}
              type="submit"
            >
              <span class="button__text">Log In</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div class="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
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
