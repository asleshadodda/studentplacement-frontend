import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Students.css";

const API_URL = "http://localhost:8080/students";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    cgpa: "",
    skills: "",
    placementStatus: "Not Placed"
  });

  const loadStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      year: Number(formData.year),
      cgpa: Number(formData.cgpa),
      skills: formData.skills,
      placementStatus: formData.placementStatus
    };

    try {
      if (editingStudent) {
        await axios.put(`${API_URL}/${editingStudent.id}`, studentData);
      } else {
        await axios.post(API_URL, studentData);
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        cgpa: "",
        skills: "",
        placementStatus: "Not Placed"
      });

      setEditingStudent(null);
      setShowForm(false);
      loadStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name || "",
      email: student.email || "",
      phone: student.phone || "",
      department: student.department || "",
      year: student.year || "",
      cgpa: student.cgpa || "",
      skills: student.skills || "",
      placementStatus: student.placementStatus || "Not Placed"
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      year: "",
      cgpa: "",
      skills: "",
      placementStatus: "Not Placed"
    });
    setShowForm(true);
  };

  const totalStudents = students.length;

  const placedStudents = students.filter(
    (student) =>
      student.placementStatus &&
      student.placementStatus.toLowerCase() === "placed"
  ).length;

  const notPlacedStudents = students.filter(
    (student) =>
      !student.placementStatus ||
      student.placementStatus.toLowerCase() !== "placed"
  ).length;

  return (
    <div className="students-page">
      <aside className="students-sidebar">
        <div className="sidebar-logo">
          <h2>PlaceTrack</h2>
          <p>Student Placement</p>
        </div>

        <nav className="sidebar-nav">
          <button onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>

          <button className="active">
            Students
          </button>

          <button>
            Companies
          </button>

          <button>
            Jobs
          </button>

          <button>
            Applications
          </button>

          <button>
            Placements
          </button>
        </nav>

        <button
          className="sidebar-logout"
          onClick={() => navigate("/login")}
        >
          Logout
        </button>
      </aside>

      <main className="students-main">
        <div className="students-header">
          <div>
            <h1>Students</h1>
            <p>Manage student placement information</p>
          </div>

          <button
            className="add-student-button"
            onClick={handleAddStudent}
          >
            + Add Student
          </button>
        </div>

        <div className="student-stats">
          <div className="student-stat-card">
            <span>Total Students</span>
            <strong>{totalStudents}</strong>
          </div>

          <div className="student-stat-card">
            <span>Placed Students</span>
            <strong>{placedStudents}</strong>
          </div>

          <div className="student-stat-card">
            <span>Not Placed</span>
            <strong>{notPlacedStudents}</strong>
          </div>
        </div>

        {showForm && (
          <div className="student-form-container">
            <div className="form-header">
              <h2>
                {editingStudent ? "Edit Student" : "Add Student"}
              </h2>

              <button
                className="close-form-button"
                onClick={() => {
                  setShowForm(false);
                  setEditingStudent(null);
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="student-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              <div className="form-group">
                <label>CGPA</label>
                <input
                  type="number"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Java, React, SQL"
                />
              </div>

              <div className="form-group">
                <label>Placement Status</label>
                <select
                  name="placementStatus"
                  value={formData.placementStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="Not Placed">Not Placed</option>
                  <option value="Placed">Placed</option>
                  <option value="In Process">In Process</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingStudent(null);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  {editingStudent ? "Update Student" : "Save Student"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="students-table-container">
          <div className="table-header">
            <div>
              <h2>Student Records</h2>
              <p>All registered students</p>
            </div>
          </div>

          {students.length === 0 ? (
            <div className="empty-students">
              <h3>No students found</h3>
              <p>Add your first student to get started.</p>

              <button
                className="add-student-button"
                onClick={handleAddStudent}
              >
                + Add Student
              </button>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>CGPA</th>
                    <th>Skills</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      <td>{student.department}</td>
                      <td>{student.year}</td>
                      <td>{student.cgpa}</td>
                      <td>{student.skills}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            student.placementStatus
                              ? student.placementStatus
                                  .toLowerCase()
                                  .replace(" ", "-")
                              : "not-placed"
                          }`}
                        >
                          {student.placementStatus || "Not Placed"}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => handleEdit(student)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Students;