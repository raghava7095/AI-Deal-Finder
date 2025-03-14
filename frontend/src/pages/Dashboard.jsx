import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState({
    amazon: [],
    flipkart: [],
    ebay: [],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleSearch = () => {
    // Mock API call (Replace with actual API fetching logic)
    const mockProducts = {
      amazon: [
        { id: 1, name: "Amazon Product 1", price: "$50" },
        { id: 2, name: "Amazon Product 2", price: "$75" },
      ],
      flipkart: [
        { id: 3, name: "Flipkart Product 1", price: "₹4000" },
        { id: 4, name: "Flipkart Product 2", price: "₹6500" },
      ],
      ebay: [
        { id: 5, name: "eBay Product 1", price: "$30" },
        { id: 6, name: "eBay Product 2", price: "$90" },
      ],
    };

    // Set mock data (Replace this with API response)
    setProducts(mockProducts);
  };

  return (
    <div className="pt-32 px-6"> {/* Increased padding-top to 32 */}

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-2/3 rounded-l-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Product Listings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Amazon Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-orange-500">Amazon</h2>
          {products.amazon.length > 0 ? (
            products.amazon.map((product) => (
              <p key={product.id} className="text-gray-700">
                {product.name} - <span className="font-semibold">{product.price}</span>
              </p>
            ))
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>

        {/* Flipkart Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-blue-600">Flipkart</h2>
          {products.flipkart.length > 0 ? (
            products.flipkart.map((product) => (
              <p key={product.id} className="text-gray-700">
                {product.name} - <span className="font-semibold">{product.price}</span>
              </p>
            ))
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>

        {/* eBay Section */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-bold mb-3 text-yellow-600">eBay</h2>
          {products.ebay.length > 0 ? (
            products.ebay.map((product) => (
              <p key={product.id} className="text-gray-700">
                {product.name} - <span className="font-semibold">{product.price}</span>
              </p>
            ))
          ) : (
            <p className="text-gray-500">No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
