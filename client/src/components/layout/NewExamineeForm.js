import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";
import FormError from "../layout/FormError.js";

const NewExamineeForm = (props) => {
  const [newExaminee, setNewExaminee] = useState({
    examineeName: "",
    industryType: [],
  });
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
        if ((response.status = 422)) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postExaminee(newExaminee);
    clearForm();
  };

  const handleInputChange = (event) => {
    setNewExaminee({
      ...newExaminee,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const clearForm = () => {
    setNewExaminee({
      examineeName: "",
      industryType: [],
    });
  };

  if (shouldRedirect) {
    return <Redirect to={`/examinees/`} />;
  }

  return (
    <div className="callout">
      <h1>Add Examinee</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label className="medium-6 columns">
            Examinee Name:
            <input
              type="text"
              name="examineeName"
              placeholder="Examinee Name"
              onChange={handleInputChange}
              value={newExaminee.examineeName}
            />
            <FormError error={errors.examineeName} />
          </label>
          <label className="medium-6 columns">
            Industry Type:
            <input
              type="text"
              name="industryType"
              onChange={handleInputChange}
              value={newExaminee.industryType}
            />
            <FormError error={errors.industryType} />
          </label>
          <div className="button-group">
            <input className="button" type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewExamineeForm;
