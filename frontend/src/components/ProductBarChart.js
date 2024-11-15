// src/components/ProductBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductBarChart = ({ products }) => {
  // Prepare data for the bar chart
  const productNames = products.map((product) => product.name);
  const productQuantities = products.map((product) => product.quantity);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Product Quantities',
        data: productQuantities,
        backgroundColor: 'rgba(255, 193, 7, 0.6)', // Deep yellow with transparency
        borderColor: 'rgba(255, 193, 7, 1)', // Deep yellow solid color
        borderWidth: 1,
      },
      
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Quantities Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Products',
        },
      },
    },
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProductBarChart;