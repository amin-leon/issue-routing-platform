import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

function IssuesInProgress() {
  const [progressIssues, setProgressIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:8080/issue/all-issues');
        setProgressIssues(response.data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, []);

  // Calculate category occurrence
  const categoryCounts = progressIssues.reduce((acc, issue) => {
    acc[issue.category] = acc[issue.category] ? acc[issue.category] + 1 : 1;
    return acc;
  }, {});

  // Calculate total number of issues
  const totalIssues = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);

  // Calculate percentages
  const percentageData = Object.keys(categoryCounts).map((category) => {
    const percentage = ((categoryCounts[category] / totalIssues) * 100).toFixed(2);
    return { category, percentage };
  });

  // Sort categories by occurrence
  const sortedCategories = percentageData.sort((a, b) => b.percentage - a.percentage);

  const data = {
    labels: sortedCategories.map((item) => item.category),
    datasets: [
      {
        label: 'Category Statistics',
        data: sortedCategories.map((item) => item.percentage),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center">Submitted Issues's Statistics</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default IssuesInProgress;
