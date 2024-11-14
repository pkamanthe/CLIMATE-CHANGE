import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <h2>Welcome to Glow & Glam Cosmetic</h2>
      <p>Your one-stop shop for high-quality beauty essentials. Browse our selection to find the perfect products to enhance your beauty routine!</p>
      <p>Whether you're looking for the latest beauty tools or timeless skincare products, we have everything you need. Start by exploring our product catalog or adding a new product to our inventory.</p>
      
      {/* Add an image for visual appeal */}
      <img 
        src={`${process.env.PUBLIC_URL}/images/cosmetic-display.jpg`} 
        alt="Cosmetic products on display" 
        className="home-image" 
      />
    </div>
  );
}

export default Home;
