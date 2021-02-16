import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import Examinee from "../../../models/Examinee.js";

const examineesRouter = new express.Router();

examineesRouter.get("/", async (req, res) => {
  try {
    const examinees = await Examinee.query();
    return res.status(200).json({ examinees: examinees });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

examineesRouter.get("/:examineeId", async (req, res) => {
  const examineeId = req.params.examineeId;
  try {
    const examinee = await Examinee.query().findById(examineeId);
    examinee.exams = await examinee.$relatedQuery("exams");
    return res.status(200).json({ examinee: examinee });
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
    const examinees = await Examinee.query();
    return res.status(201).json({ examinees: examinees });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default examineesRouter;
