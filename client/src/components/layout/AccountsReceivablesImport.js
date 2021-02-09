import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import CustomerItem from "./CustomerItem.js";
import matchupAddresses from "../../services/matchupAddresses.js";
import matchupAccountsPayable from "../../services/matchupAccountsPayable.js";
import findGovernmentAR from "../../services/findGovernmentAR.js";
import findIntercompanyAR from "../../services/findIntercompanyAR.js";
import calculateWaterfall from "../../services/calculateWaterFall.js";
import ExamTotals from "./ExamTotals.js";

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
  const [addressRecords, setAddressRecords] = useState([]);
  const [accountsPayableRecords, setAccountsPayableRecords] = useState([]);
  const [keywords, setKeywords] = useState({
    government: [],
    intercompany: [],
  });

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
      console.log(d);
      const columnNames = [];
      console.log(Object.entries(d));
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
      console.log(d);
      const columnNames = [];
      console.log(Object.entries(d));
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
      console.log(d);
      const columnNames = [];
      console.log(Object.entries(d));

      setAccountsPayableRecords(d);
    });
  };

  const fieldCleaner = (customerRecord) => {
    Object.keys(customerRecord).map(function (key, index) {
      if (
        typeof customerRecord[key] != "number" &&
        typeof customerRecord[key] != "boolean" &&
        key != "Customer Name"
      ) {
        customerRecord[key] = customerRecord[key].replace("$", "");
        customerRecord[key] = customerRecord[key].trim();
        customerRecord[key] = customerRecord[key].replace("-", "");
        if (!customerRecord[key]) {
          customerRecord[key] = 0;
        }
      }
    });
    return customerRecord;
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

  const triggerWaterfall = async (event) => {
    event.preventDefault();
    let customerListWaterfall = await calculateWaterfall(customerRecords);
    setCustomerRecords([]);
    setCustomerRecords(customerListWaterfall[0]);
    setExamTotals(customerListWaterfall[1]);
  };

  let allTheCustomers = customerRecords.map((customer) => {
    return <CustomerItem key={customer["id"]} customer={customer} />;
  });

  return (
    <div>
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
      <input type="button" value="Match Addresses" onClick={assignAddresses} />
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
      <input type="button" value="Match A/P" onClick={assignAccountsPayable} />
      <label>
        Government Keywords (separate by ;)
        <textarea
          name="government"
          onChange={handleInputChange}
          value={keywords.government}
          rows="1"
        ></textarea>
      </label>
      <input type="button" value="Match Government Keywords" onClick={assignGovernment} />
      <label>
        Intercompany Keywords (separate by ;)
        <textarea
          name="intercompany"
          onChange={handleInputChange}
          value={keywords.intercompany}
          rows="1"
        ></textarea>
      </label>
      <input type="button" value="Match Intercompany Keywords" onClick={assignIntercompany} />
      <input type="button" value="Calculate Waterfall" onClick={triggerWaterfall} />
      <table className="stacked">
        <thead>
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
      <table className="stacked">
        <thead>
          <tr>
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
            <th width="200">Contra</th>
          </tr>
        </thead>
        <tbody>{allTheCustomers}</tbody>
      </table>
    </div>
  );
};

export default AccountsReceivableImport;
