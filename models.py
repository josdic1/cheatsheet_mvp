from extensions import db, bcrypt
from datetime import datetime, timezone
from sqlalchemy.ext.associationproxy import association_proxy

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationship to cheats
    cheats = db.relationship('Cheat', back_populates='user', cascade='all, delete-orphan')
    
    # User categories
    categories = db.relationship('Category', 
                                secondary='cheats',  # Cheats is the join table!
                                back_populates='users',
                                viewonly=True)
    
    # User languages
    languages = db.relationship('Language', 
                                secondary='cheats',  # Cheats is the join table!
                                back_populates='users',
                                viewonly=True)
    
    @property
    def password(self):
        raise AttributeError('password is not readable')
    
    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)


class Language(db.Model):
    __tablename__ = 'languages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationship to cheats
    cheats = db.relationship('Cheat', back_populates='language', cascade='all, delete-orphan')

    users = db.relationship('User',
                           secondary='cheats',
                           back_populates='languages',
                           viewonly=True)
    


class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Relationship to cheats
    cheats = db.relationship('Cheat', back_populates='category')
    
    users = db.relationship('User',
                           secondary='cheats',
                           back_populates='categories',
                           viewonly=True)


class Cheat(db.Model):
    __tablename__ = 'cheats'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=True, nullable=False)
    code = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    # Foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'), nullable=False)
    
    # Relationships back to parents
    user = db.relationship('User', back_populates='cheats')
    category = db.relationship('Category', back_populates='cheats')
    language = db.relationship('Language', back_populates='cheats')