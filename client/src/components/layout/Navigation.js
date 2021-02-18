import React from "react";
import { Nav, initializeIcons } from "@fluentui/react";
import SignOutButton from "../authentication/SignOutButton.js";
import { Link } from "react-router-dom";

const navigationStyles = {
  root: {
    height: "100vh",
    boxSizing: "border-box",
    border: "1px solid #eee",
    overflowY: "auto",
    paddingTop: "10vh",
  },
};

const unauthenticatedListItems = [
  <li key="sign-in">
    <Link to="/user-sessions/new">Sign In</Link>
  </li>,
  <li key="sign-up">
    <Link to="/users/new" className="button">
      Sign Up
    </Link>
  </li>,
];

const authenticatedListItems = [
  <li key="sign-out">
    <SignOutButton />
  </li>,
];

const Navigation = (props) => {
  initializeIcons();
  let links;

  if (!props.user) {
    links = [
      {
        links: [
          {
            name: "Login",
            key: "key1",
            url: "/user-sessions/new",
            iconProps: {
              iconName: "FollowUser",
              styles: {
                root: {
                  fontSize: 20,
                  color: "#106ebe",
                },
              },
            },
          },
          {
            name: "Sign Up",
            key: "key2",
            url: "/users/new",
            iconProps: {
              iconName: "Add",
              styles: {
                root: {
                  fontSize: 20,
                  color: "#106ebe",
                },
              },
            },
          },
        ],
      },
    ];
  } else {
    links = [
      {
        links: [
          {
            name: "Logout",
            key: "key1",
            url: "/",
            iconProps: {
              iconName: "CalculatorSubtract",
              styles: {
                root: {
                  fontSize: 20,
                  color: "#106ebe",
                },
              },
            },
          },
          {
            name: "Dashboard",
            key: "key2",
            url: "/",
            iconProps: {
              iconName: "BIDashboard",
              styles: {
                root: {
                  fontSize: 20,
                  color: "#106ebe",
                },
              },
            },
          },
          {
            name: "Examinees",
            key: "key3",
            url: "/",
            iconProps: {
              iconName: "CompanyDirectory",
              styles: {
                root: {
                  fontSize: 20,
                  color: "#106ebe",
                },
              },
            },
          },
          {
            name: "Exams",
            key: "key4",
            url: "/exams",
            iconProps: {
              iconName: "TestBeakerSolid",
              styles: {
                root: {
                  fontSize: 20,
                  color: "#106ebe",
                },
              },
            },
          },
        ],
      },
    ];
  }
  return <Nav groups={links} selectedKey="key1" styles={navigationStyles} />;
};

export default Navigation;
