"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import Chart from "react-apexcharts";

function ActivityHealmap() {
  const [state, setState] = useState({
    series: [
      {
        name: "Series 1",
        data: [20, 100, 40, 30, 50, 80],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColors: "#e9e9e9",
            fill: {
              colors: ["#f8f8f8", "#fff"],
            },
          },
        },
      },
      colors: ["#FF4560"],
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColor: "#FF4560",
        strokeWidth: 2,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      xaxis: {
        categories: [
          "0-4",
          "4-8",
          "8-12",
          "12-16",
          "16-20",
          "20-24",
           
        ],
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function (val, i) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          },
        },
      },
    },
  });
  return (
    <Card className="w-[30%] textPrimaryColor bg-white border-none rounded-xl">
      <CardHeader>
        <CardTitle className="textSemiHeader font-bold">Hourly Activities</CardTitle>
      </CardHeader>
      <div className="">
        <Chart
          options={state.options}
          series={state.series}
          type="radar"
          height={290}
        />
      </div>
    </Card>
  );
}

export default ActivityHealmap;
