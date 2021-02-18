import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostedCustomerItem from "../layout/PostedCustomerItem.js";
import ExamTotals from "../layout/ExamTotals.js";
import NivoBarChart from "../layout/NivoBarChart.js";
import NivoPieChart from "../layout/NivoPieChart.js";
import { HashLink } from "react-router-hash-link";

const ExamShow = (props) => {
  const [examinee, setExaminee] = useState({
    examineeName: "",
    industryType: "",
    exams: [],
  });
  const [errors, setErrors] = useState([]);
  const [exam, setExam] = useState([]);
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
    return <PostedCustomerItem key={ar["id"]} customer={ar} />;
  });

  let dateDisplay = new Date(exam.examDate);
  dateDisplay = `${
    dateDisplay.getMonth() + 1
  }/${dateDisplay.getDate()}/${dateDisplay.getFullYear()}`;

  return (
    <div className="tile-container" id="top">
      <div>
        <h1>Exam For: {examinee.examineeName}</h1>
        <h2>Date: {dateDisplay}</h2>
        {accountsReceivables.length == 0 && (
          <Link to={`/importar/${exam.examId}`}>
            <h3>Import Accounts Receivable</h3>
          </Link>
        )}
      </div>
      {accountsReceivables.length != 0 && (
        <div>
          <h2>
            <HashLink smooth to="#charts">
              Goto Charts
            </HashLink>
          </h2>
          <div>
            <h2>Exam Totals</h2>
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
            <h2>Accounts Receivables</h2>
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
                  <th width="200">Intercompany Reserve</th>
                  <th width="200">Foreign Reserve</th>
                  <th width="200">Contra Reserve</th>
                  <th width="200">Government Reserve</th>
                  <th width="200">NBAR Reserve</th>
                  <th width="200">Net Eligible</th>
                  <th width="200">Concentration Reserve</th>
                </tr>
              </thead>
              <tbody>{allTheCustomers}</tbody>
            </table>
            <div className="chart" id="charts">
              <NivoBarChart ar={accountsReceivables} />
            </div>
            <div className="chart">
              <NivoPieChart examTotals={exam} />
            </div>
          </div>
          <HashLink smooth to="#top">
            Back to Top
          </HashLink>
        </div>
      )}
    </div>
  );
};
export default ExamShow;
