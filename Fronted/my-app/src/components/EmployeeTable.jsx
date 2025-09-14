import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function EmployeeTable() {
  const URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);

  useEffect(() => {
    let getData = async () => {
      try {
        let res = await axios.get(`${URL}`);
        setData(res.data);
      } catch (err) {
        toast.error("Error fetching employees");
      }
    };
    getData();
  },[]);

  let deletedButton = async (id) => {

    try {
      await axios.delete(`${URL}/remove/${id}`);
      let filterData = data.filter((d) => d.e_id !== id);
      setData(filterData);
      toast.success("Delete successfully")

    } catch (err) {
      toast.error("Error deleting employee:");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Employee List</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>HRA</th>
            <th>Joining Date</th>
            <th>Department</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.e_id}>
              <td>{emp.e_id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>₹{emp.salary}</td>
              <td>₹{emp.HRA}</td>
              <td>{new Date(emp.joining_date).toLocaleDateString()}</td>
              <td>{emp.department}</td>
              <td>{emp.age}</td>
              <td>
                <Link to={`/update/${emp.e_id}`}>
                  <button className="btn btn-warning btn-sm me-2">Edit</button>
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deletedButton(emp.e_id)} // ✅ Correct
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
     <Link to={'/create'}><button class="btn btn-primary btn-lg active" role="button">Create Employee</button></Link>

      </div>

    </div>
  );
}

export default EmployeeTable;
