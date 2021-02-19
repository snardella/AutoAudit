import React, { useState, useEffect } from "react";
import NewExamineeForm from "../layout/NewExamineeForm.js";
import ExamineeTile from "../layout/ExamineeTile.js";

const ExamineesList = (props) => {
  const [examinees, setExaminees] = useState([]);

  const getExaminees = async () => {
    try {
      const response = await fetch("/api/v1/examinees");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setExaminees(body.examinees);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const deleteExaminee = async (examinee) => {
    const examineeId = examinee.examineeId;
    try {
      const response = await fetch(`/api/v1/examinees/${examineeId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(examinee),
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
      setExaminees(body.examinees);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const postExaminee = async (newExamineeData) => {
    try {
      const response = await fetch(`/api/v1/examinees`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(newExamineeData),
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
        setExaminees(body.examinees);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getExaminees();
  }, []);

  const allTheExaminees = examinees.map((examinee) => {
    return (
      <ExamineeTile key={examinee.examineeId} examinee={examinee} deleteExaminee={deleteExaminee} />
    );
  });

  return (
    <div className="page">
      <div className="add-examinee">
        <NewExamineeForm postExaminee={postExaminee} />
      </div>
      {examinees.length != 0 && <div>{allTheExaminees}</div>}
      {examinees.length == 0 && (
        <div>
          <h3>No Examinees</h3>
        </div>
      )}
    </div>
  );
};

export default ExamineesList;
