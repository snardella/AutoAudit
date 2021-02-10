import FuzzySet from "fuzzyset.js";

let matchupAccountsPayable = (customerList, accountsPayableList) => {
  for (let i = 0; i < customerList.length; i++) {
    let accountsPayableHighScore = 0;
    for (let j = 0; j < accountsPayableList.length; j++) {
      let a = FuzzySet([customerList[i]["Customer Name"]]);
      if (a.get(accountsPayableList[j]["Customer Name"]) != null) {
        console.log(
          a.get(accountsPayableList[j]["Customer Name"]) +
            "--AND--" +
            accountsPayableList[j]["Customer Name"]
        );
      }
      if (
        a.get(accountsPayableList[j]["Customer Name"]) &&
        a.get(accountsPayableList[j]["Customer Name"])[0][0] >= 0.7 &&
        a.get(accountsPayableList[j]["Customer Name"])[0][0] > accountsPayableHighScore &&
        accountsPayableList[j]["Amount"] != undefined
      ) {
        if (a.get(accountsPayableList[j]["Customer Name"])[0][0] < 0.8) {
          customerList[i]["AP Score"] = "Warning";
        } else {
          customerList[i]["AP Score"] = "";
        }
        accountsPayableHighScore = a.get(accountsPayableList[j]["Customer Name"])[0][0];
        customerList[i]["Contra"] = true;
        customerList[i]["Contra Reserve"] = accountsPayableList[j]["Amount"];
        customerList[i][
          "Accounts Payable Source"
        ] = `The imported spreadsheet record we pulled from is: ${accountsPayableList[j]["Customer Name"]}`;
      }
    }
    if (!customerList[i]["Contra"]) {
      customerList[i]["Contra"] = false;
      customerList[i]["Contra Reserve"] = 0;
    }
  }
  return customerList;
};

export default matchupAccountsPayable;
