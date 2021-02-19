import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NewExamForm from "./NewExamForm.js";
import ExamTile from "./ExamTile.js";
import translateServerErrors from "../../services/translateServerErrors.js";
import ErrorList from "../layout/ErrorList.js";

const ExamineeShow = (props) => {
  const [examinee, setExaminee] = useState({
    examineeName: "",
    industryType: "",
    exams: [],
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getExaminee();
  }, []);

  const getExaminee = async () => {
    const examineeId = props.match.params.examineeId;
    try {
      const response = await fetch(`/api/v1/examinees/${examineeId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setExaminee(body.examinee);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const postExam = async (newExamDate) => {
    try {
      const response = await fetch(`/api/v1/exams`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ examDate: newExamDate, examineeId: examinee.examineeId }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        const body = await response.json();
        setExaminee(body.examinee);
        setErrors({});
        return;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteExam = async (exam) => {
    try {
      const examId = exam.examId;
      const response = await fetch(`/api/v1/exams/${examId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(exam),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      }
      const body = await response.json();
      setExaminee(body.examinee);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const allTheExams = examinee.exams.map((exam) => {
    return <ExamTile key={exam.examId} exam={exam} deleteExam={deleteExam} />;
  });

  return (
    <div className="page">
      <div className="tile-container">
        <h2>{examinee.examineeName}</h2>
        <h3>{examinee.industryType}</h3>
        <div>
          <NewExamForm examinee={examinee} postExam={postExam} />
          <ErrorList errors={errors} />
        </div>
        {examinee.exams.length != 0 && (
          <div>
            <h3>Exams</h3>
            {allTheExams}
          </div>
        )}
        {examinee.exams.length == 0 && (
          <div>
            <h4>No Exams</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamineeShow;
