let findGovernmentAR = (customerList, governmentKeywordList) => {
  let governmentKeywordListArray = governmentKeywordList.split(";");
  governmentKeywordListArray = governmentKeywordListArray.filter((keyword) => {
    return keyword != "";
  });
  if (governmentKeywordListArray.length != 0) {
    for (let i = 0; i < customerList.length; i++) {
      customerList[i]["Government"] = false;
      for (let j = 0; j < governmentKeywordListArray.length; j++) {
        if (governmentKeywordListArray[j] != "") {
          let re = new RegExp(governmentKeywordListArray[j], "i");
          if (re.test(customerList[i]["Customer Name"])) {
            customerList[i]["Government"] = true;
          }
        }
      }
    }
  }
  return customerList;
};

export default findGovernmentAR;
