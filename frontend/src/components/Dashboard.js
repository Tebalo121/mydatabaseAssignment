// src/components/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import './Dashboard.css'; // Import CSS file for styling

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Change this according to your storage method
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <nav className="dashboard-nav">
          <Link to="/products" className="dashboard-link">Product Management</Link>
          <Link to="/users" className="dashboard-link">User Management</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>

      <section className="dashboard-section">
        <h3>Products Added</h3>
        {products.length === 0 ? (
          <p>No products have been added yet.</p>
        ) : (
          <div className="dashboard-content">
            <ProductBarChart products={products} />
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${formatPrice(product.price)}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;