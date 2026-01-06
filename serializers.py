from extensions import ma
from models import User, Language, Category, Cheat


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ('_password_hash',)

    id = ma.auto_field()
    name = ma.auto_field()
    categories = ma.Method("get_categories")
    languages = ma.Method("get_languages")

    def get_categories(self, user):
        result = []
        for cat in user.categories:
            cheats = Cheat.query.filter_by(user_id=user.id, category_id=cat.id).all()
            result.append({
                "id": cat.id,
                "name": cat.name,
                "cheats": CheatSchema(many=True).dump(cheats)
            })
        return result

    def get_languages(self, user):
        result = []
        for lang in user.languages:
            cheats = Cheat.query.filter_by(user_id=user.id, language_id=lang.id).all()
            result.append({
                "id": lang.id,
                "name": lang.name,
                "cheats": CheatSchema(many=True).dump(cheats)
            })
        return result

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Category
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()

category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)


class LanguageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Language
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()

language_schema = LanguageSchema()
languages_schema = LanguageSchema(many=True)


class CheatSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Cheat
        load_instance = True

    id = ma.auto_field()
    title = ma.auto_field()
    code = ma.auto_field()
    notes = ma.auto_field()
    category_id = ma.auto_field()
    language_id = ma.auto_field()
    user_id = ma.auto_field()
    category = ma.Method("get_category_name")
    language = ma.Method("get_language_name")

    def get_language_name(self, cheat):
        return cheat.language.name
    
    def get_category_name(self, cheat):
        return cheat.category.name

cheat_schema = CheatSchema()
cheats_schema = CheatSchema(many=True)