# 🌿 Windsurf - Campus Sustainability Social Media Platform

A comprehensive full-stack platform for Sri Eshwar College of Engineering that gamifies sustainability through social challenges, rewards, and community engagement.

## 🎯 Overview

Windsurf is a campus sustainability platform where students participate in eco-challenges, share achievements in a social feed, earn points and badges, while faculty and administrators manage challenges, verify submissions, and track analytics.

## ✨ Features

### 🔐 Authentication & Roles
- **JWT-based authentication** with role-based access control
- **Google OAuth integration** (domain-restricted to college emails)
- **Three user roles**: Student, Faculty, Admin
- **Secure password handling** with bcrypt

### 🏡 Student Features
- **Green Hub (Social Feed)**: Share posts, interact with likes/comments/shares
- **EcoQuest (Challenges)**: Join sustainability challenges and submit proof
- **Leaderboard**: Global, departmental, and weekly rankings
- **Rewards Store**: Redeem eco-points for certificates, merchandise, meal tokens
- **Profile Management**: Track progress, badges, and achievements
- **Points & Badges System**: 5-tier progression from Green Beginner to Legend

### 🌿 Challenge System
- **7 Categories**: Waste Management, Green Campus, Energy Conservation, Water Conservation, Sustainable Mobility, Awareness & Innovation, Community Impact
- **Submission Workflow**: Upload proof → Faculty verification → Auto-post to feed
- **Point Rewards**: Earn points for verified challenge completions
- **Real-time Updates**: Notifications for challenge updates and verifications

### 🏆 Gamification
- **Badge Tiers**: 🌱 Green Beginner → 🌿 Eco Learner → 🌾 Sustainability Hero → 🌳 Eco-Champion → 🏅 Legend
- **Leaderboards**: Global, departmental, and weekly rankings
- **Reward System**: Certificates, eco-merchandise, meal tokens, vouchers
- **Social Recognition**: Auto-posts for achievements, follower system

### 👨‍🏫 Faculty/Admin Features
- **Challenge Management**: Create, edit, and archive challenges
- **Submission Verification**: Review and approve/reject student submissions
- **Analytics Dashboard**: Participation rates, environmental impact metrics
- **Reward Management**: Create and manage reward catalog
- **User Management**: Monitor student engagement and progress

## 🛠️ Tech Stack

### Frontend
- **React.js 18** with modern hooks and functional components
- **Tailwind CSS** for responsive, utility-first styling
- **React Router** for client-side routing
- **Axios** for API communication
- **Chart.js & React-ChartJS-2** for analytics visualization
- **Lucide React** for consistent iconography
- **Vite** for fast development and building

### Backend
- **Python Flask** REST API with modular blueprint structure
- **MongoDB** with PyMongo for flexible document storage
- **JWT** for stateless authentication
- **bcrypt** for secure password hashing
- **Flask-CORS** for cross-origin resource sharing
- **Google OAuth 2.0** for social authentication

### Storage & Media
- **AWS S3** or **Cloudinary** for image/video storage
- **Local fallback** for development environments

### Database Schema
```
Collections:
- users: Profile data, points, badges, followers
- challenges: Challenge details, categories, deadlines
- submissions: Student submissions with verification status
- posts: Social feed posts with interactions
- rewards: Reward catalog with stock management
- leaderboard: Cached ranking data
```

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** and npm
- **Python 3.8+** and pip
- **MongoDB** (local or cloud)
- **Git**

### Backend Setup

1. **Clone and navigate to backend**
```bash
git clone <repository-url>
cd windsurf-platform/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Environment configuration**
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. **Configure environment variables**
```env
MONGODB_URI=mongodb://localhost:27017/windsurf
JWT_SECRET=your-secret-key-change-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_DOMAIN=student.college.edu
```

6. **Start the server**
```bash
python app.py
```
Backend runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

### Database Setup

**MongoDB Collections** are automatically created when the application runs. For production, ensure proper indexing:

```javascript
// Recommended indexes
db.users.createIndex({ "email": 1 }, { unique: true })
db.challenges.createIndex({ "status": 1, "category": 1 })
db.submissions.createIndex({ "verification_status": 1, "timestamp": -1 })
db.posts.createIndex({ "timestamp": -1 })
```

## 📁 Project Structure

```
windsurf-platform/
├── backend/
│   ├── app.py                 # Flask application entry point
│   ├── config.py              # Configuration settings
│   ├── requirements.txt       # Python dependencies
│   ├── models/               # Database models
│   │   ├── user.py
│   │   ├── challenge.py
│   │   ├── submission.py
│   │   ├── post.py
│   │   ├── reward.py
│   │   └── leaderboard.py
│   ├── routes/               # API endpoints
│   │   ├── auth.py
│   │   ├── challenges.py
│   │   ├── submissions.py
│   │   ├── feed.py
│   │   ├── leaderboard.py
│   │   ├── rewards.py
│   │   ├── users.py
│   │   └── analytics.py
│   └── utils/                # Utility functions
│       ├── jwt_helper.py
│       ├── file_upload.py
│       └── email_helper.py
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── FeedCard.jsx
│   │   │   ├── ChallengeCard.jsx
│   │   │   ├── RewardCard.jsx
│   │   │   └── ProgressRing.jsx
│   │   ├── pages/           # Main application pages
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Challenges.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Rewards.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── services/        # API communication
│   │   │   └── api.js
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # React entry point
│   ├── package.json         # Node.js dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── vite.config.js       # Vite build configuration
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Green**: `#2E7D32` - Main brand color
- **Primary Dark**: `#1B5E20` - Hover states
- **Primary Light**: `#4CAF50` - Accents
- **Secondary**: `#81C784` - Supporting elements
- **Background**: `#F5F5F5` - Page background

### Typography
- **Primary Font**: Poppins (headings, UI elements)
- **Secondary Font**: Inter (body text)
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Rounded corners, subtle shadows, white background
- **Buttons**: Primary (green), Secondary (gray), consistent padding
- **Forms**: Clean inputs with focus states, proper validation
- **Navigation**: Responsive navbar with role-based menu items

## 🔧 API Endpoints

### Authentication
```
POST /api/auth/register     # User registration
POST /api/auth/login        # Email/password login
POST /api/auth/google-login # Google OAuth login
GET  /api/auth/me          # Get current user
```

### Challenges
```
GET    /api/challenges           # List challenges
POST   /api/challenges           # Create challenge (admin/faculty)
GET    /api/challenges/:id       # Get challenge details
PUT    /api/challenges/:id       # Update challenge (admin/faculty)
DELETE /api/challenges/:id       # Archive challenge (admin/faculty)
POST   /api/challenges/:id/join  # Join challenge
```

### Submissions
```
POST /api/submissions              # Submit challenge proof
GET  /api/submissions/pending      # Get pending submissions (admin/faculty)
POST /api/submissions/:id/verify   # Verify submission (admin/faculty)
GET  /api/submissions/student/:id  # Get student submissions
```

### Social Feed
```
GET    /api/feed           # Get feed posts
POST   /api/feed           # Create post
POST   /api/feed/:id/like  # Like/unlike post
POST   /api/feed/:id/comment # Add comment
POST   /api/feed/:id/share   # Share post
```

### Leaderboard
```
GET /api/leaderboard/global              # Global leaderboard
GET /api/leaderboard/department/:dept    # Department leaderboard
GET /api/leaderboard/weekly              # Weekly leaderboard
GET /api/leaderboard/departments         # Department rankings
```

### Rewards
```
GET  /api/rewards              # List all rewards
GET  /api/rewards/available    # Get available rewards for user
POST /api/rewards              # Create reward (admin)
POST /api/rewards/:id/claim    # Claim reward
GET  /api/rewards/my-claims    # Get user's claimed rewards
```

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Role-based Access Control** (RBAC) for API endpoints
- **Password Hashing** with bcrypt and salt
- **Input Validation** and sanitization
- **CORS Configuration** for secure cross-origin requests
- **File Upload Security** with type and size validation
- **Domain Restriction** for college email authentication

## 🌱 Environmental Impact Tracking

The platform includes basic environmental impact calculations:
- **CO₂ Saved**: Estimated based on energy and transportation challenges
- **Water Conserved**: Tracked through water conservation challenges
- **Energy Saved**: Calculated from energy efficiency activities
- **Waste Recycled**: Measured through waste management challenges
- **Trees Planted**: Direct count from green campus activities

## 📱 Responsive Design

- **Mobile-First Approach** with Tailwind CSS
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-Friendly Interface** with appropriate button sizes
- **Optimized Images** with responsive sizing
- **Progressive Web App** ready structure

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
```bash
# Add Procfile
echo "web: gunicorn app:app" > Procfile

# Deploy to Heroku
heroku create windsurf-api
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
```bash
# Build for production
npm run build

# Deploy to Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Environment Variables for Production
```env
# Backend
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/windsurf
JWT_SECRET=your-super-secure-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
ALLOWED_DOMAIN=student.college.edu
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_S3_BUCKET=windsurf-media

# Frontend
VITE_API_URL=https://your-api-domain.com/api
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow **PEP 8** for Python code
- Use **ESLint** and **Prettier** for JavaScript
- Write **descriptive commit messages**
- Add **comments** for complex logic
- Test **API endpoints** before committing
- Ensure **responsive design** on all screen sizes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Sri Eshwar College of Engineering** for the sustainability initiative
- **React.js** and **Flask** communities for excellent documentation
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for flexible document storage
- **Lucide** for beautiful icons

## 📞 Support

For support and questions:
- **Email**: support@windsurf-platform.com
- **Documentation**: [Wiki](https://github.com/your-repo/windsurf-platform/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-repo/windsurf-platform/issues)

---

**Built with 💚 for a sustainable future** 🌍
