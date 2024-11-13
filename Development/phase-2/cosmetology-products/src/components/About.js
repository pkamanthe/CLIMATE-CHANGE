import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Importing social media icons
import './About.css'; // Assuming you have an external CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            Welcome to Glow & Glam, where beauty meets sustainability. Founded in 2022, we are a cosmetics company committed to providing high-quality, cruelty-free, and eco-friendly products. Our journey began with a passion for creating makeup that not only enhances beauty but also respects the environment.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to empower individuals to feel confident and beautiful by using skincare and makeup products that are both effective and environmentally conscious. We believe in the power of natural ingredients and strive to offer products that enhance your natural beauty while promoting healthy skin.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <ul>
            <li>**Sustainability**: We use eco-friendly packaging and natural ingredients.</li>
            <li>**Cruelty-Free**: Our products are never tested on animals.</li>
            <li>**Inclusivity**: We celebrate all skin tones and types, offering a wide range of shades for every individual.</li>
            <li>**Quality**: We ensure our products are safe, dermatologically tested, and free of harmful chemicals.</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <p>
            At Glow & Glam, we take pride in crafting products that are both luxurious and ethical. Whether you're looking for makeup essentials or skincare solutions, we offer products designed to meet your unique beauty needs. Our customers are at the heart of everything we do, and we’re dedicated to delivering an exceptional experience, both in-store and online.
          </p>
        </div>
      </div>

      <div className="about-footer">
        <h3>Join Our Community</h3>
        <p>Stay connected with us on social media for the latest updates, tips, and promotions!</p>
        <div className="social-links">
          {/* Social media icons with specific class names */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook">
            <FaFacebook size={30} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram">
            <FaInstagram size={30} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter">
            <FaTwitter size={30} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
