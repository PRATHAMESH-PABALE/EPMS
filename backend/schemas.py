from marshmallow import Schema, fields

class UserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    role = fields.Str()

class EmployeeSchema(Schema):
    id = fields.Int()
    emp_id = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
    email = fields.Email()
    phone = fields.Str()
    designation = fields.Str()
    department = fields.Str()
    basic_salary = fields.Float()
    hra = fields.Float()
    other_allowances = fields.Float()
    deductions = fields.Float()
    created_at = fields.DateTime()

class PayrollSchema(Schema):
    id = fields.Int()
    employee_id = fields.Int()
    month = fields.Str()
    basic = fields.Float()
    hra = fields.Float()
    allowances = fields.Float()
    gross = fields.Float()
    total_deductions = fields.Float()
    net = fields.Float()
    created_at = fields.DateTime()
