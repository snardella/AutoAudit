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

  useEffect(() => {
    getExaminee();
  }, []);

  const allTheExams = examinee.exams.map((exam) => {
    return <ExamTile key={exam.examId} exam={exam} />;
  });

  return (
    <div className="tile-container">
      <h1>{examinee.examineeName}</h1>
      <h2>{examinee.industryType}</h2>
      <div>
        <NewExamForm examinee={examinee} postExam={postExam} />
        <ErrorList errors={errors} />
      </div>
      {allTheExams}
    </div>
  );
};

export default ExamineeShow;
