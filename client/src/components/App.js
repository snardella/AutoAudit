import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import "office-ui-fabric-react/dist/css/fabric.css";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./layout/HomePage.js";
import ExamList from "./layout/ExamList.js";
import AccountsReceivableImport from "./layout/AccountsReceivablesImport.js";
import ExamineesList from "./layout/ExamineesList.js";
import ExamineeShow from "./layout/ExamineeShow.js";
import ExamShow from "./layout/ExamShow.js";
import Navigation from "./layout/Navigation.js";
import CardsSection from "./layout/CardsSection.js";
import OperationsTable from "./layout/OperationsTable";

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
  //<TopBar user={currentUser} />
  // <Route exact path="/">
  // <HomePage user={currentUser} />/
  //</Route>
  //<CardsSection />
  // <OperationsTable />
  return (
    <Router>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm1 ms-xl1">
            <Navigation user={currentUser} />
          </div>
          <div className="main-element ms-Grid-col ms-sm11 ms-xl11">
            <div className="ms-Grid-row">
              <Switch>
                <Route exact path="/users/new" component={RegistrationForm} />
                <Route exact path="/user-sessions/new" component={SignInForm} />
                <Route exact path="/examinees" component={ExamineesList} />
                <Route exact path="/examinees/:examineeId" component={ExamineeShow} />
                <Route exact path="/exams" component={ExamList} />
                <Route exact path="/exams/:examId" component={ExamShow} />
                <Route exact path="/importar/:examId" component={AccountsReceivableImport} />
              </Switch>
            </div>
            <div className="ms-Grid-row"></div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default hot(App);
