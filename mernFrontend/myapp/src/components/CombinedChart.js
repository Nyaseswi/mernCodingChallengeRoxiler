import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CombinedChart = ({ month }) => {
    const [combinedData, setCombinedData] = useState({ transactions: [], statistics: {}, barChart: [], pieChart: [] });

    useEffect(() => {
        const fetchCombinedData = async () => {
            const response = await axios.get(`http://localhost:5000/api/combined/${month}`);
            setCombinedData(response.data);
        };
        fetchCombinedData();
    }, [month]);

    const statistics = combinedData.statistics || {};

    return (
        <div>
            <h3>Combined Data for {month}</h3>
            <div>Total Sales Amount: {statistics.totalAmount}</div>
            <div>Total Sold Items: {statistics.totalSold}</div>
            <div>Total Not Sold Items: {statistics.totalNotSold}</div>
            <div>
                <h4>Bar Chart</h4>
                {combinedData.barChart.map((item) => (
                    <div key={item.range}>{item.range}: {item.count}</div>
                ))}
            </div>
            <div>
                <h4>Pie Chart</h4>
                {combinedData.pieChart.map((item) => (
                    <div key={item._id}>{item._id}: {item.count}</div>
                ))}
            </div>
        </div>
    );
};

export default CombinedChart;
