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
    } else if (key == "Customer Name") {
      customerRecord[key] = customerRecord[key].replace("Subtotal", "");
      customerRecord[key] = customerRecord[key].trim();
    }
  });
  return customerRecord;
};

export default fieldCleaner;
