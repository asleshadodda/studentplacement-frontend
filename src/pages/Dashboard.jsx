import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const STUDENTS_API = "http://localhost:8080/students";
const COMPANIES_API = "http://localhost:8080/companies";
const JOBS_API = "http://localhost:8080/jobs";

function Dashboard() {
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  // -----------------------------------------
  // FETCH DASHBOARD DATA
  // -----------------------------------------
  const fetchDashboardData = async () => {
    try {
      // Students
      const studentsResponse = await axios.get(STUDENTS_API);

      if (Array.isArray(studentsResponse.data)) {
        setStudents(studentsResponse.data);
      }

      // Companies
      try {
        const companiesResponse = await axios.get(COMPANIES_API);

        if (Array.isArray(companiesResponse.data)) {
          setCompanies(companiesResponse.data);
        }
      } catch (error) {
        // Companies API may not exist yet
        setCompanies([]);
      }

      // Jobs
      try {
        const jobsResponse = await axios.get(JOBS_API);

        if (Array.isArray(jobsResponse.data)) {
          setJobs(jobsResponse.data);
        }
      } catch (error) {
        // Jobs API may not exist yet
        setJobs([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  // -----------------------------------------
  // AUTOMATIC REFRESH
  // -----------------------------------------
  useEffect(() => {
    fetchDashboardData();

    const interval = setInterval(() => {
      fetchDashboardData();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // -----------------------------------------
  // CALCULATIONS
  // -----------------------------------------

  const totalStudents = students.length;

  const placedStudents = students.filter((student) => {
    if (!student.status) {
      return false;
    }

    return student.status.toString().trim().toLowerCase() === "placed";
  }).length;

  const notPlacedStudents = totalStudents - placedStudents;

  const totalCompanies = companies.length;

  const activeJobs = jobs.filter((job) => {
    if (!job.status) {
      return true;
    }

    const status = job.status.toString().trim().toLowerCase();

    return (
      status === "active" ||
      status === "open" ||
      status === "opened"
    );
  }).length;

  // -----------------------------------------
  // MENU
  // -----------------------------------------

  const handleMenuClick = (name) => {
    setActiveMenu(name);

    if (name === "Dashboard") {
      navigate("/dashboard");
    }

    if (name === "Students") {
      navigate("/students");
    }

    // Keep these ready for future modules
    if (name === "Companies") {
      console.log("Companies module coming soon");
    }

    if (name === "Jobs") {
      console.log("Jobs module coming soon");
    }

    if (name === "Applications") {
      console.log("Applications module coming soon");
    }

    if (name === "Placements") {
      console.log("Placements module coming soon");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-page">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="sidebar-logo-icon">
            🎓
          </div>

          <div className="sidebar-logo-text">
            <h2>Placement</h2>
            <span>Management</span>
          </div>

        </div>

        <nav className="sidebar-menu">

          <div
            className={`menu-item ${
              activeMenu === "Dashboard" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("Dashboard")}
          >
            <span className="menu-icon">▦</span>
            <span>Dashboard</span>
          </div>

          <div
            className={`menu-item ${
              activeMenu === "Students" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("Students")}
          >
            <span className="menu-icon">♙</span>
            <span>Students</span>
          </div>

          <div
            className={`menu-item ${
              activeMenu === "Companies" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("Companies")}
          >
            <span className="menu-icon">▣</span>
            <span>Companies</span>
          </div>

          <div
            className={`menu-item ${
              activeMenu === "Jobs" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("Jobs")}
          >
            <span className="menu-icon">◉</span>
            <span>Jobs</span>
          </div>

          <div
            className={`menu-item ${
              activeMenu === "Applications" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("Applications")}
          >
            <span className="menu-icon">☑</span>
            <span>Applications</span>
          </div>

          <div
            className={`menu-item ${
              activeMenu === "Placements" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("Placements")}
          >
            <span className="menu-icon">✓</span>
            <span>Placements</span>
          </div>

        </nav>

        <div className="sidebar-bottom">

          <div
            className="menu-item logout-item"
            onClick={handleLogout}
          >
            <span className="menu-icon">↪</span>
            <span>Logout</span>
          </div>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* HEADER */}

        <header className="dashboard-header">

          <div className="header-title">

            <div className="breadcrumb">
              Placement Management / Dashboard
            </div>

            <h1>Dashboard</h1>

            <p>
              Welcome back! Here's an overview of your placement activities.
            </p>

          </div>

          <div className="header-right">

            <div className="live-indicator">
              <span className="live-dot"></span>
              Live
            </div>

            <div className="notification">
              🔔
            </div>

            <div className="profile">

              <div className="profile-avatar">
                A
              </div>

              <div className="profile-details">
                <strong>Admin</strong>
                <span>Administrator</span>
              </div>

            </div>

          </div>

        </header>


        {/* ================= STATS ================= */}

        <section className="stats-grid">

          {/* STUDENTS */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon student-stat-icon">
                🎓
              </div>

              <span className="stat-label live-label">
                LIVE
              </span>

            </div>

            <div className="stat-title">
              Total Students
            </div>

            <div className="stat-number">

              {loading ? (
                <span className="loading-number">...</span>
              ) : (
                totalStudents
              )}

            </div>

            <div className="stat-description">
              Registered students
            </div>

          </div>


          {/* COMPANIES */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon company-stat-icon">
                🏢
              </div>

              <span className="stat-label">
                LIVE
              </span>

            </div>

            <div className="stat-title">
              Companies
            </div>

            <div className="stat-number">

              {loading ? (
                <span className="loading-number">...</span>
              ) : (
                totalCompanies
              )}

            </div>

            <div className="stat-description">
              Partner companies
            </div>

          </div>


          {/* JOBS */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon job-stat-icon">
                💼
              </div>

              <span className="stat-label">
                LIVE
              </span>

            </div>

            <div className="stat-title">
              Active Jobs
            </div>

            <div className="stat-number">

              {loading ? (
                <span className="loading-number">...</span>
              ) : (
                activeJobs
              )}

            </div>

            <div className="stat-description">
              Current openings
            </div>

          </div>


          {/* PLACEMENTS */}

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon placement-stat-icon">
                ✓
              </div>

              <span className="stat-label success-label">
                LIVE
              </span>

            </div>

            <div className="stat-title">
              Placements
            </div>

            <div className="stat-number">

              {loading ? (
                <span className="loading-number">...</span>
              ) : (
                placedStudents
              )}

            </div>

            <div className="stat-description">
              Students placed
            </div>

          </div>

        </section>


        {/* ================= PLACEMENT OVERVIEW ================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <h2>
                Placement Overview
              </h2>

              <p>
                Current student placement status
              </p>

            </div>

            <div className="refresh-status">
              <span className="refresh-dot"></span>
              Updates automatically
            </div>

          </div>


          <div className="overview-grid">

            {/* TOTAL */}

            <div className="overview-card">

              <div className="overview-icon">
                👨‍🎓
              </div>

              <div className="overview-info">

                <span>
                  Total Students
                </span>

                <strong>
                  {totalStudents}
                </strong>

                <small>
                  Registered in system
                </small>

              </div>

            </div>


            {/* PLACED */}

            <div className="overview-card">

              <div className="overview-icon placed-icon">
                ✓
              </div>

              <div className="overview-info">

                <span>
                  Placed Students
                </span>

                <strong>
                  {placedStudents}
                </strong>

                <small>
                  Successfully placed
                </small>

              </div>

            </div>


            {/* NOT PLACED */}

            <div className="overview-card">

              <div className="overview-icon pending-icon">
                ⏳
              </div>

              <div className="overview-info">

                <span>
                  Not Yet Placed
                </span>

                <strong>
                  {notPlacedStudents}
                </strong>

                <small>
                  Looking for opportunities
                </small>

              </div>

            </div>

          </div>


          {/* PROGRESS */}

          <div className="placement-progress">

            <div className="progress-header">

              <span>
                Placement Progress
              </span>

              <strong>
                {totalStudents > 0
                  ? Math.round(
                      (placedStudents / totalStudents) * 100
                    )
                  : 0}
                %
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width: `${
                    totalStudents > 0
                      ? (placedStudents / totalStudents) * 100
                      : 0
                  }%`,
                }}
              ></div>

            </div>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Manage your placement activities
              </p>

            </div>

          </div>


          <div className="quick-actions-grid">

            <button
              className="quick-action-card"
              onClick={() => navigate("/students")}
            >

              <div className="quick-action-icon">
                🎓
              </div>

              <div className="quick-action-content">

                <strong>
                  Manage Students
                </strong>

                <span>
                  Add, edit or remove students
                </span>

              </div>

              <span className="arrow">
                →
              </span>

            </button>


            <button
              className="quick-action-card"
              onClick={() => handleMenuClick("Companies")}
            >

              <div className="quick-action-icon">
                🏢
              </div>

              <div className="quick-action-content">

                <strong>
                  Manage Companies
                </strong>

                <span>
                  View partner companies
                </span>

              </div>

              <span className="arrow">
                →
              </span>

            </button>


            <button
              className="quick-action-card"
              onClick={() => handleMenuClick("Jobs")}
            >

              <div className="quick-action-icon">
                💼
              </div>

              <div className="quick-action-content">

                <strong>
                  Manage Jobs
                </strong>

                <span>
                  View current job openings
                </span>

              </div>

              <span className="arrow">
                →
              </span>

            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;