import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Total Request", "New", "Pending"],
  datasets: [
    {
      data: [250, 25, 125],
      backgroundColor: ["#FFB70F", "#5D92F4", "#00D0BD"],
      hoverBackgroundColor: ["#FFB70F", "#5D92F4", "#00D0BD"],
    },
  ],
};

const options = {
  legend: {
    display: false,
    labels: { fontColor: "#AAAEB3" },
  },
  cutoutPercentage: 50,
};

export default class DoughnutChart extends Component {
  render() {
    return <Doughnut data={data} options={options} height={100} />;
  }
}

