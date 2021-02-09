import React, { useState } from "react"

const ExamTotals = (props) => {
  return (
    <tr>
      <td>{props.examTotals.examNetEligible}</td>
      <td>{props.examTotals.examCurrent}</td>
      <td>{props.examTotals.exam30Days}</td>
      <td>{props.examTotals.exam60Days}</td>
      <td>{props.examTotals.exam90Days}</td>
      <td>{props.examTotals.exam120Days}</td>
      <td>{props.examTotals.examTotal}</td>
      <td>{props.examTotals.examGreaterThan90}</td>
      <td>{props.examTotals.examCAReserve}</td>
      <td>{props.examTotals.examACReserve}</td>
      <td>{props.examTotals.examIntercompanyReserve}</td>
      <td>{props.examTotals.examForeignReserve}</td>
      <td>{props.examTotals.examContraReserve}</td>
      <td>{props.examTotals.examGovernmentReserve}</td>
      <td>{props.examTotals.examNBARReserve}</td>
    </tr>
  )
}

export default ExamTotals
