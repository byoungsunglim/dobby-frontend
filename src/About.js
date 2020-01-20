import { Route, Redirect, Switch } from "react-router-dom";
import React, { Component, useState } from "react";

import Main from "./Main";
import ProtectedRoute from "./AuthRoute";

function About() {
  return (
    <div className="Home">
      <b>About...</b>
    </div>
  );
}

export default About;
