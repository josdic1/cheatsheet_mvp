// src/data/data.js
export const initialData = {
  user: {
    id: 1,
    name: "Josh"
  },

  languages: [
    { id: 1,  name: "CSS" },
    { id: 2,  name: "HTML" },
    { id: 3,  name: "JavaScript" },
    { id: 4,  name: "JSON" },
    { id: 5,  name: "Python" },
    { id: 6,  name: "React" },
    { id: 7,  name: "Regex" },
    { id: 8,  name: "SQL" },
    { id: 9,  name: "Terminal" },
    { id: 10, name: "Xml" }
  ],

  categories: [
    { id: 1,  name: "Arrays" },
    { id: 2,  name: "Classes" },
    { id: 3,  name: "Curl" },
    { id: 4,  name: "Functions" },
    { id: 5,  name: "Images" },
    { id: 6,  name: "Loops" },
    { id: 7,  name: "Manipulation" },
    { id: 8,  name: "Methods" },
    { id: 9,  name: "Startup" },
    { id: 10, name: "Filters" },
    { id: 11, name: "Components" }
  ],

  cheats: [
    {
      id: 1001,
      title: "New Vite React Project",
      code: "npm create vite@latest client -- --template react\ncd client\nnpm install\nnpm install react-router-dom lucide-react",
      notes: "Executed from existing client folder with router and lucide",
      language_id: 9,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1002,
      title: "Initial and Use Migration",
      code: "flask db init\nflask db migrate -m \"initial migration\"\nflask db upgrade",
      notes: "First time setup: init creates migrations folder. After changing models: migrate creates migration file. upgrade applies changes to database. Run from server directory.",
      language_id: 9,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1003,
      title: "Flask GET Route with jsonify",
      code: "@app.route('/cheats', methods=['GET'])\ndef get_cheats():\n    cheats = Cheat.query.all()\n    return jsonify([cheat.to_dict() for cheat in cheats]), 200",
      notes: "Standard Flask route decorator. Query all cheats from database. Use list comprehension with to_dict() to serialize. jsonify converts to JSON response. Returns 200 status. Use when not using Flask-RESTful.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1004,
      title: "React Router Setup in main.jsx",
      code: "import { createRoot } from 'react-dom/client'\nimport { createBrowserRouter, RouterProvider } from 'react-router-dom'\nimport { routes } from './routes.jsx'\nimport './index.css'\n\nconst router = createBrowserRouter(routes)\n\nconst root = createRoot(document.getElementById('root'))\nroot.render(<RouterProvider router={router} />)",
      notes: "Entry point for React app with React Router. Import routes from separate file. createBrowserRouter sets up routing. RouterProvider wraps app with router. Renders into root div.",
      language_id: 6,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1005,
      title: "Vite Proxy Configuration",
      code: "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    proxy: {\n      '/api': {\n        target: 'http://localhost:5556',\n        changeOrigin: true,\n        rewrite: (path) => path.replace(/^\\/api/, '')\n      }\n    }\n  }\n})",
      notes: "Proxies /api requests to Flask backend at port 5556. Change target port if Flask runs on different port (like 5000). rewrite strips /api prefix before sending to Flask. Good for all React + Flask projects. Avoids CORS issues in development.",
      language_id: 3,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1006,
      title: "Create React Context",
      code: "import { createContext } from \"react\";\n\nexport const AuthContext = createContext();",
      notes: "Creates context object for sharing state across components. Export to use in provider and custom hook. Holds no initial value - provider will supply values. Import in provider file and custom hook.",
      language_id: 6,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1007,
      title: "React Router Routes Setup",
      code: "import App from './App.jsx';\nimport { ErrorPage } from './pages/ErrorPage.jsx';\nimport { ProtectedRoute } from './components/ProtectedRoute.jsx';\n\nexport const routes = [\n    {\n        path: '/',\n        element: <ProtectedRoute><App /></ProtectedRoute>,\n        errorElement: <ErrorPage />\n    }\n];",
      notes: "Exports routes array for React Router. Sets App as root with ErrorPage fallback. Children array holds nested routes. Wrap protected routes in ProtectedRoute component. Add more route objects for login, signup, etc.",
      language_id: 6,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1008,
      title: "Protected Route Component",
      code: "import { Navigate } from 'react-router-dom';\nimport { useAuth } from '../hooks/useAuth';\n\nexport function ProtectedRoute({ children }) {\n    const { loggedIn, loading } = useAuth();\n    \n    if (loading) return <div>Loading...</div>;\n    if (!loggedIn) return <Navigate to=\"/login\" replace />;\n    \n    return children;\n}",
      notes: "Wraps routes that require authentication. Checks loading state first to avoid flash redirects. Redirects to login if not logged in. Returns children if authenticated. Use in routes.jsx to protect pages.",
      language_id: 6,
      category_id: 11,
      user_id: 1
    },
    {
      id: 1009,
      title: "Basic Error Page Component",
      code: "import { useRouteError, useNavigate } from \"react-router-dom\";\n\nexport function ErrorPage() {\n    const error = useRouteError();\n    const navigate = useNavigate();\n\n    return (\n        <div className=\"error-container\">\n            <h1>Oops!</h1>\n            <p>Sorry, an unexpected error has occurred.</p>\n            <p><i>{error.statusText || error.message}</i></p>\n            <button onClick={() => navigate('/')}>Go Home</button>\n        </div>\n    );\n}",
      notes: "Catches routing errors with useRouteError hook. Displays error message and Go Home button. Set as errorElement in routes. Logs error to console for debugging.",
      language_id: 6,
      category_id: 11,
      user_id: 1
    },
    {
      id: 1010,
      title: "Flask Extensions File",
      code: "from flask_sqlalchemy import SQLAlchemy\nfrom flask_migrate import Migrate\nfrom flask_bcrypt import Bcrypt\nfrom flask_cors import CORS\n\ndb = SQLAlchemy()\nmigrate = Migrate()\nbcrypt = Bcrypt()\ncors = CORS()",
      notes: "Centralized file for Flask extensions. Import extensions here, initialize in create_app(). Avoids circular imports. Import db in models and routes. Import bcrypt for password hashing.",
      language_id: 5,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1011,
      title: "Flask Configuration File",
      code: "import os\n\nclass Config:\n    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///app.db')\n    SQLALCHEMY_TRACK_MODIFICATIONS = False\n    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')",
      notes: "Configuration class for Flask settings. Database URI defaults to SQLite. SECRET_KEY for sessions and security. SQLALCHEMY_TRACK_MODIFICATIONS False saves memory. Import in create_app with app.config.from_object(Config).",
      language_id: 5,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1012,
      title: "Flask Run File",
      code: "from app import create_app\n\napp = create_app()\n\nif __name__ == '__main__':\n    app.run(port=5556, debug=True)",
      notes: "Entry point to run Flask app. Imports create_app factory function. Runs on port 5556 with debug mode. Execute with python run.py from server directory. Change port to match vite.config proxy.",
      language_id: 5,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1013,
      title: "Basic App Component with Auth Provider",
      code: "import { Outlet } from \"react-router-dom\";\nimport { AuthProvider } from \"./providers/Provider\";\n\nfunction App() {\n  return (\n    <AuthProvider>\n      <Outlet />\n    </AuthProvider>\n  );\n}\n\nexport default App;",
      notes: "Root App component wrapped in AuthProvider for global auth state. Outlet renders child routes from routes.jsx. Remove extra fragments - AuthProvider can be direct parent. Add more providers here if needed for global state.",
      language_id: 6,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1014,
      title: "Flask Requirements.txt Template",
      code: "alembic==1.17.0\nbcrypt==5.0.0\nblinker==1.9.0\nclick==8.3.0\nFlask==3.1.2\nFlask-Bcrypt==1.0.1\nflask-cors==6.0.1\nflask-marshmallow==1.3.0\nFlask-Migrate==4.1.0\nFlask-RESTful==0.3.10\nFlask-SQLAlchemy==3.1.1\ngunicorn==21.2.0\nitsdangerous==2.2.0\nJinja2==3.1.6\nMako==1.3.10\nMarkupSafe==3.0.2\nmarshmallow==4.0.1\nmarshmallow-sqlalchemy==1.4.2\npsycopg2-binary==2.9.10\nPyJWT==2.10.1\npython-dotenv==1.2.1\nSQLAlchemy==2.0.44\nsqlite-web==0.6.5\ntyping_extensions==4.15.0\nWerkzeug==3.1.3",
      notes: "Standard Flask requirements for full-stack apps. Includes database (SQLAlchemy, Migrate), auth (Bcrypt, JWT), API tools (RESTful, CORS, Marshmallow), and production server (gunicorn). Install with pip install -r requirements.txt.",
      language_id: 9,
      category_id: 9,
      user_id: 1
    },
    {
      id: 1015,
      title: "Sort List by Title in React",
      code: "const sortedCheats = [...cheats].sort((a, b) => \n  a.title.localeCompare(b.title)\n);",
      notes: "Spread operator creates copy to avoid mutating original array. sort with localeCompare does alphabetical sorting. Use sortedCheats in map instead of cheats.",
      language_id: 6,
      category_id: 1,
      user_id: 1
    },
    {
      id: 1016,
      title: "Flask-RESTful GET List Resource",
      code: "class CategoryList(Resource):\n    def get(self):\n        categories = Category.query.all()\n        return [{'id': c.id, 'name': c.name} for c in categories], 200",
      notes: "Flask-RESTful class-based resource. Inherits from Resource. get method returns list of dicts using list comprehension. No jsonify needed - auto converts.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1017,
      title: "Replace Spaces with Underscores (JavaScript)",
      code: "string = 'cheat code app'\nstring.replaceAll(' ', '_')\n\n// Example\nconst title = \"cheat code app\"\nconst formatted = title.replaceAll(' ', '_')",
      notes: "replaceAll method replaces all occurrences. First argument is what to find, second is replacement.",
      language_id: 3,
      category_id: 7,
      user_id: 1
    },
    {
      id: 1018,
      title: "Replace Spaces with Underscores (Python)",
      code: "string = 'cheat code app'\nstring.replace(' ', '_')\n\n# Example\ntitle = \"cheat code app\"\nformatted = title.replace(' ', '_')",
      notes: "replace method replaces all occurrences by default in Python.",
      language_id: 5,
      category_id: 7,
      user_id: 1
    },
    {
      id: 1019,
      title: "Count Spaces in String (JavaScript)",
      code: "// Count all spaces\nstring.split(' ').length - 1\n\n// Example\nconst title = \"cheat code app\"\nconst spaceCount = title.split(' ').length - 1",
      notes: "split divides string by spaces into array, subtract 1 from length.",
      language_id: 3,
      category_id: 7,
      user_id: 1
    },
    {
      id: 1020,
      title: "Count Spaces in String (Python)",
      code: "# Count all spaces\nstring.count(' ')\n\n# Example\ntitle = \"cheat code app\"\nspace_count = title.count(' ')",
      notes: "count method counts occurrences of substring.",
      language_id: 5,
      category_id: 7,
      user_id: 1
    },
    {
      id: 1021,
      title: "Basic Email Validation (Python)",
      code: "# Check for @ and dot after @\n'@' in email and '.' in email.split('@')[-1]",
      notes: "in operator checks for @ symbol. Split by @ and check last part has dot.",
      language_id: 5,
      category_id: 4,
      user_id: 1
    },
    {
      id: 1022,
      title: "Basic Email Validation (JavaScript)",
      code: "// Check for @ and dot after @\nemail.includes('@') && email.split('@')[1]?.includes('.')",
      notes: "Includes checks for @ symbol. Split by @ creates array of parts.",
      language_id: 3,
      category_id: 4,
      user_id: 1
    },
    {
      id: 1023,
      title: "Email Validation with Regex (JavaScript)",
      code: "const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ \nemailRegex.test(email)",
      notes: "Basic regex checks: characters before @, characters after @, dot in domain.",
      language_id: 3,
      category_id: 7,
      user_id: 1
    },
    {
      id: 1024,
      title: "Email Validation with Regex (Python)",
      code: "import re\nemail_regex = r'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' \nbool(re.match(email_regex, email))",
      notes: "re.match returns match object or None.",
      language_id: 5,
      category_id: 7,
      user_id: 1
    },
    {
      id: 1025,
      title: "Flask Login Resource",
      code: "class Login(Resource):\n    def post(self):\n        data = request.get_json()\n        user = User.query.filter_by(email=data.get('email')).first()\n        if user and user.authenticate(data.get('password')):\n            session['user_id'] = user.id\n            return {'id': user.id, 'name': user.name, 'email': user.email}\n        return {'error': 'Invalid credentials'}, 401",
      notes: "Flask-RESTful login endpoint. Gets JSON data from request body.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1026,
      title: "Flask Logout Resource",
      code: "class Logout(Resource):\n    def post(self):\n        session.pop('user_id', None)\n        return {'message': 'Logged out'}, 200",
      notes: "Removes user_id from session with pop.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1027,
      title: "Flask User Model with Bcrypt",
      code: "class User(db.Model):\n    __tablename__ = 'users'\n    id = db.Column(db.Integer, primary_key=True)\n    name = db.Column(db.String(100), nullable=False)\n    email = db.Column(db.String(100), unique=True, nullable=False)\n    _password_hash = db.Column(db.String(128), nullable=False)\n    cheats = db.relationship('Cheat', backref='user', lazy=True, cascade='all, delete-orphan')\n    def __init__(self, name, email, password):\n        self.name = name\n        self.email = email\n        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')\n    def authenticate(self, password):\n        return bcrypt.check_password_hash(self._password_hash, password)",
      notes: "User model with secure password hashing.",
      language_id: 5,
      category_id: 2,
      user_id: 1
    },
    {
      id: 1028,
      title: "Loading State for Auth Context",
      code: "const { loading, loggedIn, user } = useAuth();\nif (loading) return <div>Loading...</div>;",
      notes: "Check loading state from auth context at top of component.",
      language_id: 6,
      category_id: 11,
      user_id: 1
    },
    {
      id: 1029,
      title: "Curl POST Create User",
      code: "curl -X POST http://localhost:5556/api/users \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"name\": \"Josh\", \"email\": \"josh@josh.com\", \"password\": \"1111\"}'",
      notes: "curl POST request to create user.",
      language_id: 9,
      category_id: 3,
      user_id: 1
    },
    {
      id: 1030,
      title: "Curl POST Login",
      code: "curl -X POST http://localhost:5556/api/login \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"email\": \"josh@josh.com\", \"password\": \"1111\"}'",
      notes: "curl POST request to login.",
      language_id: 9,
      category_id: 3,
      user_id: 1
    },
    {
      id: 1031,
      title: "Autocomplete Filter on Input",
      code: "const filteredCheats = cheats.filter(cheat => cheat.title.toLowerCase().includes(searchTerm.toLowerCase()));",
      notes: "Controlled input with searchTerm state.",
      language_id: 6,
      category_id: 11,
      user_id: 1
    },
    {
      id: 1032,
      title: "Query All Records",
      code: "users = User.query.all()",
      notes: "Returns list of all records from table.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1033,
      title: "Query First Record",
      code: "user = User.query.filter_by(email=\"josh@josh.com\").first()",
      notes: "Returns first matching record or None if not found.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1034,
      title: "Check Relationship with any()",
      code: "has_python = user.cheats.any(Cheat.title.ilike('%python%'))",
      notes: "Used on collection relationships to check if any match condition.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1035,
      title: "Check Parent with has()",
      code: "Cheat.query.filter(Cheat.user.has(email=\"josh@josh.com\"))",
      notes: "Used on parent relationships to check if parent matches condition.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1036,
      title: "Count Query Results",
      code: "total = User.query.count()",
      notes: "Returns integer count without loading records.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1037,
      title: "Filter by Equality with filter_by()",
      code: "users = User.query.filter_by(name=\"Josh\").all()",
      notes: "Simple equality filtering using keyword arguments.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1038,
      title: "Filter Complex Conditions with filter()",
      code: "cheats = Cheat.query.filter(Cheat.language_id == 5, Cheat.category_id > 2).all()",
      notes: "Complex filtering with comparison operators and logic.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1039,
      title: "Get by Primary Key with session.get()",
      code: "user = db.session.get(User, 5)",
      notes: "Modern SQLAlchemy 2.0+ method for primary key lookup.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1040,
      title: "Case-Insensitive Search with ilike()",
      code: "users = User.query.filter(User.name.ilike('%josh%')).all()",
      notes: "Case-insensitive pattern matching.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1041,
      title: "Filter by List with in_()",
      code: "users = User.query.filter(User.id.in_([1, 2, 3])).all()",
      notes: "SQL IN clause for multiple values.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1042,
      title: "Sort Results with order_by()",
      code: "users = User.query.order_by(User.name).all()",
      notes: "Sorts query results by column.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1043,
      title: "Limit Results with limit()",
      code: "users = User.query.limit(10).all()",
      notes: "Limits number of results returned.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1044,
      title: "Access Relationship Records",
      code: "user_cheats = user.cheats",
      notes: "Access related records through relationship properties.",
      language_id: 5,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1045,
      title: "List Directory Contents with ls",
      code: "ls -la",
      notes: "Lists files and folders in current directory.",
      language_id: 9,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1046,
      title: "Print Working Directory with pwd",
      code: "pwd",
      notes: "Prints full path of current directory.",
      language_id: 9,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1047,
      title: "Move or Rename with mv",
      code: "mv oldname.txt newname.txt",
      notes: "Moves or renames files and directories.",
      language_id: 9,
      category_id: 8,
      user_id: 1
    },
    {
      id: 1048,
      title: "Marshmallow schema with ma.Method",
      code: "class UserSchema(ma.SQLAlchemyAutoSchema):\n    languages = ma.Method(\"get_languages_with_cheats\")",
      notes: "Custom serialization methods defined using ma.Method.",
      language_id: 5,
      category_id: 2,
      user_id: 1
    },
    {
      id: 1049,
      title: "Remove Screenshots in Downloads",
      code: "rm ~/Downloads/screenshot*.png",
      notes: "Removes all files titled 'screenshot_...' in Downloads.",
      language_id: 9,
      category_id: 8,
      user_id: 1
    }
  ]
};