import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "@fluentui/react";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import "office-ui-fabric-react/dist/css/fabric.css";

import CustomerItem from "./CustomerItem.js";
import matchupAddresses from "../../services/matchupAddresses.js";
import matchupAccountsPayable from "../../services/matchupAccountsPayable.js";
import findGovernmentAR from "../../services/findGovernmentAR.js";
import findIntercompanyAR from "../../services/findIntercompanyAR.js";
import calculateWaterfall from "../../services/calculateWaterFall.js";
import fieldCleaner from "../../services/fieldCleaner.js";
import ExamTotals from "./ExamTotals.js";
import findNBAR from "../../services/findNBAR.js";
import translateServerErrors from "../../services/translateServerErrors.js";
import TagsInput from "./TagsInput";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AccountsReceivableImport = (props) => {
  const [customerRecords, setCustomerRecords] = useState([]);
  const [examTotals, setExamTotals] = useState({
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
  });
  const [exam, setExam] = useState([]);
  const [addressRecords, setAddressRecords] = useState([]);
  const [accountsPayableRecords, setAccountsPayableRecords] = useState([]);
  const [keywords, setKeywords] = useState({
    government: [],
    intercompany: [],
    nbar: [],
  });
  const [examinee, setExaminee] = useState({ examineeName: "", industryType: "" });
  const [errors, setErrors] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const selectedTags = (tags) => {
    setKeywords({
      ...keywords,
      [event.target.name]: tags,
    });
  };

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
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const classNames = mergeStyleSets({
    table: {
      margin: "auto",
    },
  });

  useEffect(() => {
    getExam();
  }, []);

  const handleColumnClick = (event, column) => {
    let columnName = column.fieldName;
    columnData[0].isSortedDescending = !columnData[0].isSortedDescending;
    //let sortedList = [...data];
    let sortedList;
    if (columnData[0].isSortedDescending) {
      sortedList = [...data].sort(ascSorter(columnName));
    } else {
      sortedList = [...data].sort(descSorter(columnName));
    }

    setData(sortedList);
  };

  function ascSorter(prop) {
    return function (a, b) {
      return a[prop] - b[prop];
    };
  }

  function descSorter(prop) {
    return function (a, b) {
      return b[prop] - a[prop];
    };
  }

  const columns = [
    {
      key: "column1",
      name: "From",
      fieldName: "from",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      isSortedDescending: false,
      onColumnClick: handleColumnClick,
    },
    {
      key: "column2",
      name: "To",
      fieldName: "to",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      isSortedDescending: false,
      onColumnClick: handleColumnClick,
    },
    {
      key: "column3",
      name: "Amount",
      fieldName: "amount",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column4",
      name: "Date",
      fieldName: "date",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
  ];

  const importAccountsReceivable = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      const columnNames = [];
      let id = 1;
      d.forEach((customerRecord) => {
        customerRecord["id"] = id;
        id++;
        return fieldCleaner(customerRecord);
      });
      setCustomerRecords(d);
    });
  };

  const importAddresses = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      const columnNames = [];
      setAddressRecords(d);
    });
  };

  const importAccountsPayable = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      const columnNames = [];
      setAccountsPayableRecords(d);
    });
  };

  const postAccountsReceivable = async (customerRecords, examTotals) => {
    try {
      const examId = exam.examId;
      customerRecords[customerRecords.length] = examTotals;
      const response = await fetch(`/api/v1/exams/${examId}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(customerRecords, examTotals),
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
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const assignAddresses = async (event) => {
    event.preventDefault();
    let customerListWithAddresses = await matchupAddresses(customerRecords, addressRecords);
    setCustomerRecords([]);
    setCustomerRecords(customerListWithAddresses);
  };

  const assignAccountsPayable = async (event) => {
    event.preventDefault();
    let customerListWithAccountsPayable = await matchupAccountsPayable(
      customerRecords,
      accountsPayableRecords
    );
    setCustomerRecords([]);
    setCustomerRecords(customerListWithAccountsPayable);
  };

  const assignGovernment = async (event) => {
    event.preventDefault();
    let customerListWithGovernment = await findGovernmentAR(customerRecords, keywords.government);
    setCustomerRecords([]);
    setCustomerRecords(customerListWithGovernment);
  };

  const assignIntercompany = async (event) => {
    event.preventDefault();
    let customerListWithInterCompany = await findIntercompanyAR(
      customerRecords,
      keywords.intercompany
    );
    setCustomerRecords([]);
    setCustomerRecords(customerListWithInterCompany);
  };

  const handleInputChange = (event) => {
    setKeywords({
      ...keywords,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleTagChange = (name, tags) => {
    setKeywords({
      ...keywords,
      [name]: tags,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postAccountsReceivable(customerRecords, examTotals);
  };

  const triggerWaterfall = async (event) => {
    event.preventDefault();
    let customerListWaterfall = await calculateWaterfall(customerRecords);
    setCustomerRecords([]);
    setCustomerRecords(customerListWaterfall[0]);
    setExamTotals(customerListWaterfall[1]);
  };

  const assignNBAR = async (event) => {
    event.preventDefault();
    let customerListWithNBAR = await findNBAR(customerRecords, keywords.nbar);
    setCustomerRecords([]);
    setCustomerRecords(customerListWithNBAR);
  };

  let dateDisplay = new Date(exam.examDate);
  dateDisplay = `${
    dateDisplay.getMonth() + 1
  }/${dateDisplay.getDate()}/${dateDisplay.getFullYear()}`;

  let allTheCustomers = customerRecords.map((customer) => {
    return <CustomerItem key={customer["id"]} customer={customer} />;
  });

  if (shouldRedirect) {
    return <Redirect to={`/exams/${exam.examId}`} />;
  }

  return (
    <div className="page">
      <div className="import-page">
        <div>
          <h2> {examinee.examineeName}</h2>
        </div>
        <h3>{dateDisplay}</h3>
        <div className="in-a-row">
          <label>
            Customer A/R:
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                importAccountsReceivable(file);
              }}
            />
          </label>

          <label>
            Addresses:
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                importAddresses(file);
              }}
            />
          </label>

          <label>
            Customer A/P:
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                importAccountsPayable(file);
              }}
            />
          </label>
        </div>
        <input
          className="button small medium-only-expanded"
          href="#"
          type="button"
          value="Match Addresses"
          onClick={assignAddresses}
        />
        <input
          className="button small"
          type="button"
          value="Match A/P"
          onClick={assignAccountsPayable}
        />

        <label>
          Government Keywords (separate by ;)
          <textarea
            name="government"
            onChange={handleInputChange}
            value={keywords.government}
            rows="1"
          ></textarea>
        </label>
        <input
          type="button"
          className="button small"
          value="Match Government Keywords"
          onClick={assignGovernment}
        />
        <label>
          Intercompany Keywords (separate by ;)
          <textarea
            name="intercompany"
            onChange={handleInputChange}
            value={keywords.intercompany}
            rows="1"
          ></textarea>
        </label>
        <input
          type="button"
          className="button small"
          value="Match Intercompany Keywords"
          onClick={assignIntercompany}
        />
        <label>
          NBAR Keywords (separate by ;)
          <textarea
            name="nbar"
            onChange={handleInputChange}
            value={keywords.nbar}
            rows="1"
          ></textarea>
        </label>
        <input
          type="button"
          className="button small"
          value="Match NBAR Keywords"
          onClick={assignNBAR}
        />
        <input
          type="button"
          className="button small"
          value="Calculate Waterfall"
          onClick={triggerWaterfall}
        />
      </div>
      <div>
        <div className="table-horizontal-scroll">
          <table className="fixed_header">
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
              <ExamTotals examTotals={examTotals} />
            </tbody>
          </table>
        </div>
        <div className="table-vertical-scroll">
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

        <input
          type="button"
          className="button small"
          value="Submit Accounts Receivable"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AccountsReceivableImport;

{
  /* <div data-is-scrollable={true}>
        <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
          <DetailsList items={customerRecords} columns={columns} selectionMode={0} />
        </div>
      </div> */
}
