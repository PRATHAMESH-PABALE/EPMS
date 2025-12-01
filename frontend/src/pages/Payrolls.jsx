import React, { useEffect, useState } from "react";
import api from "../api";

export default function Payrolls() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => { fetchEmployees(); fetchPayrolls(); }, []);

  async function fetchEmployees() {
    const res = await api.get("/employees/");
    setEmployees(res.data);
  }

  async function fetchPayrolls() {
    const q = [];
    if (employeeId) q.push(`employee_id=${employeeId}`);
    if (month) q.push(`month=${encodeURIComponent(month)}`);
    const qs = q.length ? "?" + q.join("&") : "";

    const res = await api.get(`/payrolls/${qs}`);
    setPayrolls(res.data);
  }

  const generate = async () => {
    if (!employeeId || !month) {
      return alert("Select employee and month (YYYY-MM)");
    }

    try {
      const res = await api.post("/payrolls/generate/", {
        employee_id: employeeId,
        month,
      });
      alert("Payroll generated: Net = " + res.data.net);
      fetchPayrolls();
    } catch (e) {
      alert(e.response?.data?.msg || "Error");
    }
  };

  const download = (p) => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(p, null, 2));

    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `payslip_${p.employee_id}_${p.month}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="container">
      <h2>Payrolls</h2>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
          <option value="">--Select Employee--</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.emp_id} - {emp.first_name} {emp.last_name}
            </option>
          ))}
        </select>

        <input
          placeholder="Month YYYY-MM"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <button onClick={generate}>Generate Payroll</button>
        <button onClick={fetchPayrolls}>Refresh</button>
      </div>

      <table className="table" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Month</th>
            <th>Gross</th>
            <th>Deductions</th>
            <th>Net</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payrolls.map((p) => (
            <tr key={p.id}>
              <td>{p.employee_id}</td>
              <td>{p.month}</td>
              <td>{p.gross}</td>
              <td>{p.total_deductions}</td>
              <td>{p.net}</td>
              <td>
                <button onClick={() => download(p)}>Download Payslip</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
