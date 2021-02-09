let matchupAccountsPayable = (customerList, accountsPayableList) => {
  for (let i = 0; i < customerList.length; i++) {
    customerList[i]["Contra"] = 0
    debugger
    for (let j = 0; j < accountsPayableList.length; j++) {
      if (customerList[i]["Customer Name"] == accountsPayableList[j]["Customer Name"]) {
        if (accountsPayableList[j]["Amount"]) {
          customerList[i]["Contra"] = accountsPayableList[j]["Amount"]
        }
      }
    }
  }

  return customerList
}

export default matchupAccountsPayable
