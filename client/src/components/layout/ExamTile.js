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
      <div className="exam-list">
        <Link to={`/exams/${examId}`}>
          <div>
            <h4>{dateDisplay}</h4>
          </div>
        </Link>
        <input type="button" className="button small" value="Delete" onClick={deleteExamHandler} />
      </div>
    </div>
  );
};
export default ExamTile;
