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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.postExaminee(newExaminee);
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

  return (
    <div className="callout">
      <h3>Add Examinee</h3>
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
            <FormError error={errors["Examinee Name"]} />
          </label>
          <label className="medium-6 columns">
            Industry Type:
            <input
              type="text"
              name="industryType"
              onChange={handleInputChange}
              value={newExaminee.industryType}
            />
            <FormError error={errors["Industry Type"]} />
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
