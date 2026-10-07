import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: "▦" },
    { name: "Students", icon: "♙" },
    { name: "Companies", icon: "▣" },
    { name: "Jobs", icon: "◉" },
    { name: "Applications", icon: "☷" },
    { name: "Placements", icon: "✓" }
  ];

  const handleMenuClick = (name) => {
    setActiveMenu(name);

    if (name === "Students") {
      navigate("/students");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">🎓</div>
          <div>
            <h2>Placement</h2>
            <span>Management System</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <p className="menu-title">MAIN MENU</p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${
                activeMenu === item.name ? "active" : ""
              }`}
              onClick={() => handleMenuClick(item.name)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button className="menu-item">
            <span className="menu-icon">⚙</span>
            <span>Settings</span>
          </button>

          <button className="menu-item logout-button" onClick={handleLogout}>
            <span className="menu-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>

          <div className="header-right">
            <button className="notification-button">🔔</button>

            <div className="profile">
              <div className="profile-avatar">A</div>
              <div>
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon students-icon">♙</div>
            <div>
              <span>Total Students</span>
              <h2>0</h2>
              <small>Registered students</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon companies-icon">▣</div>
            <div>
              <span>Companies</span>
              <h2>0</h2>
              <small>Partner companies</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon jobs-icon">◉</div>
            <div>
              <span>Active Jobs</span>
              <h2>0</h2>
              <small>Current openings</small>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon placement-icon">✓</div>
            <div>
              <span>Placements</span>
              <h2>0</h2>
              <small>Students placed</small>
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h2>Placement Overview</h2>
                <p>Current placement statistics</p>
              </div>
            </div>

            <div className="empty-chart">
              <div className="chart-icon">📊</div>
              <h3>No placement data yet</h3>
              <p>
                Placement statistics will appear here once students
                and companies are added.
              </p>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Common activities</p>
              </div>
            </div>

            <div className="quick-actions">
              <button
                onClick={() => navigate("/students")}
                className="quick-action"
              >
                <span>♙</span>
                <div>
                  <strong>Add Student</strong>
                  <small>Register a new student</small>
                </div>
              </button>

              <button className="quick-action">
                <span>▣</span>
                <div>
                  <strong>Add Company</strong>
                  <small>Register a company</small>
                </div>
              </button>

              <button className="quick-action">
                <span>◉</span>
                <div>
                  <strong>Post Job</strong>
                  <small>Create a job opening</small>
                </div>
              </button>
            </div>
          </div>
        </section>

        <section className="dashboard-card recent-section">
          <div className="card-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest placement activities</p>
            </div>
          </div>

          <div className="empty-activity">
            <span>◷</span>
            <p>No recent activity</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;