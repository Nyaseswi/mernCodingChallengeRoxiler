import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
    const [stats, setStats] = useState({ totalAmount: 0, totalSold: 0, totalNotSold: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const response = await axios.get(`http://localhost:5000/api/statistics/${month}`);
            setStats(response.data);
        };
        fetchStats();
    }, [month]);

    return (
        <div>
            <h3>Statistics for {month}</h3>
            <div>Total Sales Amount: {stats.totalAmount}</div>
            <div>Total Sold Items: {stats.totalSold}</div>
            <div>Total Not Sold Items: {stats.totalNotSold}</div>
        </div>
    );
};

export default Statistics;
