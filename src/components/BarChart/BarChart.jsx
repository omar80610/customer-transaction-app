import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useDataContext } from "../Context/DataContext";
import { Dropdown } from "primereact/dropdown";

const CustomerTransactionChart = () => {
  const { customers, transactions, selectedCustomerId, setSelectedCustomerId } = useDataContext();
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    if (selectedCustomerId !== null) {
      const customerTransactions = transactions.filter(transaction => transaction.customer_id === selectedCustomerId.id);
      const labels = [...new Set(customerTransactions.map(transaction => transaction.date))];
      const data = labels.map(label =>
        customerTransactions
          .filter(transaction => transaction.date === label)
          .reduce((sum, transaction) => sum + transaction.amount, 0)
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Transaction Amount",
            data,
            backgroundColor: "#405D72",
            borderColor: "rgba(240, 188, 116, 1)",
            borderWidth: 1,
          },
        ],
      });

      setChartOptions({
        responsive: true, // Ensures chart adapts to different screen sizes
        maintainAspectRatio: false, // Allows chart to adjust height for better mobile view
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: `Transactions for Customer ${selectedCustomerId.name}`,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Amount",
            },
          },
        },
      });
    }
  }, [selectedCustomerId, transactions]);

  const onCustomerChange = (e) => {
    setSelectedCustomerId(e.value);
  };

  return (
    <div className="card" style={{ backgroundColor: "#F7E7DC", padding: "20px" }}>
      <Dropdown
        value={selectedCustomerId}
        options={customers}
        onChange={onCustomerChange}
        optionLabel="name"
        placeholder="Select a Customer"
        className="w-full mb-4" 
      />
      {selectedCustomerId !== null && (
        <Chart type="bar" data={chartData} options={chartOptions} className="chart" style={{ height: "400px" }} /> 
      )}
    </div>
  );
};

export default CustomerTransactionChart;
