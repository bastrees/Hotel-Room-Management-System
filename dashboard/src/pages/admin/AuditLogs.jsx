import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AuditLogs.css';

const AuditLogs = () => {
    const [auditLogs, setAuditLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { VITE_HOST } = import.meta.env;

    useEffect(() => {
        fetchAuditLogs();
    }, []);

    const fetchAuditLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${VITE_HOST}/api/auditlogs`);
            if (res.data.success) {
                setAuditLogs(res.data.auditLogs);
            } else {
                setError('Failed to fetch audit logs');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            setError(`Error fetching audit logs: ${error.message}`);
            setLoading(false);
        }
    };

    return (
        <div className="audit-logs">
            <h2>Audit Logs</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Action</th>
                            <th>Details</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {auditLogs.map((log) => (
                            <tr key={log._id}>
                                <td>{log.userId?.username || 'Unknown User'}</td>
                                <td>{log.action}</td>
                                <td>{log.details}</td>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AuditLogs;
