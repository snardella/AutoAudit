import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import FormError from "../layout/FormError.js";

const NewExamForm = (props) => {
  const { examineeId, examineeName, industryType } = props.examinee;
  const [errors, setErrors] = useState([]);
  const [examDate, setExamDate] = useState(() => {
    let date = new Date();
    date =
      date.getFullYear().toString() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, 0) +
      "-" +
      date.getDate().toString().padStart(2, 0);
    return date;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.postExam(examDate);
  };

  const handleInputChange = (event) => {
    setExamDate(event.currentTarget.value);
  };

  const clearForm = () => {
    setExamDate(null);
  };
  return (
    <div className="callout">
      <h2>Add Exam</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label className="medium-6 columns">
            Exam Date:
            <input
              type="date"
              name="examDate"
              id="examDate"
              onChange={handleInputChange}
              value={examDate}
            />
            <FormError error={errors["Examinee Name"]} />
          </label>
          <div className="button-group">
            <input className="button" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewExamForm;
