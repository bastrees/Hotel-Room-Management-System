import React from 'react';
import './css/Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any questions or need assistance, feel free to reach out to us. Our dedicated support team is here to help you.</p>
            
            <section className="contact-details">
                <h2>Get in Touch</h2>
                <p><strong>Email:</strong> pagturugansupport@hrms.com</p>
                <p><strong>Phone:</strong> 123-456-7890</p>
                <p><strong>Address:</strong> 123 Hotel Lane, Suite 100, City, State, ZIP Code</p>
            </section>
            
            <section className="contact-form">
                <h2>Send Us a Message</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </section>
            <footer className="footer">
                <p>&copy; 2024 pagTURUGAN. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Contact;
