let findGovernmentAR = (customerList, governmentKeywordList) => {
  let governmentKeywordListArray = governmentKeywordList.split(";")
  /* for (let h = 0; h < governmentKeywordListArray.length; h++) {
    governmentKeywordListArray[h] = governmentKeywordListArray[h].trim()
  } */

  if (governmentKeywordListArray != false) {
    for (let i = 0; i < customerList.length; i++) {
      customerList[i]["Government"] = false
      for (let j = 0; j < governmentKeywordListArray.length; j++) {
        if (governmentKeywordListArray[j] != "") {
          let re = new RegExp(governmentKeywordListArray[j], "i")
          if (re.test(customerList[i]["Customer Name"])) {
            customerList[i]["Government"] = true
            customerList[i]["Government Reserve"] = customerList[i]["Total"]
          }
        }
      }
    }
  }
  return customerList
}

export default findGovernmentAR
