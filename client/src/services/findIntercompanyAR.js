let findIntercompanyAR = (customerList, intercompanyKeywordList) => {
  let intercompanyKeywordListArray = intercompanyKeywordList.split(";");
  intercompanyKeywordListArray = intercompanyKeywordListArray.filter((keyword) => {
    return keyword != "";
  });
  if (intercompanyKeywordListArray.length != 0) {
    for (let i = 0; i < customerList.length; i++) {
      customerList[i]["Intercompany"] = false;
      for (let j = 0; j < intercompanyKeywordListArray.length; j++) {
        let re = new RegExp(intercompanyKeywordListArray[j], "i");
        if (re.test(customerList[i]["Customer Name"])) {
          customerList[i]["Intercompany"] = true;
        }
      }
    }
  }
  return customerList;
};

export default findIntercompanyAR;
