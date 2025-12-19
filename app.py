from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    bcrypt.init_app(app)
    Migrate(app, db)

    CORS(app, 
     resources={r"/*": {"origins": "http://localhost:5173"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],  # Add common headers
     methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
    
    # Import models so Flask-Migrate sees them
    import models  
    
    # Create Flask-RESTful API instance
    api = Api(app)
    
    # Register routes
    from routes import initialize_routes  
    initialize_routes(api)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(port=5555, debug=True)