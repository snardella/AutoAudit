import React, { useState, useEffect } from "react"

const CustomerItem = (props) => {
  const [toggleFields, setToggleFields] = useState({})

  useEffect(() => {
    setToggleFields({
      ...toggleFields,
      Intercompany: props.customer["Intercompany"],
      Foreign: props.customer["Foreign"],
      Government: props.customer["Government"],
    })
  }, [])

  let classNameColor

  const handleClick = (event) => {
    event.preventDefault()
    if (!toggleFields[event.currentTarget.getAttribute("name")]) {
      setToggleFields({
        ...toggleFields,
        [event.currentTarget.getAttribute("name")]: true,
      })
      props.customer[event.currentTarget.getAttribute("name")] = true
    } else {
      setToggleFields({
        ...toggleFields,
        [event.currentTarget.getAttribute("name")]: false,
      })
      props.customer[event.currentTarget.getAttribute("name")] = false
    }
  }

  let govtDisplay = "No"
  if (props.customer["Government"]) {
    govtDisplay = "Yes"
    classNameColor = "government"
  }

  let intercompanyDisplay = "No"
  if (props.customer["Intercompany"]) {
    intercompanyDisplay = "Yes"
    classNameColor = "intercompany"
  }

  let foreignDisplay = "No"
  if (props.customer["Foreign"]) {
    foreignDisplay = "Yes"
    classNameColor = "foreign"
  }

  return (
    <tr className={classNameColor}>
      <td>{props.customer["Customer Name"]}</td>
      <td>{props.customer["State"]}</td>
      <td>${props.customer["Current"]}</td>
      <td>${props.customer["30 Days"]}</td>
      <td>${props.customer["60 Days"]}</td>
      <td>${props.customer["90 Days"]}</td>
      <td>${props.customer["120 Days"]}</td>
      <td>${props.customer["Total"]}</td>
      <td>${props.customer["Greater Than 90"]}</td>
      <td>{props.customer["Cross Aging %"]}</td>
      <td>${props.customer["Cross Aging Reserve"]}</td>
      <td>${props.customer["Aged Credits"]}</td>
      <td>${props.customer["Aged Credits Reserve"]}</td>
      <td onClick={handleClick} value={props.customer["Intercompany"]} name="Intercompany">
        {intercompanyDisplay}
      </td>
      <td>${props.customer["Intercompany Reserve"]}</td>
      <td onClick={handleClick} value={props.customer["Foreign"]} name="Foreign">
        {foreignDisplay}
      </td>
      <td>${props.customer["Foreign Reserve"]}</td>
      <td>{props.customer["Contra"]}</td>
      <td>${props.customer["Contra Reserve"]}</td>
      <td onClick={handleClick} value={props.customer["Government"]} name="Government">
        {govtDisplay}
      </td>
      <td>${props.customer["Government Reserve"]}</td>
      <td>NBAR</td>
      <td>{props.customer["NBAR Reserve"]}</td>
      <td>{props.customer["Net Eligible"]}</td>
      <td>{props.customer["Concentration"]}</td>
      <td>{intercompanyDisplay}</td>
      <td>${props.customer["Contra"]}</td>
    </tr>
  )
}

export default CustomerItem
