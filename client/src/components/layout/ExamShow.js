import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerItem from "../layout/CustomerItem.js";
import ExamTotals from "../layout/ExamTotals.js";

const ExamShow = (props) => {
  const [examinee, setExaminee] = useState({
    examineeName: "",
    industryType: "",
    exams: [],
  });
  const [errors, setErrors] = useState([]);
  const [exam, setExam] = useState({
    examDate: "",
  });
  const [accountsReceivables, setAccountsReceivables] = useState([]);

  const getExam = async () => {
    const examId = props.match.params.examId;
    try {
      const response = await fetch(`/api/v1/exams/${examId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setExaminee(body.exam.examinee);
      setExam(body.exam);
      setAccountsReceivables(body.exam.accountsReceivables);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getExam();
  }, []);

  let allTheCustomers = accountsReceivables.map((ar) => {
    ar = {
      id: ar.accountsReceivableId,
      "Customer Name": ar.customerName,
      State: ar.customerState,
      Current: ar.customerCurrent,
      "30 Days": ar.customer30Days,
      "60 Days": ar.customer60Days,
      "90 Days": ar.customer90Days,
      "120 Days": ar.customer120Days,
      Total: ar.customerTotal,
      "Greater Than 90": ar.customerGreaterThan90,
      "Cross Aging %": ar.customerCAPercentage,
      "Cross Aging Reserve": ar.customerCAReserve,
      "Aged Credits Reserve": ar.customerACReserve,
      "Intercompany Reserve": ar.customerIntercompanyReserve,
      "Foreign Reserve": ar.customerForeignReserve,
      "Contra Reserve": ar.customerContraReserve,
      "NBAR Reserve": ar.customerNBARReserve,
      "Government Reserve": ar.customerGovernmentReserve,
      Concentration: ar.customerConcentration,
      "Net Eligible": ar.customerNetEligible,
    };
    return <CustomerItem key={ar["id"]} customer={ar} />;
  });

  let dateDisplay = new Date(exam.examDate);
  dateDisplay = `${
    dateDisplay.getMonth() + 1
  }/${dateDisplay.getDate()}/${dateDisplay.getFullYear()}`;

  return (
    <div className="tile-container">
      <div>
        <h1>Exam For: {examinee.examineeName}</h1>
        <h2>Date: {dateDisplay}</h2>
        <Link to={`/importar/${exam.examId}`}>
          <h3>Import Accounts Receivable</h3>
        </Link>
      </div>
      <div>
        <table className="stacked">
          <thead id="exam-total">
            <tr>
              <th width="200">Net Eligible</th>
              <th width="200">Current</th>
              <th width="200">30 Days</th>
              <th width="200">60 Days</th>
              <th width="200">90 Days</th>
              <th width="200">120 Days</th>
              <th width="200">Total</th>
              <th width="200">Greater than 90 Days</th>
              <th width="200">Cross Aging Reserve</th>
              <th width="200">Aged Credits Reserve</th>
              <th width="200">Intercompany Reserve</th>
              <th width="200">Foreign Reserve</th>
              <th width="200">Contra Reserve</th>
              <th width="200">Government Reserve</th>
              <th width="200">NBAR Reserve</th>
            </tr>
          </thead>
          <tbody>
            <ExamTotals examTotals={exam} />
          </tbody>
        </table>
      </div>
      <div>
        <table className="fixed_header">
          <thead id="exam-lines">
            <tr className="content">
              <th width="200">Customer Name</th>
              <th width="200">State</th>
              <th width="200">Current</th>
              <th width="200">30 Days</th>
              <th width="200">60 Days</th>
              <th width="200">90 Days</th>
              <th width="200">120 Days</th>
              <th width="200">Total</th>
              <th width="200">Greater than 90 Days</th>
              <th width="200">Cross Aging %</th>
              <th width="200">Cross Aging Reserve</th>
              <th width="200">Aged Credits</th>
              <th width="200">Aged Credits Reserve</th>
              <th width="200">Intercompany</th>
              <th width="200">Intercompany Reserve</th>
              <th width="200">Foreign</th>
              <th width="200">Foreign Reserve</th>
              <th width="200">Contra</th>
              <th width="200">Contra Reserve</th>
              <th width="200">Government</th>
              <th width="200">Government Reserve</th>
              <th width="200">NBAR</th>
              <th width="200">NBAR Reserve</th>
              <th width="200">Net Eligible</th>
              <th width="200">Concentration Reserve</th>
            </tr>
          </thead>
          <tbody>{allTheCustomers}</tbody>
        </table>
      </div>
    </div>
  );
};
export default ExamShow;