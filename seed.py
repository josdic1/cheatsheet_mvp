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
    language_names = ['Python', 'JavaScript', 'React', 'SQL']
    lang_objs = {name: Language(name=name) for name in language_names}
    db.session.add_all(lang_objs.values())
    db.session.commit()

    print("Creating categories...")
    category_names = ['Basics', 'Arrays', 'Functions', 'Loops', 'API', 'Database']
    cat_objs = {name: Category(name=name) for name in category_names}
    db.session.add_all(cat_objs.values())
    db.session.commit()

    print("Creating cheats...")
    cheats = [
        # ===================
        # BASICS
        # ===================
        Cheat(
            title='Python Variable',
            code='name = "Josh"',
            notes='Variables store data. No need to declare type.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Basics'].id
        ),
        Cheat(
            title='JS Variable',
            code='const name = "Josh";\nlet age = 25;',
            notes='Use const for values that won\'t change, let for ones that will.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Basics'].id
        ),
        Cheat(
            title='Python Print',
            code='print("Hello World")',
            notes='Outputs text to the terminal.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Basics'].id
        ),
        Cheat(
            title='JS Console Log',
            code='console.log("Hello World");',
            notes='Outputs text to browser or Node console.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Basics'].id
        ),
        Cheat(
            title='Python If/Else',
            code='if x > 10:\n    print("Big")\nelse:\n    print("Small")',
            notes='Runs code based on a condition.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Basics'].id
        ),
        Cheat(
            title='JS If/Else',
            code='if (x > 10) {\n  console.log("Big");\n} else {\n  console.log("Small");\n}',
            notes='Runs code based on a condition.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Basics'].id
        ),

        # ===================
        # ARRAYS
        # ===================
        Cheat(
            title='Python List',
            code='fruits = ["apple", "banana", "cherry"]',
            notes='Lists hold multiple items in order.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Arrays'].id
        ),
        Cheat(
            title='JS Array',
            code='const fruits = ["apple", "banana", "cherry"];',
            notes='Arrays hold multiple items in order.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Arrays'].id
        ),
        Cheat(
            title='Python List Append',
            code='fruits.append("orange")',
            notes='Adds item to end of list.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Arrays'].id
        ),
        Cheat(
            title='JS Array Push',
            code='fruits.push("orange");',
            notes='Adds item to end of array.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Arrays'].id
        ),
        Cheat(
            title='Python List Comprehension',
            code='evens = [x for x in nums if x % 2 == 0]',
            notes='Creates new list with only matching items.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Arrays'].id
        ),
        Cheat(
            title='JS Array Filter',
            code='const evens = nums.filter(x => x % 2 === 0);',
            notes='Creates new array with only matching items.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Arrays'].id
        ),
        Cheat(
            title='JS Array Map',
            code='const doubled = nums.map(x => x * 2);',
            notes='Transforms each item into something new.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Arrays'].id
        ),
        Cheat(
            title='React Render List',
            code='{items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))}',
            notes='Loop through data and render JSX for each.',
            user_id=u1.id,
            language_id=lang_objs['React'].id,
            category_id=cat_objs['Arrays'].id
        ),

        # ===================
        # FUNCTIONS
        # ===================
        Cheat(
            title='Python Function',
            code='def greet(name):\n    return f"Hello {name}"',
            notes='Functions are reusable blocks of code.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Functions'].id
        ),
        Cheat(
            title='JS Function',
            code='function greet(name) {\n  return `Hello ${name}`;\n}',
            notes='Functions are reusable blocks of code.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Functions'].id
        ),
        Cheat(
            title='JS Arrow Function',
            code='const greet = (name) => `Hello ${name}`;',
            notes='Shorter syntax for simple functions.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Functions'].id
        ),
        Cheat(
            title='React Component',
            code='function Welcome({ name }) {\n  return <h1>Hello {name}</h1>;\n}',
            notes='Components are functions that return JSX.',
            user_id=u1.id,
            language_id=lang_objs['React'].id,
            category_id=cat_objs['Functions'].id
        ),
        Cheat(
            title='React useState',
            code='const [count, setCount] = useState(0);',
            notes='Stores state in a component. Call setCount to update.',
            user_id=u1.id,
            language_id=lang_objs['React'].id,
            category_id=cat_objs['Functions'].id
        ),
        Cheat(
            title='React useEffect',
            code='useEffect(() => {\n  fetchData();\n}, []);',
            notes='Runs code when component mounts. Empty array = once.',
            user_id=u1.id,
            language_id=lang_objs['React'].id,
            category_id=cat_objs['Functions'].id
        ),

        # ===================
        # LOOPS
        # ===================
        Cheat(
            title='Python For Loop',
            code='for i in range(5):\n    print(i)',
            notes='Loops from 0 to 4.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Loops'].id
        ),
        Cheat(
            title='JS For Loop',
            code='for (let i = 0; i < 5; i++) {\n  console.log(i);\n}',
            notes='Loops from 0 to 4.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Loops'].id
        ),
        Cheat(
            title='Python For Each',
            code='for fruit in fruits:\n    print(fruit)',
            notes='Loops through each item in a list.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Loops'].id
        ),
        Cheat(
            title='JS forEach',
            code='fruits.forEach(fruit => {\n  console.log(fruit);\n});',
            notes='Loops through each item in an array.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Loops'].id
        ),
        Cheat(
            title='Python While Loop',
            code='while x < 10:\n    x += 1',
            notes='Keeps looping while condition is true.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Loops'].id
        ),
        Cheat(
            title='JS While Loop',
            code='while (x < 10) {\n  x++;\n}',
            notes='Keeps looping while condition is true.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['Loops'].id
        ),

        # ===================
        # API
        # ===================
        Cheat(
            title='JS Fetch GET',
            code='fetch("/api/users")\n  .then(res => res.json())\n  .then(data => console.log(data));',
            notes='Fetches data from server.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['API'].id
        ),
        Cheat(
            title='JS Fetch POST',
            code='fetch("/api/users", {\n  method: "POST",\n  headers: {"Content-Type": "application/json"},\n  body: JSON.stringify({ name: "Josh" })\n});',
            notes='Sends data to server.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['API'].id
        ),
        Cheat(
            title='JS Async/Await Fetch',
            code='const res = await fetch("/api/users");\nconst data = await res.json();',
            notes='Cleaner way to handle fetch. Must be in async function.',
            user_id=u1.id,
            language_id=lang_objs['JavaScript'].id,
            category_id=cat_objs['API'].id
        ),
        Cheat(
            title='Flask GET Route',
            code='@app.route("/users")\ndef get_users():\n    users = User.query.all()\n    return jsonify([u.to_dict() for u in users])',
            notes='Returns all users as JSON.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['API'].id
        ),
        Cheat(
            title='Flask POST Route',
            code='@app.route("/users", methods=["POST"])\ndef create_user():\n    data = request.json\n    user = User(name=data["name"])\n    db.session.add(user)\n    db.session.commit()\n    return jsonify(user.to_dict()), 201',
            notes='Creates a new user from JSON body.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['API'].id
        ),

        # ===================
        # DATABASE
        # ===================
        Cheat(
            title='SQL Select All',
            code='SELECT * FROM users;',
            notes='Gets every row from the users table.',
            user_id=u1.id,
            language_id=lang_objs['SQL'].id,
            category_id=cat_objs['Database'].id
        ),
        Cheat(
            title='SQL Select Where',
            code='SELECT * FROM users WHERE age > 21;',
            notes='Gets rows matching a condition.',
            user_id=u1.id,
            language_id=lang_objs['SQL'].id,
            category_id=cat_objs['Database'].id
        ),
        Cheat(
            title='SQL Insert',
            code='INSERT INTO users (name, email)\nVALUES ("Josh", "josh@email.com");',
            notes='Adds a new row to the table.',
            user_id=u1.id,
            language_id=lang_objs['SQL'].id,
            category_id=cat_objs['Database'].id
        ),
        Cheat(
            title='SQL Update',
            code='UPDATE users SET name = "Joshua"\nWHERE id = 1;',
            notes='Changes data in existing row.',
            user_id=u1.id,
            language_id=lang_objs['SQL'].id,
            category_id=cat_objs['Database'].id
        ),
        Cheat(
            title='SQL Delete',
            code='DELETE FROM users WHERE id = 1;',
            notes='Removes a row from the table.',
            user_id=u1.id,
            language_id=lang_objs['SQL'].id,
            category_id=cat_objs['Database'].id
        ),
        Cheat(
            title='SQLAlchemy Query All',
            code='users = User.query.all()',
            notes='Gets all users from database.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Database'].id
        ),
        Cheat(
            title='SQLAlchemy Query by ID',
            code='user = User.query.get(1)',
            notes='Gets user with id of 1.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Database'].id
        ),
        Cheat(
            title='SQLAlchemy Filter',
            code='users = User.query.filter_by(active=True).all()',
            notes='Gets all active users.',
            user_id=u1.id,
            language_id=lang_objs['Python'].id,
            category_id=cat_objs['Database'].id
        ),
    ]

    db.session.add_all(cheats)
    db.session.commit()

    print(f"Created {User.query.count()} user")
    print(f"Created {Language.query.count()} languages")
    print(f"Created {Category.query.count()} categories")
    print(f"Created {Cheat.query.count()} cheats")
    print("Database seeded successfully!")