from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Employee
from schemas import EmployeeSchema

employee_bp = Blueprint("employee", __name__, url_prefix="/api/employees")
employee_schema = EmployeeSchema()
employees_schema = EmployeeSchema(many=True)

@employee_bp.route("/", methods=["GET"])
@jwt_required()
def get_employees():
    q = request.args.get("q")
    query = Employee.query
    if q:
        query = query.filter(
            (Employee.first_name.ilike(f"%{q}%")) |
            (Employee.last_name.ilike(f"%{q}%")) |
            (Employee.emp_id.ilike(f"%{q}%")) |
            (Employee.department.ilike(f"%{q}%"))
        )
    employees = query.order_by(Employee.created_at.desc()).all()
    return jsonify(employees_schema.dump(employees))

@employee_bp.route("/", methods=["POST"])
@jwt_required()
def create_employee():
    data = request.get_json()
    emp = Employee(
        emp_id = data.get("emp_id"),
        first_name = data.get("first_name"),
        last_name = data.get("last_name"),
        email = data.get("email"),
        phone = data.get("phone"),
        designation = data.get("designation"),
        department = data.get("department"),
        basic_salary = data.get("basic_salary", 0.0),
        hra = data.get("hra", 0.0),
        other_allowances = data.get("other_allowances", 0.0),
        deductions = data.get("deductions", 0.0),
    )
    db.session.add(emp)
    db.session.commit()
    return jsonify(employee_schema.dump(emp)), 201

@employee_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_employee(id):
    emp = Employee.query.get_or_404(id)
    data = request.get_json()
    for key in ["emp_id","first_name","last_name","email","phone","designation","department","basic_salary","hra","other_allowances","deductions"]:
        if key in data:
            setattr(emp, key, data[key])
    db.session.commit()
    return jsonify(employee_schema.dump(emp))

@employee_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_employee(id):
    emp = Employee.query.get_or_404(id)
    db.session.delete(emp)
    db.session.commit()
    return jsonify({"msg":"deleted"}), 200
