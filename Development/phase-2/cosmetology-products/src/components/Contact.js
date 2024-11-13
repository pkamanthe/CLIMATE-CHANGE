import React, { useState } from 'react';
import './Contact.css'; // Assuming you have an external CSS file for styling

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      {isSubmitted ? (
        <div className="thank-you-message">
          <h2>Thank You for Reaching Out!</h2>
          <p>We will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}

      {/* Contact Information Section */}
      <div className="contact-info">
        <h2>How to Reach Us</h2>
        <p>If you have any inquiries or would like to visit us in person, you can find us at the following location:</p>
        <div className="address">
          <p><strong>Glow & Glam Cosmetics</strong></p>
          <p>123 Beauty Avenue, Suite 101</p>
          <p>Nairobi, Kenya</p>
          <p>Email: contact@glowandglam.com</p>
          <p>Phone: +254 714677145</p>
        </div>
        
        {/* Embedded Google Map */}
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15979.45297019827!2d36.82192544204649!3d-1.2920655424584005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3a7d96d18d95%3A0x689104f3d405b7a6!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1618481862134!5m2!1sen!2sus"
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
