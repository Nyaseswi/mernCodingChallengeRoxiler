import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = ({ month, search, setSearch }) => {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get(`http://localhost:5000/api/transactions`, {
                params: {
                    month,
                    search,
                    page,
                    perPage: 10,
                },
            });
            setTransactions(response.data);
        };
        fetchTransactions();
    }, [month, search, page]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search transactions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction._id}>
                            <td>{transaction.title}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.price}</td>
                            <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
            <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
        </div>
    );
};

export default TransactionsTable;
