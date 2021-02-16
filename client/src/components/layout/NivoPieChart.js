import { ResponsivePie } from "@nivo/pie";
import React from "react";

const MyResponsivePie = (props) => {
  let data = props.examTotals;
  let formattedData = [
    {
      id: "examCurrent",
      value: data.examCurrent,
    },
    {
      id: "exam30Days",
      value: data.exam30Days,
    },
    {
      id: "exam60Days",
      value: data.exam60Days,
    },
    {
      id: "exam90Days",
      value: data.exam90Days,
    },
    {
      id: "exam120Days",
      value: data.exam120Days,
    },
  ];

  return (
    <ResponsivePie
      data={formattedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: "color" }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "examCurrent",
          },
          id: "dots",
        },
        {
          match: {
            id: "exam30Days",
          },
          id: "dots",
        },
        {
          match: {
            id: "exam6Days",
          },
          id: "dots",
        },
        {
          match: {
            id: "exam90Days",
          },
          id: "dots",
        },
        {
          match: {
            id: "exam120Days",
          },
          id: "dots",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default MyResponsivePie;
