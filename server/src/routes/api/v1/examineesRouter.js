import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import Examinee from "../../../models/Examinee.js";

const examineesRouter = new express.Router();

examineesRouter.get("/", async (req, res) => {
  debugger;
  try {
    const examinees = await Examinee.query();
    debugger;
    return res.status(200).json({ examinees: examinees });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

examineesRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  try {
    const newExaminee = await Examinee.query().insertAndFetch(formInput);
    return res.status(201).json({ examinee: newExaminee });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default examineesRouter;
