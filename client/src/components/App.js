import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./layout/HomePage.js";
import ExamList from "./layout/ExamList.js";
import AccountsReceivableImport from "./layout/AccountsReceivablesImport.js";
import ExamineesList from "./layout/ExamineesList.js";
import ExamineeShow from "./layout/ExamineeShow.js";
import ExamShow from "./layout/ExamShow.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />

      <Switch>
        <Route exact path="/">
          <HomePage user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/examinees" component={ExamineesList} />
        <Route exact path="/examinees/:examineeId" component={ExamineeShow} />
        <Route exact path="/exams/:examId" component={ExamShow} />
        <Route exact path="/importar/:examId" component={AccountsReceivableImport} />
      </Switch>
    </Router>
  );
};

export default hot(App);
