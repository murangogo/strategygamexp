import React, { useState, useEffect } from 'react';

function HistoryPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getHis = async () => {
        try {
            const response = await fetch(`/api/checkhistory`);
            const data = await response.json();
            setData(data.chessData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getHis();
    }, []);

    return (
        <div>
            <h2>历史棋局</h2>
            {
                loading ? 
                <p>加载中......</p> :
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>创建者</th>
                            <th>加入者</th>
                            <th>获胜者</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((record, index) => (
                                <tr key={index}>
                                    <td>{record.id}</td>
                                    <td>{record.creator}</td>
                                    <td>{record.partner}</td>
                                    <td>{record.winner}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>
    );
}

export default HistoryPage;
