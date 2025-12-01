import React, { useEffect, useState } from "react";
import api from "../api";

export default function EmployeeForm({ onSaved, editing, setEditing }) {
  const initial = {
    emp_id: "", first_name:"", last_name:"", email:"", phone:"", designation:"",
    department:"", basic_salary:0, hra:0, other_allowances:0, deductions:0
  };

  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(initial);
  }, [editing]);

  const onChange = (k, v) => setForm({ ...form, [k]: v });

  const submit = async (e) => {
    e.preventDefault();

    if (editing) {
      await api.put(`/employees/${editing.id}/`, form);
      setEditing(null);
    } else {
      await api.post("/employees/", form);
    }

    setForm(initial);
    onSaved();
  };

  return (
    <form onSubmit={submit} style={{marginTop:12, marginBottom:12}}>
      <div className="form-row">
        <div className="form-col">
          <label>Employee ID</label>
          <input value={form.emp_id} onChange={e=>onChange("emp_id", e.target.value)} required />
        </div>
        <div className="form-col">
          <label>First name</label>
          <input value={form.first_name} onChange={e=>onChange("first_name", e.target.value)} />
        </div>
        <div className="form-col">
          <label>Last name</label>
          <input value={form.last_name} onChange={e=>onChange("last_name", e.target.value)} />
        </div>
      </div>

      <div className="form-row" style={{marginTop:8}}>
        <div className="form-col">
          <label>Department</label>
          <input value={form.department} onChange={e=>onChange("department", e.target.value)} />
        </div>
        <div className="form-col">
          <label>Designation</label>
          <input value={form.designation} onChange={e=>onChange("designation", e.target.value)} />
        </div>
        <div className="form-col">
          <label>Email</label>
          <input value={form.email} onChange={e=>onChange("email", e.target.value)} />
        </div>
      </div>

      <div className="form-row" style={{marginTop:8}}>
        <div className="form-col">
          <label>Basic Salary</label>
          <input type="number" value={form.basic_salary} onChange={e=>onChange("basic_salary", parseFloat(e.target.value || 0))} />
        </div>
        <div className="form-col">
          <label>HRA</label>
          <input type="number" value={form.hra} onChange={e=>onChange("hra", parseFloat(e.target.value || 0))} />
        </div>
        <div className="form-col">
          <label>Other Allowances</label>
          <input type="number" value={form.other_allowances} onChange={e=>onChange("other_allowances", parseFloat(e.target.value || 0))} />
        </div>
      </div>

      <div style={{marginTop:8}}>
        <label>Deductions</label>
        <input type="number" value={form.deductions} onChange={e=>onChange("deductions", parseFloat(e.target.value || 0))} />
      </div>

      <div style={{marginTop:8}}>
        <button type="submit">{editing ? "Save" : "Add Employee"}</button>
        {editing && <button type="button" onClick={() => setEditing(null)} style={{marginLeft:8}}>Cancel</button>}
      </div>
    </form>
  );
}
