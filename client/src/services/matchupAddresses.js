let matchupAddresses = (customerList, addressList) => {
  let customerListWithState = []
  let states = [
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
    "PR",
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
  ]
  for (let i = 0; i < customerList.length; i++) {
    for (let j = 0; j < addressList.length; j++) {
      if (customerList[i]["Customer Name"] == addressList[j]["Customer Name"]) {
        customerList[i]["State"] = addressList[j]["State"]
        if (!states.includes(customerList[i]["State"])) {
          customerList[i]["Foreign"] = true
          customerList[i]["Foreign Amount"] = customerList[i]["Total"]
        } else {
          customerList[i]["Foreign"] = false
          customerList[i]["Foreign Amount"] = 0
        }
      }
    }
  }
  return customerList
}

export default matchupAddresses
