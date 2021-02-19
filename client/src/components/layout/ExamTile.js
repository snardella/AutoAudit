import React from "react";
import { Link } from "react-router-dom";

const ExamTile = (props) => {
  const { examDate, examId, examineeId } = props.exam;
  let examineeDisplay;
  if (props.examinee) {
    const { examineeName } = props.examinee;
    examineeDisplay = `${examineeName} - `;
  }

  if (examineeDisplay == undefined) {
    examineeDisplay = "";
  }

  let dateDisplay = new Date(examDate);
  dateDisplay = `${dateDisplay.getMonth() + 1}/${dateDisplay
    .getDate()
    .toString()
    .padStart(2, 0)}/${dateDisplay.getFullYear()}`;

  const deleteExamHandler = async () => {
    await props.deleteExam(props.exam);
  };

  return (
    <div className="tile-container">
      <div className="list">
        <input
          type="button"
          className="button small"
          value="Delete"
          onClick={deleteExamHandler}
          id="update-delete-button"
        />
        <Link to={`/exams/${examId}`}>
          <div>
            <h4>
              {examineeDisplay}
              {dateDisplay}
            </h4>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default ExamTile;
