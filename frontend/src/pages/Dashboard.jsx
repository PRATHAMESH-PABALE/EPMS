import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard({ user, onLogout }) {
  return (
    <div className="container">
      <div className="header">
        <h2>Welcome, {user.username} ({user.role})</h2>
        <div>
          <Link to="/employees"><button style={{marginRight:8}}>Employees</button></Link>
          <Link to="/payrolls"><button>Payrolls</button></Link>
          <button onClick={onLogout} style={{marginLeft:12}}>Logout</button>
        </div>
      </div>
      <hr />
      <div>
        <h3>Quick Actions</h3>
        <ul>
          <li><Link to="/employees">Manage Employees</Link></li>
          <li><Link to="/payrolls">Generate/view payrolls</Link></li>
        </ul>
      </div>
    </div>
  );
}
