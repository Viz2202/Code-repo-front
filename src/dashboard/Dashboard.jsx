import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <a href="#">Home</a>
          <a href="#">Repository</a>
          <a href="#">Reviews</a>
          <a href="#">Logout</a>
        </nav>
      </aside>
      <main className="main-content">
        <h1>Welcome to the Dashboard</h1>
        <div className="card">
          <h2>Card Title</h2>
          <p>This is some content inside a card.</p>
        </div>
        <div className="card">
          <h2>Another Card</h2>
          <p>More content goes here.</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
