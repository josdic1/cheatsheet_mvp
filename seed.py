from extensions import db, bcrypt
from models import User, Category, Language, Cheat
from app import create_app

app = create_app()

with app.app_context():
    print("Deleting existing data...")
    Cheat.query.delete()
    Category.query.delete()
    Language.query.delete()
    User.query.delete()
    db.session.commit()

    print("Creating user...")
    u1 = User(name='Josh', email='josh@josh.com')
    u1.password = '1111'
    db.session.add(u1)
    db.session.commit()

    print("Creating languages...")
    language_names = ['CSS','HTML','JavaScript','JSON','Python','React','Regex','SQL','Terminal','Xml']
    lang_objs = {name: Language(name=name) for name in language_names}
    db.session.add_all(lang_objs.values())
    db.session.commit()

    print("Creating categories...")
    category_names = ['Arrays','Classes','Curl','Functions','Images','Loops','Manipulation','Methods','Startup','Filters','Components']
    cat_objs = {name: Category(name=name) for name in category_names}
    db.session.add_all(cat_objs.values())
    db.session.commit()

    print("Creating cheats...")
    cheats = [
    Cheat(
        title='New Vite React Project',
        code='npm create vite@latest client -- --template react\ncd client\nnpm install\nnpm install react-router-dom lucide-react',
        notes='Executed from existing client folder with router and lucide',
        user_id=u1.id,
        language_id=lang_objs['Terminal'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Initial and Use Migration',
        code='flask db init\nflask db migrate -m "initial migration"\nflask db upgrade',
        notes='First time setup: init creates migrations folder. After changing models: migrate creates migration file. upgrade applies changes to database. Run from server directory.',
        user_id=u1.id,
        language_id=lang_objs['Terminal'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Flask GET Route with jsonify',
        code='@app.route(\'/cheats\', methods=[\'GET\'])\ndef get_cheats():\n    cheats = Cheat.query.all()\n    return jsonify([cheat.to_dict() for cheat in cheats]), 200',
        notes='Standard Flask route decorator. Query all cheats from database. Use list comprehension with to_dict() to serialize. jsonify converts to JSON response. Returns 200 status. Use when not using Flask-RESTful.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='React Router Setup in main.jsx',
        code='import { createRoot } from \'react-dom/client\'\nimport { createBrowserRouter, RouterProvider } from \'react-router-dom\'\nimport { routes } from \'./routes.jsx\'\nimport \'./index.css\'\n\nconst router = createBrowserRouter(routes)\nconst root = createRoot(document.getElementById(\'root\'))\nroot.render(<RouterProvider router={router} />)',
        notes='Entry point for React app with React Router. Import routes from separate file. createBrowserRouter sets up routing. RouterProvider wraps app with router. Renders into root div.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Vite Proxy Configuration',
        code='import { defineConfig } from \'vite\'\nimport react from \'@vitejs/plugin-react\'\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    proxy: {\n      \'/api\': {\n        target: \'http://localhost:5555\',\n        changeOrigin: true,\n        rewrite: (path) => path.replace(/^\\/api/, \'\')\n      }\n    }\n  }\n})',
        notes='Proxies /api requests to Flask backend at port 5555. rewrite strips /api prefix before sending to Flask. Avoids CORS issues in development.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Create React Context',
        code='import { createContext } from "react";\n\nexport const AuthContext = createContext();',
        notes='Creates context object for sharing state across components. Export to use in provider and custom hook.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='React Router Routes Setup',
        code='import App from \'./App.jsx\';\nimport { ErrorPage } from \'./pages/ErrorPage.jsx\';\nimport { ProtectedRoute } from \'./components/ProtectedRoute.jsx\';\n\nexport const routes = [\n    {\n        path: \'/\',\n        element: <ProtectedRoute><App /></ProtectedRoute>,\n        errorElement: <ErrorPage />\n    }\n];',
        notes='Exports routes array for React Router. Wrap protected routes in ProtectedRoute component.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Protected Route Component',
        code='import { Navigate } from \'react-router-dom\';\nimport { useAuth } from \'../hooks/useAuth\';\n\nexport function ProtectedRoute({ children }) {\n    const { loggedIn, loading } = useAuth();\n    if (loading) return <div>Loading...</div>;\n    if (!loggedIn) return <Navigate to="/login" replace />;\n    return children;\n}',
        notes='Wraps routes that require authentication. Redirects to login if not logged in.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Components'].id
    ),
    Cheat(
        title='Basic Error Page Component',
        code='import { useRouteError, useNavigate } from "react-router-dom";\n\nexport function ErrorPage() {\n    const error = useRouteError();\n    const navigate = useNavigate();\n    return (\n        <div className="error-container">\n            <h1>Oops!</h1>\n            <p>Sorry, an unexpected error has occurred.</p>\n            <p><i>{error.statusText || error.message}</i></p>\n            <button onClick={() => navigate(\'/\')}>Go Home</button>\n        </div>\n    );\n}',
        notes='Catches routing errors with useRouteError hook. Displays error message and Go Home button.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Components'].id
    ),
    Cheat(
        title='Flask Extensions File',
        code='from flask_sqlalchemy import SQLAlchemy\nfrom flask_migrate import Migrate\nfrom flask_bcrypt import Bcrypt\nfrom flask_cors import CORS\n\ndb = SQLAlchemy()\nmigrate = Migrate()\nbcrypt = Bcrypt()\ncors = CORS()',
        notes='Centralized file for Flask extensions. Initialize in create_app().',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Flask Configuration File',
        code='import os\n\nclass Config:\n    SQLALCHEMY_DATABASE_URI = os.getenv(\'DATABASE_URI\', \'sqlite:///app.db\')\n    SQLALCHEMY_TRACK_MODIFICATIONS = False\n    SECRET_KEY = os.getenv(\'SECRET_KEY\', \'dev-secret-key-change-in-production\')',
        notes='Configuration class for Flask settings. Import in create_app with app.config.from_object(Config).',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Flask Run File',
        code='from app import create_app\n\napp = create_app()\n\nif __name__ == \'__main__\':\n    app.run(port=5555, debug=True)',
        notes='Entry point to run Flask app. Execute with python run.py from server directory.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Startup'].id
    ),
    Cheat(
        title='Password Hashing with Bcrypt',
        code='from extensions import bcrypt\nhashed = bcrypt.generate_password_hash("password123").decode("utf-8")',
        notes='Generates secure hashed password. Decode for storing as string.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Check Password with Bcrypt',
        code='bcrypt.check_password_hash(user.password, "password123")',
        notes='Validates a plain password against hashed password.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='React useState Hook',
        code='const [count, setCount] = useState(0);',
        notes='Declare state variable in React functional component.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='React useEffect Hook',
        code='useEffect(() => { console.log("Mounted or updated") }, [count]);',
        notes='Runs effect on mount and when dependencies change.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Fetch GET Example',
        code='fetch("/api/cheats").then(res => res.json()).then(data => console.log(data))',
        notes='Basic GET request using fetch in JS.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Fetch POST Example',
        code='fetch("/api/cheats", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({title:"New Cheat"}) })',
        notes='Basic POST request using fetch in JS.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Regex Match Example',
        code='const regex = /abc/gi;\nconst result = "abcABC".match(regex);',
        notes='Matches regex pattern globally and case-insensitive.',
        user_id=u1.id,
        language_id=lang_objs['Regex'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Python List Comprehension',
        code='squares = [x**2 for x in range(10)]',
        notes='Creates list of squares from 0 to 9.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Arrays'].id
    ),
    Cheat(
        title='Python Dictionary Comprehension',
        code='square_dict = {x: x**2 for x in range(10)}',
        notes='Creates dict mapping numbers to their squares.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Arrays'].id
    ),
    Cheat(
        title='Python Class Example',
        code='class User:\n    def __init__(self, name):\n        self.name = name\n    def greet(self):\n        return f"Hello {self.name}"',
        notes='Simple Python class with init and method.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Classes'].id
    ),
    Cheat(
        title='React Functional Component',
        code='function Hello() {\n    return <h1>Hello World</h1>;\n}',
        notes='Basic React functional component.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Components'].id
    ),
    Cheat(
        title='React Component with Props',
        code='function Greet({ name }) {\n    return <p>Hello {name}</p>;\n}',
        notes='React functional component using props.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Components'].id
    ),
    Cheat(
        title='Array Map Example',
        code='const nums = [1,2,3];\nconst squares = nums.map(n => n*n);',
        notes='Maps array values to new array using function.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Arrays'].id
    ),
    Cheat(
        title='Array Filter Example',
        code='const nums = [1,2,3,4];\nconst evens = nums.filter(n => n%2===0);',
        notes='Filters array elements based on condition.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Arrays'].id
    ),
    Cheat(
        title='SQL SELECT Example',
        code='SELECT * FROM cheats WHERE language_id=1;',
        notes='Select all cheats for language_id 1.',
        user_id=u1.id,
        language_id=lang_objs['SQL'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='SQL INSERT Example',
        code='INSERT INTO cheats (title, code, notes) VALUES ("New", "code", "notes");',
        notes='Insert new cheat into table.',
        user_id=u1.id,
        language_id=lang_objs['SQL'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Python For Loop',
        code='for i in range(5):\n    print(i)',
        notes='Loops 0 to 4.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Loops'].id
    ),
    Cheat(
        title='Python While Loop',
        code='i = 0\nwhile i < 5:\n    print(i)\n    i += 1',
        notes='While loop counting 0 to 4.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Loops'].id
    ),
    Cheat(
        title='JS For Loop',
        code='for(let i=0;i<5;i++){console.log(i)}',
        notes='JavaScript for loop counting 0 to 4.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Loops'].id
    ),
    Cheat(
        title='JS While Loop',
        code='let i=0; while(i<5){console.log(i); i++;}',
        notes='JavaScript while loop counting 0 to 4.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Loops'].id
    ),
    Cheat(
        title='Python Function Example',
        code='def add(a,b):\n    return a+b',
        notes='Defines a function that returns sum.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Functions'].id
    ),
    Cheat(
        title='JS Function Example',
        code='function add(a,b){return a+b;}',
        notes='Defines JavaScript function returning sum.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Functions'].id
    ),
    Cheat(
        title='React useNavigate Example',
        code='import { useNavigate } from "react-router-dom";\nconst navigate = useNavigate();\nnavigate("/home");',
        notes='Programmatically navigate to another route in React.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='JS Array Push Example',
        code='const arr=[];\narr.push(1);\narr.push(2);',
        notes='Adds elements to end of array.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Arrays'].id
    ),
    Cheat(
        title='JS Array Pop Example',
        code='const arr=[1,2];\narr.pop();',
        notes='Removes last element of array.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Arrays'].id
    ),
    Cheat(
        title='JSON Parse Example',
        code='const obj = JSON.parse(\'{"name":"Josh"}\');',
        notes='Parse JSON string into JavaScript object.',
        user_id=u1.id,
        language_id=lang_objs['JSON'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='JSON Stringify Example',
        code='const str = JSON.stringify({name:"Josh"});',
        notes='Convert JavaScript object into JSON string.',
        user_id=u1.id,
        language_id=lang_objs['JSON'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Python Read File',
        code='with open("file.txt","r") as f:\n    content = f.read()',
        notes='Reads content from text file.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Python Write File',
        code='with open("file.txt","w") as f:\n    f.write("Hello")',
        notes='Writes string to file, overwriting existing.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='React Conditional Render',
        code='{loggedIn ? <Dashboard /> : <Login /> }',
        notes='Render component conditionally based on state.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='JS Object Destructuring',
        code='const {a,b} = {a:1,b:2};',
        notes='Extract properties from object into variables.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='JS Array Destructuring',
        code='const [x,y] = [1,2];',
        notes='Extract values from array into variables.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='React onClick Example',
        code='<button onClick={() => console.log("clicked")}>Click</button>',
        notes='Basic click handler in React JSX.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Python If Statement',
        code='x=5\nif x>0:\n    print("Positive")',
        notes='Basic if condition in Python.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Filters'].id
    ),
    Cheat(
        title='Python If-Else Statement',
        code='x=5\nif x>0:\n    print("Positive")\nelse:\n    print("Non-positive")',
        notes='If-else condition in Python.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Filters'].id
    ),
    Cheat(
        title='JS Ternary Operator',
        code='const status = loggedIn ? "Yes" : "No";',
        notes='Ternary for conditional assignment in JS.',
        user_id=u1.id,
        language_id=lang_objs['JavaScript'].id,
        category_id=cat_objs['Filters'].id
    ),
    Cheat(
        title='React useRef Example',
        code='const inputRef = useRef();\n<input ref={inputRef} />',
        notes='Create reference to DOM element in React.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Methods'].id
    ),
    Cheat(
        title='Python Lambda Example',
        code='add = lambda x,y: x+y\nprint(add(2,3))',
        notes='Defines anonymous function using lambda.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Functions'].id
    ),
    Cheat(
        title='Python Map Example',
        code='nums = [1,2,3]\nsquared = list(map(lambda x: x**2, nums))',
        notes='Applies function to each element in list.',
        user_id=u1.id,
        language_id=lang_objs['Python'].id,
        category_id=cat_objs['Arrays'].id
    ),
    Cheat(
        title='React useContext Example',
        code='const { user } = useContext(AuthContext);',
        notes='Access context value in React functional component.',
        user_id=u1.id,
        language_id=lang_objs['React'].id,
        category_id=cat_objs['Methods'].id
    )
]


    # Add all cheats to session
    db.session.add_all(cheats)
    db.session.commit()

    print(f"Created {User.query.count()} users")
    print(f"Created {Language.query.count()} languages")
    print(f"Created {Category.query.count()} categories")
    print(f"Created {Cheat.query.count()} cheats")
    print("Database seeded successfully!")
