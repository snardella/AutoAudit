const calculateWaterfall = (customerAccountsReceivables) => {
  let examNetEligible = 0;
  let examCurrent = 0;
  let exam30Days = 0;
  let exam60Days = 0;
  let exam90Days = 0;
  let exam120Days = 0;
  let examTotal = 0;
  let examGreaterThan90 = 0;
  let examCAReserve = 0;
  let examACReserve = 0;
  let examIntercompanyReserve = 0;
  let examForeignReserve = 0;
  let examContraReserve = 0;
  let examGovernmentReserve = 0;
  let examNBARReserve = 0;

  let calculatedAccountsReceivables = customerAccountsReceivables.map((cAR) => {
    cAR["Greater Than 90"] = 0;
    cAR["Cross Aging Reserve"] = 0;
    cAR["Aged Credits Reserve"] = 0;
    cAR["Intercompany Reserve"] = 0;
    cAR["Foreign Reserve"] = 0;
    if (!cAR["Contra Reserve"]) {
      cAR["Contra Reserve"] = 0;
    }
    cAR["Government Reserve"] = 0;
    cAR["NBAR Reserve"] = 0;
    cAR["Total"] =
      cAR["Current"] + cAR["30 Days"] + cAR["60 Days"] + cAR["90 Days"] + cAR["120 Days"];
    cAR["Greater Than 90"] = cAR["90 Days"] + cAR["120 Days"];

    if (cAR["Greater Than 90"] < 0) {
      cAR["Net Eligible"] = cAR["Total"] + cAR["Greater Than 90"];
    } else {
      cAR["Net Eligible"] = cAR["Total"] - cAR["Greater Than 90"];
    }

    cAR["Cross Aging %"] = cAR["Greater Than 90"] / cAR["Total"];
    if (!cAR["Cross Aging %"]) {
      cAR["Cross Aging %"] = 0;
    }

    if (cAR["Cross Aging %"] > 0.5) {
      cAR["Cross Aging Reserve"] = cAR["Net Eligible"];
      cAR["Net Eligible"] = 0;
    }

    if (cAR["Greater Than 90"] < 0) {
      cAR["Aged Credits"] = -1 * cAR["Greater Than 90"];
      if (cAR["Aged Credits"] >= cAR["Net Eligible"]) {
        cAR["Aged Credits Reserve"] = 0;
      } else {
        cAR["Aged Credits Reserve"] = cAR["Aged Credits"];
        cAR["Net Eligible"] - cAR["Aged Credits Reserve"];
      }
    }

    if (cAR["Intercompany"]) {
      cAR["Intercompany Reserve"] = cAR["Net Eligible"];
      cAR["Net Eligible"] = 0;
    }
    if (cAR["Foreign"]) {
      cAR["Foreign Reserve"] = cAR["Net Eligible"];
      cAR["Net Eligible"] = 0;
    }

    if (cAR["Contra"]) {
      cAR["Net Eligible"] -= cAR["Contra Reserve"];
    }

    if (cAR["Government"]) {
      cAR["Government Reserve"] = cAR["Net Eligible"];
      cAR["Net Eligible"] = 0;
    }

    if (cAR["NBAR"]) {
      cAR["NBAR Reserve"] = cAR["Net Eligible"];
      cAR["Net Eligible"] = 0;
    }

    examNetEligible += cAR["Net Eligible"];
    examCurrent += cAR["Current"];
    exam30Days += cAR["30 Days"];
    exam60Days += cAR["60 Days"];
    exam90Days += cAR["90 Days"];
    exam120Days += cAR["120 Days"];
    examTotal += cAR["Total"];
    examGreaterThan90 += cAR["Greater Than 90"];
    examCAReserve += cAR["Cross Aging Reserve"];
    examACReserve += cAR["Aged Credits Reserve"];
    examIntercompanyReserve += cAR["Intercompany Reserve"];
    examForeignReserve += cAR["Foreign Reserve"];
    examContraReserve += cAR["Contra Reserve"];
    examGovernmentReserve += cAR["Government Reserve"];
    examNBARReserve += cAR["NBAR Reserve"];

    return cAR;
  });

  let calculatedExamTotals = {
    examNetEligible: examNetEligible,
    examCurrent: examCurrent,
    exam30Days: exam30Days,
    exam60Days: exam60Days,
    exam90Days: exam90Days,
    exam120Days: exam120Days,
    examTotal: examTotal,
    examGreaterThan90: examGreaterThan90,
    examCAReserve: examCAReserve,
    examACReserve: examACReserve,
    examIntercompanyReserve: examIntercompanyReserve,
    examForeignReserve: examForeignReserve,
    examContraReserve: examContraReserve,
    examGovernmentReserve: examGovernmentReserve,
    examNBARReserve: examNBARReserve,
  };

  calculatedAccountsReceivables.forEach((cAR) => {
    cAR["Concentration"] = cAR["Net Eligible"] / examNetEligible;
  });

  calculatedAccountsReceivables.forEach((cAR) => {});

  return [calculatedAccountsReceivables, calculatedExamTotals];
};

export default calculateWaterfall;
