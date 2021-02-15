import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

const HomePage = (props) => {
  const [exams, setExams] = useState([]);

  let userName = "Guest";
  if (props.user !== undefined && props.user !== null) {
    userName = props.user.email;
  }
  return (
    <div>
      <h1>AutoAudit</h1>;<h2>Welcome {userName}</h2>
      <Link to="/exams/importar">
        <h2>Import AR</h2>
      </Link>
      <Link to="/examinees">
        <h2>Examinees</h2>
      </Link>
    </div>
  );
};

export default withRouter(HomePage);
