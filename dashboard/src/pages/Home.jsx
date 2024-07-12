import React from 'react';
import './css/Home.css';
import headerImage from '../assets/images/Header.jpg';
import standardRoomImage from '../assets/images/StandardRoom.jpg';
import deluxeRoomImage from '../assets/images/Deluxe.jpg';

export default function Home() {
    return (
        <div className="home-container">
            <header className="home-header">
                <img src={headerImage} alt="Header" className="header-image" />
                <div className="header-text">
                    <h1>Welcome to pagTURUGAN</h1>
                    <p>Your one-stop solution for hotel room management</p>
                    <div className="home-buttons">
                        <a href="/login" className="home-button">Login</a>
                        <a href="/signup" className="home-button">Sign Up</a>
                    </div>
                </div>
            </header>
            
            <section className="rooms">
                <h2>Rooms</h2>
                <div className="room-cards">
                    <div className="room-card">
                        <img src={standardRoomImage} alt="Standard Room" />
                        <h3>Standard Room</h3>
                        <p>Comfortable and affordable standard rooms.</p>
                    </div>
                    <div className="room-card">
                        <img src={deluxeRoomImage} alt="Deluxe Room" />
                        <h3>Deluxe Room</h3>
                        <p>Spacious and luxurious deluxe rooms.</p>
                    </div>
                    {/* Add more room cards as needed */}
                </div>
            </section>

            <section className="socials">
                <h2>Follow Us</h2>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    {/* Add more social icons as needed */}
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 pagTURUGAN. All rights reserved.</p>
            </footer>
        </div>
    );
}
