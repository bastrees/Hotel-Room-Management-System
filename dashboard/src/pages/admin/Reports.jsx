import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Reports.css';

const Reports = () => {
    const [grossSales, setGrossSales] = useState(0);
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [occupancyRates, setOccupancyRates] = useState({});
    const { VITE_HOST } = import.meta.env;

    useEffect(() => {
        fetchGrossSales(currentPage);
        fetchRoomOccupancy();
    }, [currentPage]);

    const fetchGrossSales = async (page) => {
        try {
            const res = await axios.get(`${VITE_HOST}/api/reports/gross-sales?page=${page}`);
            if (res.data.success) {
                setGrossSales(res.data.grossSales);
                setBookings(res.data.bookings);
                setTotalPages(res.data.totalPages);
            } else {
                console.error('Failed to fetch gross sales');
            }
        } catch (error) {
            console.error('Error fetching gross sales:', error);
        }
    };

    const fetchRoomOccupancy = async () => {
        try {
            const res = await axios.get(`${VITE_HOST}/api/reports/room-occupancy`);
            if (res.data.success) {
                setOccupancyRates(res.data.occupancyRates);
            } else {
                console.error('Failed to fetch room occupancy');
            }
        } catch (error) {
            console.error('Error fetching room occupancy:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const chartData = {
        labels: bookings.map(booking => new Date(booking.createdAt).toLocaleDateString()),
        datasets: [{
            label: 'Total Amount Paid',
            data: bookings.map(booking => booking.totalAmountPaid),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    };

    return (
        <div className="reports">
            <h1>Reports</h1>
            <p>Gross Sales: ${grossSales}</p>
            <div className="chart-container">
                <Bar data={chartData} />
            </div>
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
            <h2>Room Occupancy Rates</h2>
            <ul>
                {Object.keys(occupancyRates).map(type => (
                    <li key={type}>
                        <strong>{type}:</strong> {occupancyRates[type].occupied}/{occupancyRates[type].total} occupied
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reports;
