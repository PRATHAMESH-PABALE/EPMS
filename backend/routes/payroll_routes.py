from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Employee, Payroll
from schemas import PayrollSchema
from sqlalchemy.exc import IntegrityError

payroll_bp = Blueprint("payroll", __name__, url_prefix="/api/payrolls")
payroll_schema = PayrollSchema()
payrolls_schema = PayrollSchema(many=True)

def compute_payroll(employee, month_str):
    # Business logic: basic + hra + other_allowances = gross
    basic = float(employee.basic_salary or 0.0)
    hra = float(employee.hra or 0.0)
    allowances = float(employee.other_allowances or 0.0)
    gross = basic + hra + allowances
    # deductions: employee.deductions or some computed tax
    base_deductions = float(employee.deductions or 0.0)
    # Example tax: 10% of basic as tax
    tax = 0.10 * basic
    total_deductions = base_deductions + tax
    net = gross - total_deductions
    return {
        "basic": basic,
        "hra": hra,
        "allowances": allowances,
        "gross": round(gross,2),
        "total_deductions": round(total_deductions,2),
        "net": round(net,2)
    }

@payroll_bp.route("/", methods=["GET"])
@jwt_required()
def list_payrolls():
    employee_id = request.args.get("employee_id")
    month = request.args.get("month")
    query = Payroll.query
    if employee_id:
        query = query.filter_by(employee_id=employee_id)
    if month:
        query = query.filter_by(month=month)
    res = query.order_by(Payroll.created_at.desc()).all()
    return jsonify(payrolls_schema.dump(res))

@payroll_bp.route("/generate", methods=["POST"])
@jwt_required()
def generate_payroll():
    data = request.get_json()
    employee_id = data.get("employee_id")
    month = data.get("month")  # '2025-11' format
    if not employee_id or not month:
        return jsonify({"msg":"employee_id and month required"}), 400
    employee = Employee.query.get_or_404(employee_id)
    # avoid duplicate payroll for same month + employee:
    existing = Payroll.query.filter_by(employee_id=employee_id, month=month).first()
    if existing:
        return jsonify({"msg":"Payroll already generated for this month"}), 400

    computed = compute_payroll(employee, month)
    payroll = Payroll(
        employee_id = employee_id,
        month = month,
        basic = computed["basic"],
        hra = computed["hra"],
        allowances = computed["allowances"],
        gross = computed["gross"],
        total_deductions = computed["total_deductions"],
        net = computed["net"]
    )
    db.session.add(payroll)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"msg":"Error saving payroll"}), 500
    return jsonify(payroll_schema.dump(payroll)), 201

@payroll_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_payroll(id):
    p = Payroll.query.get_or_404(id)
    return jsonify(payroll_schema.dump(p))
