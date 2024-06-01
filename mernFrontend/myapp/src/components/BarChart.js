import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ month }) => {
    const [data, setData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/bar-chart/${month}`);
            setData(response.data);
        };
        fetchData();
    }, [month]);

    useEffect(() => {
        const chartInstance = chartRef.current?.chartInstance;

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []);

    const chartData = {
        labels: data.map((item) => item.range),
        datasets: [
            {
                label: '# of Items',
                data: data.map((item) => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <div>
            <h3>Bar Chart for {month}</h3>
            <Bar ref={chartRef} data={chartData} />
        </div>
    );
};

export default BarChart;
