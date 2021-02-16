import React from "react";
import { Link } from "react-router-dom";

const ExamTile = (props) => {
  const { examDate, examId, examineeId } = props.exam;
  let dateDisplay = new Date(examDate);
  dateDisplay = `${
    dateDisplay.getMonth() + 1
  }/${dateDisplay.getDate()}/${dateDisplay.getFullYear()}`;

  return (
    <div className="tile-container">
      <div>
        <Link to={`/exams/${examId}`}>
          <div>
            <h4>{dateDisplay}</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ExamTile;
