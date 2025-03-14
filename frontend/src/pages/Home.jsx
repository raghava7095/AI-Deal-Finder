import React from 'react'; 
import Navbar from '../components/Navbar'; 
import Header from '../components/Header'; 

const Home = () => { 
  return ( 
    <div> 
      <Navbar /> 
      <Header />              
      {/* Target Section for Scrolling */} 
      <section 
        id="target-section" 
        className="mt-20 pt-32 p-6" 
        style={{ backgroundColor: '#e5d0cf', color: '#344B45' }} 
      >
        <h1 className="text-3xl font-bold text-center">Welcome to AI Deal Finder - Your Ultimate Shopping Companion!</h1>                
        <p className="text-lg text-center mt-4 max-w-4xl mx-auto">
          <strong>Find the Best Deals Across Multiple Platforms Instantly!</strong><br />
          In today’s fast-paced digital world, online shopping has become an integral part of our lives. With numerous e-commerce platforms like 
          <strong> Amazon, Flipkart, eBay, and AliExpress</strong>, finding the best deal can be overwhelming. 
          That’s where <strong>AI Deal Finder</strong> comes in – your intelligent shopping assistant that helps you find the best price for your desired products across multiple platforms, ensuring you save both time and money!
        </p> 
        
        <h2 className="text-2xl font-semibold mt-6">How AI Deal Finder Works?</h2> 
        <ul className="list-disc list-inside mt-2 space-y-2"> 
          <li><strong>Search for Your Product</strong> – Simply enter the product name in the search bar.</li> 
          <li><strong>Compare Prices Instantly</strong> – Our smart algorithm fetches real-time prices from Amazon, Flipkart, eBay, and AliExpress.</li> 
          <li><strong>AI-Powered Insights</strong> – Get detailed <strong>price history analysis</strong>, <strong>future price predictions</strong>, and personalized <strong>shopping recommendations</strong>.</li> 
          <li><strong>Find the Cheapest Price</strong> – Easily identify the platform offering the lowest price for the same product.</li> 
          <li><strong>One-Click Purchase</strong> – Click on your preferred store and complete your purchase seamlessly.</li> 
          <li><strong>Set Price Drop Alerts</strong> – Receive notifications when the price drops on any platform!</li> 
        </ul> 
        
        <h2 className="text-2xl font-semibold mt-6">Why Choose AI Deal Finder?</h2> 
        <ul className="list-disc list-inside mt-2 space-y-2"> 
          <li><strong>AI-Powered Price Insights</strong> – Predict future price drops and get the best deal.</li> 
          <li><strong>Real-Time Price Comparison</strong> – No need to visit multiple websites; we do the work for you.</li> 
          <li><strong>Smart Shopping Assistant</strong> – Get recommendations on trending products and discount trends.</li> 
          <li><strong>User-Friendly Interface</strong> – Easy-to-use, even for casual shoppers.</li> 
          <li><strong>Price Drop Alerts</strong> – Be notified when prices go down so you never miss a deal.</li> 
          <li><strong>Secure & Reliable</strong> – We only fetch public data from trusted stores, ensuring a safe shopping experience.</li> 
        </ul> 
        
        <h2 className="text-2xl font-semibold mt-6 text-center">AI Deal Finder – The Future of Smart Shopping</h2> 
        <p className="text-lg text-center mt-2">
          With online prices fluctuating constantly, <strong>AI Deal Finder ensures that you always get the best value for your money</strong>. Our mission is to make shopping <strong>smarter, faster, and more affordable</strong> by leveraging the power of AI.
        </p> 
        
        <p className="text-center text-xl font-semibold mt-4">Start saving today! <strong>Search now and find the best deals in seconds!</strong></p> 
      </section> 
    </div> 
  ); 
}; 

export default Home;
