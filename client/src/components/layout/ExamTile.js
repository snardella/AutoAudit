import React from "react";
import { Link } from "react-router-dom";

const ExamTile = (props) => {
  const { examDate, examId, examineeId } = props.exam;
  let dateDisplay = new Date(examDate);
  dateDisplay = `${
    dateDisplay.getMonth() + 1
  }/${dateDisplay.getDate()}/${dateDisplay.getFullYear()}`;

  const deleteExamHandler = async () => {
    await props.deleteExam(props.exam);
  };

  return (
    <div className="tile-container">
      <div>
        <Link to={`/exams/${examId}`}>
          <div className="exam-list">
            <h4>{dateDisplay}</h4>
            <input
              type="button"
              className="button small"
              value="Delete"
              onClick={deleteExamHandler}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ExamTile;
