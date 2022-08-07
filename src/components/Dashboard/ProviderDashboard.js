import React from "react";
import { ListJobsProvider } from "../Provider/ListJobs";
import { Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

export const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function onClick() {
    await logout().then(navigate("/"));
  }

  return (
    <Container>
      <Nav>
        <a href="/">
          <img src="/images/logo.svg" alt="" />
        </a>
        <button
          class="button job_btn"
          onClick={() => navigate("/update-profile")}
        >
          <span class="button__text">Update Profile</span>
          <i class="button__icon fas fa-chevron-right"></i>
        </button>

        <button class="button job_btn" onClick={onClick}>
          <span class="button__text">Logout</span>
          <i class="button__icon fas fa-chevron-right"></i>
        </button>
      </Nav>
      <h1>
        <u>Provider Dashboard</u>
      </h1>
      <ListJobsProvider />
    </Container>
  );
};
