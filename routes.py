from flask import request, jsonify, session
from flask_restful import Resource
from extensions import db
from models import User, Cheat, Language, Category 
from serializers import user_schema, users_schema, language_schema, languages_schema, category_schema, categories_schema, cheat_schema, cheats_schema


class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.get(user_id)
            return {
                "logged_in": True,
                "user": user_schema.dump(user)
            }, 200
        return {"logged_in": False}, 401


### =========== USER ROUTES =========== ###
class UserDetail(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return user_schema.dump(user), 200

class UserList(Resource):
    def get(self):
        users = User.query.all()
        return users_schema.dump(users), 200
    
    def post(self):  
        data = request.json
        user = User(
            name=data['name'],
            email=data['email']
        )
        user.password = data['password']
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return user_schema.dump(user), 201
    
class Login(Resource):
    def post(self):
        data = request.json
        user = User.query.filter_by(email=data['email']).first()
        if user and user.check_password(data['password']):
            session['user_id'] = user.id
            return user_schema.dump(user), 200
        return {'error': 'Invalid email or password'}, 401

class Logout(Resource):
    def post(self):
        session.pop('user_id', None)
        return {}, 204
    
class Signup(Resource):
    def post(self):
        data = request.json
        user = User(
            name=data['name'],
            email=data['email']
        )
        user.password = data['password']
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return user_schema.dump(user), 201


### =========== LANGUAGE ROUTES =========== ###
class LanguageDetail(Resource):
    def get(self, id):
        language = Language.query.get_or_404(id)
        return language_schema.dump(language), 200

class LanguageList(Resource):
    def get(self):
        languages = Language.query.all()
        return languages_schema.dump(languages), 200


### =========== CATEGORY ROUTES =========== ###
class CategoryDetail(Resource):
    def get(self, id):
        category = Category.query.get_or_404(id)
        return category_schema.dump(category), 200

class CategoryList(Resource):
    def get(self):
        categories = Category.query.all()
        return categories_schema.dump(categories), 200


### =========== CHEAT ROUTES =========== ###
class CheatDetail(Resource):
    def get(self, id):
        cheat = Cheat.query.get_or_404(id)
        return cheat_schema.dump(cheat), 200
        
    def delete(self, id):
        cheat = Cheat.query.get_or_404(id)
        db.session.delete(cheat)
        db.session.commit()
        return {}, 204
    
    def patch(self, id):
        cheat = Cheat.query.get_or_404(id)
        data = request.json
        cheat.title = data.get('title', cheat.title)
        cheat.code = data.get('code', cheat.code)
        cheat.notes = data.get('notes', cheat.notes)
        cheat.language_id = data.get('language_id', cheat.language_id)
        cheat.category_id = data.get('category_id', cheat.category_id)
        db.session.commit()
        return cheat_schema.dump(cheat), 200

class CheatList(Resource):
    def get(self):
        cheats = Cheat.query.all()
        return cheats_schema.dump(cheats), 200
    
    def post(self):
        data = request.json
        user = User.query.get(data['user_id'])
        category = Category.query.get(data['category_id'])
        language = Language.query.get(data['language_id'])
        
        cheat = Cheat(
            title=data['title'],
            code=data['code'],
            notes=data.get('notes', ''),
            user=user,
            category=category,
            language=language
        )
        db.session.add(cheat)
        db.session.commit()
        return cheat_schema.dump(cheat), 201




### =========== ROUTE INITIALIZATION =========== ###
    
def initialize_routes(api):
    api.add_resource(UserList, '/api/users')
    api.add_resource(UserDetail, '/api/users/<int:id>')
    api.add_resource(CheckSession, '/api/check_session')
    api.add_resource(Login, '/api/login')
    api.add_resource(Logout, '/api/logout')
    api.add_resource(Signup, '/api/signup')
    api.add_resource(LanguageList, '/api/languages')
    api.add_resource(LanguageDetail, '/api/languages/<int:id>')
    api.add_resource(CategoryList, '/api/categories')
    api.add_resource(CategoryDetail, '/api/categories/<int:id>')
    api.add_resource(CheatList, '/api/cheats')
    api.add_resource(CheatDetail, '/api/cheats/<int:id>')
