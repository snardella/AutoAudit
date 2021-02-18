import React from "react";
import { Link } from "react-router-dom";

const ExamineeTile = (props) => {
  const { examineeId, examineeName, industryType } = props.examinee;
  const deleteExamineeHandler = async () => {
    await props.deleteExaminee(props.examinee);
  };

  return (
    <div className="tile-container">
      <div className="list">
        <input
          type="button"
          className="button small"
          value="Delete"
          onClick={deleteExamineeHandler}
          id="update-delete-button"
        />
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
