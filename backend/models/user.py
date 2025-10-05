from pymongo import MongoClient
from bson.objectid import ObjectId
import bcrypt
from config import Config

client = MongoClient(Config.MONGODB_URI)
db = client.get_default_database()
users_collection = db.users

def create_user(name, email, password, role='student', department=None, year=None):
    """Create a new user"""
    # Check if user already exists
    if users_collection.find_one({'email': email}):
        return None
    
    # Hash password
    password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    user = {
        'name': name,
        'email': email,
        'password_hash': password_hash,
        'role': role,
        'department': department,
        'year': year,
        'eco_points': 0,
        'badges': ['🌱 Green Beginner'],
        'avatar_url': None,
        'followers': [],
        'following': [],
        'created_at': None
    }
    
    result = users_collection.insert_one(user)
    user['_id'] = result.inserted_id
    return user

def verify_password(email, password):
    """Verify user password"""
    user = users_collection.find_one({'email': email})
    if not user:
        return None
    
    if bcrypt.checkpw(password.encode('utf-8'), user['password_hash']):
        return user
    return None

def get_user_by_id(user_id):
    """Get user by ID"""
    return users_collection.find_one({'_id': ObjectId(user_id)})

def get_user_by_email(email):
    """Get user by email"""
    return users_collection.find_one({'email': email})

def update_user_points(user_id, points_to_add):
    """Update user points and recalculate badge"""
    user = get_user_by_id(user_id)
    if not user:
        return None
    
    new_points = user.get('eco_points', 0) + points_to_add
    
    # Determine badge tier
    current_badge = '🌱 Green Beginner'
    for tier in reversed(Config.BADGE_TIERS):
        if new_points >= tier['min_points']:
            current_badge = f"{tier['emoji']} {tier['name']}"
            break
    
    # Update badges list if new badge achieved
    badges = user.get('badges', ['🌱 Green Beginner'])
    if current_badge not in badges:
        badges.append(current_badge)
    
    users_collection.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': {'eco_points': new_points, 'badges': badges}}
    )
    
    return new_points

def update_user_profile(user_id, updates):
    """Update user profile"""
    users_collection.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': updates}
    )
    return get_user_by_id(user_id)

def follow_user(follower_id, following_id):
    """Follow another user"""
    users_collection.update_one(
        {'_id': ObjectId(follower_id)},
        {'$addToSet': {'following': str(following_id)}}
    )
    users_collection.update_one(
        {'_id': ObjectId(following_id)},
        {'$addToSet': {'followers': str(follower_id)}}
    )
    return True

def unfollow_user(follower_id, following_id):
    """Unfollow a user"""
    users_collection.update_one(
        {'_id': ObjectId(follower_id)},
        {'$pull': {'following': str(following_id)}}
    )
    users_collection.update_one(
        {'_id': ObjectId(following_id)},
        {'$pull': {'followers': str(follower_id)}}
    )
    return True
