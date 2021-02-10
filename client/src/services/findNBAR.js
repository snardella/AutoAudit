let findNBAR = (customerList, NBARKeywordList) => {
  let NBARKeywordListArray = NBARKeywordList.split(";");
  NBARKeywordListArray = NBARKeywordListArray.filter((keyword) => {
    return keyword != "";
  });
  if (NBARKeywordListArray.length != 0) {
    for (let i = 0; i < customerList.length; i++) {
      customerList[i]["NBAR"] = false;
      for (let j = 0; j < NBARKeywordListArray.length; j++) {
        if (NBARKeywordListArray[j] != "") {
          let re = new RegExp(NBARKeywordListArray[j], "i");
          debugger;
          if (re.test(customerList[i]["State"])) {
            customerList[i]["NBAR"] = true;
          }
        }
      }
    }
  }
  return customerList;
};

export default findNBAR;
