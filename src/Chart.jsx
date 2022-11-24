import { React, useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

const Chart = (props) => {
  const dataMock = [
    // FFDE8F
    // F0BE45
    // 936800
    // color: "#594000",
    {
      title: "High stuff turnover",
      value: props.highStaffTurnOver,
      color: "#916800",
    },

    {
      title: "Employee Disengagement",
      value: props.employeeDisengagement,
      color: "#AF7E03",
    },
    {
      title: "Indecision",
      value: props.indecision,
      color: "#EFBD44",
    },

    {
      title: "Ineffective meetings",
      value: props.ineffectiveMeetings,
      color: "#594000",
    },
    //
    {
      title: "Lack of communication",
      value: props.lackOfCommunication,
      color: "#D5B26E",
    },
    {
      title: "Poor customer satisfaction",
      value: props.poorCustomerSatisfaction,
      color: "#594000",
    },

    {
      title: "Not Investing In Team ",
      value: props.notInvestingInTeam,
      color: "#CFA12C",
    },
  ];

  return (
    <div className="m-5">
      <PieChart
        data={dataMock}
        // label={({ dataEntry }) => {
        //     return dataEntry.value+"% "+dataEntry.title;
        // }}
        // style={{ width: "900px", height: "450px" }}
        style={{ maxHeight: "500px" }}
        // className="col-6"
        label={({ x, y, dx, dy, dataEntry }) => (
          <text
            key={dataEntry.title}
            x={x}
            y={y}
            dx={dx}
            dy={dy}
            dominantBaseline="central"
            textAnchor="middle"
            style={{
              pointerEvents: "none",
              // fontSize: "5px",
              color: "#FFFFFF",
              // dataEntry.color
            }}
          >
            {dataEntry.value > 0 && (
              <tspan
                x={x}
                y={y}
                dx={dx}
                // dy={dy}
                dy={dy < -10 ? dy + 1 : dy - 5}
                style={{ fontSize: "4px", color: "#f0be45" }}
              >{`${Math.round(dataEntry.value)}%`}</tspan>
            )}
            {dataEntry.value > 0 && (
              <tspan
                x={x}
                y={y}
                // dx={dx}
                // dy={dy}
                dx={dx < 10 ? dx - 5 : dx + 5}
                dy={dy < -10 ? dy + 5 : dy - 2}
                style={{ fontSize: "3px" }}
              >
                {dataEntry.title}
              </tspan>
            )}
          </text>
        )}
        labelStyle={(index) => ({
          fill: dataMock[index].color,
          fontSize: "5px",
          fontFamily: "sans-serif",
        })}
        radius={35}
        labelPosition={145}
        lineWidth={25}
        // rounded
      ></PieChart>
    </div>
  );
};

export default Chart;
