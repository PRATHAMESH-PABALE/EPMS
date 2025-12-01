import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/auth/login", { username, password });
      const token = res.data.access_token;
      const user = res.data.user;
      onLogin(token, user);
      nav("/");
    } catch (e) {
      setErr(e.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container" style={{maxWidth:420, marginTop:80}}>
      <h2>Payroll System — Login</h2>
      <form onSubmit={submit}>
        <div style={{marginBottom:12}}>
          <label>Username</label>
          <input value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div style={{marginBottom:12}}>
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {err && <div style={{color:'red', marginBottom:8}}>{err}</div>}
        <button type="submit">Login</button>
      </form>
      <div style={{marginTop:10, color:'#666'}}>Tip: Register a user via backend /api/auth/register or include seeding script.</div>
    </div>
  );
}