import React from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { ListBuyerJobs } from "../ListJobs";

export const BuyerDashboard = () => {
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
        <button class="button job_btn" onClick={() => navigate("/job/create")}>
          <span class="button__text">Post a Job</span>
          <i class="button__icon fas fa-chevron-right"></i>
        </button>
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
        <u>Buyer Dashboard</u>
      </h1>
      <ListBuyerJobs />
    </Container>
  );
};
