from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), default="hr")  # 'admin' or 'hr'

    def to_dict(self):
        return {"id": self.id, "username": self.username, "role": self.role}

class Employee(db.Model):
    __tablename__ = "employees"
    id = db.Column(db.Integer, primary_key=True)
    emp_id = db.Column(db.String(30), unique=True, nullable=False)
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    email = db.Column(db.String(120))
    phone = db.Column(db.String(30))
    designation = db.Column(db.String(100))
    department = db.Column(db.String(100))
    basic_salary = db.Column(db.Float, default=0.0)   # Monthly basic
    hra = db.Column(db.Float, default=0.0)            # House rent allowance
    other_allowances = db.Column(db.Float, default=0.0)
    deductions = db.Column(db.Float, default=0.0)     # Pre-defined monthly deductions
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def full_name(self):
        return f"{self.first_name or ''} {self.last_name or ''}".strip()

class Payroll(db.Model):
    __tablename__ = "payrolls"
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey("employees.id"), nullable=False)
    month = db.Column(db.String(20), nullable=False)  # e.g., '2025-11' (YYYY-MM)
    basic = db.Column(db.Float, default=0.0)
    hra = db.Column(db.Float, default=0.0)
    allowances = db.Column(db.Float, default=0.0)
    gross = db.Column(db.Float, default=0.0)
    total_deductions = db.Column(db.Float, default=0.0)
    net = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    employee = db.relationship("Employee", backref="payrolls")
