import React, { useState, useEffect } from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
} from "@fluentui/react";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
import "office-ui-fabric-react/dist/css/fabric.css";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Announced } from "office-ui-fabric-react/lib/Announced";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";

const classNames = mergeStyleSets({
  table: {
    margin: "auto",
  },
});

const operations = [
  {
    from: "5",
    to: "5",
    amount: "5",
    date: "5",
  },
  {
    from: "2",
    to: "2",
    amount: "2",
    date: "2",
  },
  {
    from: "3",
    to: "3",
    amount: "3",
    date: "3",
  },
  {
    from: "4",
    to: "4",
    amount: "4",
    date: "4",
  },
  {
    from: "23",
    to: "0980 9808 8200 7680",
    amount: "$6 350",
    date: "17-05-2020",
  },
  {
    from: "13",
    to: "0980 9808 8200 7680",
    amount: "$1 510",
    date: "20-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 010",
    date: "19-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 350",
    date: "18-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 900",
    date: "18-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$6 350",
    date: "17-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 510",
    date: "20-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 010",
    date: "19-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 350",
    date: "18-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 900",
    date: "18-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$6 350",
    date: "17-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 510",
    date: "20-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 010",
    date: "19-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 350",
    date: "18-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$1 900",
    date: "18-05-2020",
  },
  {
    from: "0000 0284 7529 4751 8475",
    to: "0980 9808 8200 7680",
    amount: "$6 350",
    date: "17-05-2020",
  },
];

const OperationsTable = () => {
  const [data, setData] = useState(operations);
  const [columnData, setColumnData] = useState([]);

  useEffect(() => {
    setColumnData(columns);
  }, []);

  const handleColumnClick = (event, column) => {
    let columnName = column.fieldName;
    debugger;
    columnData[0].isSortedDescending = !columnData[0].isSortedDescending;
    //let sortedList = [...data];
    let sortedList;
    debugger;
    if (columnData[0].isSortedDescending) {
      sortedList = [...data].sort(ascSorter(columnName));
    } else {
      sortedList = [...data].sort(descSorter(columnName));
    }

    setData(sortedList);
  };

  function ascSorter(prop) {
    return function (a, b) {
      return a[prop] - b[prop];
    };
  }

  function descSorter(prop) {
    return function (a, b) {
      return b[prop] - a[prop];
    };
  }
  const columns = [
    {
      key: "column1",
      name: "From",
      fieldName: "from",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      isSortedDescending: false,
      onColumnClick: handleColumnClick,
    },
    {
      key: "column2",
      name: "To",
      fieldName: "to",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
      isSortedDescending: false,
      onColumnClick: handleColumnClick,
    },
    {
      key: "column3",
      name: "Amount",
      fieldName: "amount",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
    {
      key: "column4",
      name: "Date",
      fieldName: "date",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
  ];

  return (
    <div data-is-scrollable={true}>
      <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
        <DetailsList items={data} columns={columns} selectionMode={0} />
      </div>
    </div>
  );
};

export default OperationsTable;
