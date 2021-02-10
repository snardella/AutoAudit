import FuzzySet from "fuzzyset.js";

let matchupAddresses = (customerList, addressList) => {
  const states = [
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY",
  ];
  for (let i = 0; i < customerList.length; i++) {
    let addressHighScore = 0;
    for (let j = 0; j < addressList.length; j++) {
      let a = FuzzySet([customerList[i]["Customer Name"]]);
      if (a.get(addressList[j]["Customer Name"]) != null) {
        console.log(
          a.get(addressList[j]["Customer Name"]) + "--AND--" + addressList[j]["Customer Name"]
        );
      }
      if (
        a.get(addressList[j]["Customer Name"]) &&
        a.get(addressList[j]["Customer Name"])[0][0] >= 0.7 &&
        a.get(addressList[j]["Customer Name"])[0][0] > addressHighScore &&
        addressList[j]["State"] != undefined
      ) {
        if (a.get(addressList[j]["Customer Name"])[0][0] < 0.8) {
          customerList[i]["Address Score"] = "Warning";
        } else {
          customerList[i]["Address Score"] = "";
        }
        addressHighScore = a.get(addressList[j]["Customer Name"])[0][0];
        customerList[i]["State"] = addressList[j]["State"];
        customerList[i][
          "Address Source"
        ] = `The imported spreadsheet record we pulled from is: ${addressList[j]["Customer Name"]}`;
        if (!states.includes(customerList[i]["State"])) {
          customerList[i]["Foreign"] = true;
        } else {
          customerList[i]["Foreign"] = false;
        }
      }
    }
    if (!customerList[i]["State"]) {
      customerList[i]["State"] = "No State Found";
    }
  }
  return customerList;
};

export default matchupAddresses;
