import React, { useState, useEffect } from "react";

const CustomerItem = (props) => {
  const [toggleFields, setToggleFields] = useState({});
  const [isShown, setIsShown] = useState({
    Address: false,
    "Contra Reserve": false,
  });

  useEffect(() => {
    setToggleFields({
      ...toggleFields,
      Intercompany: props.customer["Intercompany"],
      Foreign: props.customer["Foreign"],
      Government: props.customer["Government"],
      NBAR: props.customer["NBAR"],
      Contra: props.customer["Contra"],
    });
  }, []);

  let classNameColor;
  let stateClassName;
  let apClassName;

  const handleClick = (event) => {
    event.preventDefault();
    if (!toggleFields[event.currentTarget.getAttribute("name")]) {
      setToggleFields({
        ...toggleFields,
        [event.currentTarget.getAttribute("name")]: true,
      });
      props.customer[event.currentTarget.getAttribute("name")] = true;
    } else {
      setToggleFields({
        ...toggleFields,
        [event.currentTarget.getAttribute("name")]: false,
      });
      props.customer[event.currentTarget.getAttribute("name")] = false;
    }
  };

  let govtDisplay = "No";
  if (props.customer["Government"]) {
    govtDisplay = "Yes";
    classNameColor = "government";
  }

  let intercompanyDisplay = "No";
  if (props.customer["Intercompany"]) {
    intercompanyDisplay = "Yes";
    classNameColor = "intercompany";
  } else {
    props.customer["Intercompany Reserve"] = 0;
  }

  let foreignDisplay = "No";
  if (props.customer["Foreign"]) {
    foreignDisplay = "Yes";
    classNameColor = "foreign";
  } else {
    props.customer["Foreign Reserve"] = 0;
  }

  let NBARDisplay = "No";
  if (props.customer["NBAR"]) {
    NBARDisplay = "Yes";
    classNameColor = "nbar";
  } else {
    props.customer["NBAR Reserve"] = 0;
  }

  let contraDisplay = "No";
  if (props.customer["Contra"]) {
    contraDisplay = "Yes";
    classNameColor = "contra";
  } else {
    props.customer["Contra Reserve"] = 0;
  }

  if (props.customer["Address Score"] || props.customer["State"] == "No State Found") {
    stateClassName = "warning";
  }

  if (props.customer["AP Score"] == "Warning") {
    apClassName = "warning";
  }

  return (
    <tr className={classNameColor}>
      <td>{props.customer["Customer Name"]}</td>
      <td
        onMouseEnter={(event) =>
          setIsShown({
            ...isShown,
            [event.currentTarget.getAttribute("name")]: true,
          })
        }
        onMouseLeave={(event) =>
          setIsShown({
            ...isShown,
            [event.currentTarget.getAttribute("name")]: false,
          })
        }
        className={stateClassName}
        name="Address"
      >
        {props.customer["State"]}
      </td>
      {isShown["Address"] && props.customer["Address Source"] && (
        <div className="pop-up">{props.customer["Address Source"]}</div>
      )}
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
      <td onClick={handleClick} value={props.customer["Contra"]} name="Contra">
        {contraDisplay}
      </td>
      <td
        onMouseEnter={(event) =>
          setIsShown({
            ...isShown,
            [event.currentTarget.getAttribute("name")]: true,
          })
        }
        onMouseLeave={(event) =>
          setIsShown({
            ...isShown,
            [event.currentTarget.getAttribute("name")]: false,
          })
        }
        className={apClassName}
        name="Contra Reserve"
      >
        {props.customer["Contra Reserve"]}
      </td>
      {isShown["Contra Reserve"] && props.customer["Accounts Payable Source"] && (
        <td className="pop-up">{props.customer["Accounts Payable Source"]}</td>
      )}

      <td onClick={handleClick} value={props.customer["Government"]} name="Government">
        {govtDisplay}
      </td>
      <td>${props.customer["Government Reserve"]}</td>
      <td onClick={handleClick} value={props.customer["NBAR"]} name="NBAR">
        {NBARDisplay}
      </td>
      <td>{props.customer["NBAR Reserve"]}</td>
      <td>{props.customer["Net Eligible"]}</td>
      <td>{props.customer["Concentration"]}</td>
    </tr>
  );
};

export default CustomerItem;
