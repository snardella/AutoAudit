import React from "react";
import { Link } from "react-router-dom";

const ExamineeTile = (props) => {
  const { examineeId, examineeName, industryType } = props.examinee;
  return (
    <div className="tile-container">
      <div>
        <Link to={`/examinees/${examineeId}`}>
          <div>
            <h4>{examineeName}</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ExamineeTile;
