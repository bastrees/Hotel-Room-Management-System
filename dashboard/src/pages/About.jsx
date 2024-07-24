import React from 'react';
import './css/About.css';

const About = () => {
    return (
        <div className="about-container">
            <section className="about-section">
                <h2>Welcome to pagTURUGAN!</h2>
                <p>
                    At pagTURUGAN, we believe in offering a unique blend of comfort, convenience, and luxury to every guest. Our mission is to provide a seamless booking experience, ensuring that your stay is enjoyable and memorable from start to finish.
                </p>
            </section>
            <section className="about-section">
                <h2>Our Story</h2>
                <p>
                    Founded with a passion for hospitality, pagTURUGAN has grown into a trusted name in hotel room management. Our journey began with a simple idea: to create a platform that connects travelers with the perfect accommodation. Over the years, we have expanded our offerings and improved our services to meet the ever-changing needs of our guests.
                </p>
            </section>
            <section className="about-section">
                <h2>What We Offer</h2>
                <p>
                    Wide Range of Rooms: Whether you are looking for a cozy standard room, a luxurious suite, or a spacious family room, pagTURUGAN has something for everyone. Our diverse room categories cater to all preferences and budgets.
                </p>
                <p>
                    Seamless Booking: Our user-friendly platform makes it easy to search for and book rooms. With just a few clicks, you can secure your stay and look forward to a hassle-free experience.
                </p>
                <p>
                    Secure Payments: We offer secure and flexible payment options to ensure your transactions are safe and convenient. Our partnership with trusted banks guarantees that your payment process is smooth and reliable.
                </p>
                <p>
                    Customer Support: Our dedicated customer support team is always ready to assist you. Whether you have a question about your booking or need help during your stay, we are here to help.
                </p>
            </section>
            <section className="about-section">
                <h2>Our Commitment</h2>
                <p>
                    At pagTURUGAN, we are committed to providing exceptional service and creating a welcoming environment for all our guests. Our team is dedicated to ensuring that your stay is comfortable and enjoyable, with a focus on quality and hospitality.
                </p>
            </section>
            <footer className="footer">
                <p>&copy; 2024 pagTURUGAN. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;
