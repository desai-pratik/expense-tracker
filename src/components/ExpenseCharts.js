import React from "react";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Charts = ({ expenses, filteredExpenses }) => {
  // Function to prepare data for the line chart
  const getMonthlyData = () => {
    const monthlyData = {};
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString("default", { month: "long", year: "numeric" });
      monthlyData[month] = (monthlyData[month] || 0) + parseFloat(expense.amount);
    });

    const labels = Object.keys(monthlyData);
    const data = Object.values(monthlyData);

    return { labels, data };
  };

  const getCategoryData = () => {
    const categoryData = {};
    expenses.forEach((expense) => {
      categoryData[expense.category] = (categoryData[expense.category] || 0) + parseFloat(expense.amount);
    });

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    return { labels, data };
  };

  const { labels: monthlyLabels, data: monthlyData } = getMonthlyData();
  const { labels: categoryLabels, data: categoryData } = getCategoryData();

  const lineChartData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Expenses",
        data: monthlyData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const pieChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Categories",
        data: categoryData,
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-9 mb-4">
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">Monthly Expenses</h2>
        <div style={{ width: "100%", height: "300px" }}>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-2">Category Breakdown</h2>
        <div style={{ width: '100%', height: '300px' }}>
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
