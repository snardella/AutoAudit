import React, { useState, useEffect } from "react";
import ExamTile from "../layout/ExamTile.js";
import NivoBarChart from "../layout/NivoBarChart.js";
import NivoPieChart from "../layout/NivoPieChart.js";
import { HashLink } from "react-router-hash-link";

const ExamList = (props) => {
  const [exams, setExams] = useState([]);
  const [accountsReceivables, setAccountsReceivables] = useState([]);

  const getExams = async () => {
    try {
      const response = await fetch("/api/v1/exams");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setExams(body.exams);
      body.exams.forEach((exam) => {
        setAccountsReceivables([...accountsReceivables], exam.accountsReceivables);
      });
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
      body.exams.examinees = body.examinees;
      setExams(body.exams);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  let examTotals = {
    exam30Days: 0,
    exam60Days: 0,
    exam90Days: 0,
    exam120Days: 0,
    examCurrent: 0,
  };

  exams.forEach((exam) => {
    examTotals.exam30Days += exam.exam30Days;
    examTotals.exam60Days += exam.exam60Days;
    examTotals.exam90Days += exam.exam90Days;
    examTotals.exam120Days += exam.exam120Days;
    examTotals.examCurrent += exam.examCurrent;
  });

  const allTheExams = exams.map((exam) => {
    return (
      <div>
        <ExamTile key={exam.examId} exam={exam} deleteExam={deleteExam} examinee={exam.examinee} />
        {exam.accountsReceivables.length != 0 && (
          <div className="small-chart">
            <h4 className="centered-text">{`Accounts Receivables for ${exam.examinee.examineeName}`}</h4>
            <NivoBarChart key={exam.examId} ar={exam.accountsReceivables} />
          </div>
        )}
        {exam.accountsReceivables.length == 0 && (
          <div>
            <h5>No Exam Data</h5>
          </div>
        )}
      </div>
    );
  });
  return (
    <div className="page">
      {exams.length != 0 && (
        <div>
          {allTheExams}
          <div className="chart" id="charts">
            <h3 className="centered-text">Totals for All Exams</h3>
            <NivoPieChart examTotals={examTotals} />
          </div>
        </div>
      )}
      {exams.length == 0 && <h3>No Exams</h3>}
    </div>
  );
};

export default ExamList;
