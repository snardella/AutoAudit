let findIntercompanyAR = (customerList, intercompanyKeywordList) => {
  let intercompanyKeywordListArray = intercompanyKeywordList.split(";")
  for (let h = 0; h < intercompanyKeywordListArray.length; h++) {
    intercompanyKeywordListArray[h] = intercompanyKeywordListArray[h].trim()
  }
  if (intercompanyKeywordListArray != false) {
    for (let i = 0; i < customerList.length; i++) {
      customerList[i]["Intercompany"] = false
      for (let j = 0; j < intercompanyKeywordListArray.length; j++) {
        let re = new RegExp(intercompanyKeywordListArray[j], "i")
        if (re.test(customerList[i]["Customer Name"])) {
          customerList[i]["Intercompany"] = true
          customerList[i]["Intercompany Amount"] = intercompanyKeywordListArray["Amount"]
        } else {
          customerList[i]["Intercompany"] = false
          customerList[i]["Intercompany Amount"] = 0
        }
      }
    }
  }

  return customerList
}

export default findIntercompanyAR
