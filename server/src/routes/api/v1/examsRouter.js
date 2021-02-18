import express from "express";
import objection from "objection";
const { ValidationError } = objection;

import cleanUserInput from "../../../services/cleanUserInput.js";
import Exam from "../../../models/Exam.js";
import AccountsReceivable from "../../../models/AccountsReceivable.js";
import Examinee from "../../../models/Examinee.js";

const examsRouter = new express.Router();

examsRouter.get("/", async (req, res) => {
  try {
    const exams = await Exam.query();
    for (const exam of exams) {
      exam.examinee = await exam.$relatedQuery("examinee");
      exam.accountsReceivables = await exam.$relatedQuery("accountsReceivables");
    }

    return res.status(200).json({ exams: exams });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

examsRouter.get("/:examId", async (req, res) => {
  const examId = req.params.examId;
  try {
    const exam = await Exam.query().findById(examId);
    exam.examinee = await exam.$relatedQuery("examinee");
    exam.accountsReceivables = await exam.$relatedQuery("accountsReceivables");
    return res.status(200).json({ exam: exam });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

examsRouter.delete("/:examId", async (req, res) => {
  const examId = req.params.examId;
  const examineeId = req.body.examineeId;
  try {
    const examToDelete = await Exam.query().findById(examId);
    await examToDelete.$relatedQuery("accountsReceivables").delete();
    await Exam.query().deleteById(examId);
    const examinee = await Examinee.query().findById(examineeId);
    examinee.exams = await examinee.$relatedQuery("exams");
    const exams = await Exam.query();
    return res.status(200).json({ examinee: examinee, exams: exams });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

examsRouter.post("/", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const { examDate, examineeId } = formInput;
  try {
    const newExam = await Exam.query().insertAndFetch({
      examDate,
      examNetEligible: 0,
      examCurrent: 0,
      exam30Days: 0,
      exam60Days: 0,
      exam90Days: 0,
      exam120Days: 0,
      examTotal: 0,
      examGreaterThan90: 0,
      examCAReserve: 0,
      examACReserve: 0,
      examIntercompanyReserve: 0,
      examForeignReserve: 0,
      examContraReserve: 0,
      examGovernmentReserve: 0,
      examNBARReserve: 0,
      examineeId: examineeId,
    });
    const examinee = await newExam.$relatedQuery("examinee");
    examinee.exams = await examinee.$relatedQuery("exams");
    return res.status(201).json({ examinee: examinee });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

examsRouter.post("/:examId", async (req, res) => {
  const { body } = req;
  const formInput = cleanUserInput(body);
  const examTotals = formInput.pop();
  const examId = req.params.examId;
  try {
    const exam = await Exam.query().findById(examId);
    for (const ar of formInput) {
      await AccountsReceivable.query().insert({
        customerName: ar["Customer Name"],
        customerState: ar["State"],
        customerNetEligible: ar["Net Eligible"],
        customerCurrent: ar["Current"],
        customer30Days: ar["30 Days"],
        customer60Days: ar["60 Days"],
        customer90Days: ar["90 Days"],
        customer120Days: ar["120 Days"],
        customerTotal: ar["Total"],
        customerGreaterThan90: ar["Greater Than 90"],
        customerCAPercentage: ar["Cross Aging %"],
        customerCAReserve: ar["Cross Aging Reserve"],
        customerACReserve: ar["Aged Credits Reserve"],
        customerIntercompanyReserve: ar["Intercompany Reserve"],
        customerGovernmentReserve: ar["Government Reserve"],
        customerForeignReserve: ar["Foreign Reserve"],
        customerContraReserve: ar["Contra Reserve"],
        customerNBARReserve: ar["NBAR Reserve"],
        customerConcentration: ar["Concentration"],
        examId: examId,
      });
    }
    const patchedExam = await Exam.query().patchAndFetchById(examId, {
      examDate: exam.examDate,
      examNetEligible: examTotals.examNetEligible,
      examCurrent: examTotals.examCurrent,
      exam30Days: examTotals.exam30Days,
      exam60Days: examTotals.exam60Days,
      exam90Days: examTotals.exam90Days,
      exam120Days: examTotals.exam120Days,
      examTotal: examTotals.examTotal,
      examGreaterThan90: examTotals.examGreaterThan90,
      examCAReserve: examTotals.examCAReserve,
      examACReserve: examTotals.examACReserve,
      examIntercompanyReserve: examTotals.examIntercompanyReserve,
      examForeignReserve: examTotals.examForeignReserve,
      examContraReserve: examTotals.examContraReserve,
      examGovernmentReserve: examTotals.examGovernmentReserve,
      examNBARReserve: examTotals.examNBARReserve,
      examineeId: exam.examineeId,
    });
    return res.status(201).json({ examinee: patchedExam });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default examsRouter;
