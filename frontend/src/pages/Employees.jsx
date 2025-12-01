import React, { useEffect, useState } from "react";
import api from "../api";
import EmployeeForm from "./EmployeeForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);

  const fetch = async () => {
    const res = await api.get(`/employees/?q=${encodeURIComponent(query)}`);
    setEmployees(res.data);
  };

  useEffect(() => { fetch(); }, [query]);

  const remove = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    await api.delete(`/employees/${id}/`);
    fetch();
  };

  return (
    <div className="container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Employees</h2>
        <div>
          <input placeholder="Search" value={query} onChange={e=>setQuery(e.target.value)} />
        </div>
      </div>
      <EmployeeForm onSaved={fetch} editing={editing} setEditing={setEditing} />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Basic</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.emp_id}</td>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.basic_salary}</td>
              <td>
                <button onClick={() => setEditing(emp)}>Edit</button>
                <button onClick={() => remove(emp.id)} style={{marginLeft:8}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
