from flask import Flask, jsonify
from config import Config
from models import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    db.init_app(app)
    migrate = Migrate(app, db)
    jwt = JWTManager(app)

    # register blueprints
    from routes.auth_routes import auth_bp
    from routes.employee_routes import employee_bp
    from routes.payroll_routes import payroll_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(employee_bp)
    app.register_blueprint(payroll_bp)

    @app.route("/api/ping")
    def ping():
        return jsonify({"msg":"pong"})

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
