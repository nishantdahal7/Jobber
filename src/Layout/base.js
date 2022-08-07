import React from "react";
import Header from "../components/Header";

const BaseLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default BaseLayout;
