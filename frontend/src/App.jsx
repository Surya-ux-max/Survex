import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard_final';
import Challenges from './pages/Challenges_simple';
import Rewards from './pages/Rewards_simple';
import Leaderboard from './pages/Leaderboard_simple';
import AdminPanel from './pages/AdminPanel_simple';
import Profile from './pages/Profile_simple';
import AllChallenges from './pages/AllChallenges';
import MyChallenges from './pages/MyChallenges';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [highlightChallengeId, setHighlightChallengeId] = useState(null);
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Load joined challenges from localStorage
        const savedJoinedChallenges = localStorage.getItem('joinedChallenges');
        if (savedJoinedChallenges) {
          setJoinedChallenges(JSON.parse(savedJoinedChallenges));
        }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('joinedChallenges');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    // Navigate based on user role
    if (userData.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleNavigate = (page, challengeId = null) => {
    setCurrentPage(page);
    setHighlightChallengeId(challengeId);
  };

  const handleJoinChallenge = (challengeId, challengeData = null) => {
    if (!joinedChallenges.find(jc => jc.challengeId === challengeId)) {
      const joinedChallenge = {
        challengeId,
        joinedDate: new Date().toISOString(),
        status: 'In Progress',
        progress: 0,
        submittedProof: false,
        proofStatus: 'pending',
        ...(challengeData && { challengeData })
      };
      
      const updatedJoinedChallenges = [...joinedChallenges, joinedChallenge];
      setJoinedChallenges(updatedJoinedChallenges);
      
      // Save to localStorage
      localStorage.setItem('joinedChallenges', JSON.stringify(updatedJoinedChallenges));
      
      return true; // Successfully joined
    }
    return false; // Already joined
  };

  const handleUpdateJoinedChallenge = (challengeId, updates) => {
    const updatedJoinedChallenges = joinedChallenges.map(jc => 
      jc.challengeId === challengeId ? { ...jc, ...updates } : jc
    );
    setJoinedChallenges(updatedJoinedChallenges);
    localStorage.setItem('joinedChallenges', JSON.stringify(updatedJoinedChallenges));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('dashboard');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#F5F5F5'
      }}>
        <div>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #2E7D32',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#2E7D32', fontSize: '18px' }}>Loading Windsurf Platform...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (currentPage === 'challenges') {
    return <Challenges user={user} onNavigate={handleNavigate} />;
  }
  
  if (currentPage === 'rewards') {
    return <Rewards user={user} onNavigate={handleNavigate} />;
  }
  
  if (currentPage === 'leaderboard') {
    return <Leaderboard user={user} onNavigate={handleNavigate} />;
  }
  
  if (currentPage === 'admin') {
    return <AdminPanel user={user} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'profile') {
    return <Profile user={user} onNavigate={handleNavigate} onUpdateUser={setUser} />;
  }

  if (currentPage === 'all-challenges') {
    return (
      <AllChallenges 
        user={user} 
        onNavigate={handleNavigate} 
        highlightChallengeId={highlightChallengeId}
        joinedChallenges={joinedChallenges}
        onJoinChallenge={handleJoinChallenge}
        onUpdateJoinedChallenge={handleUpdateJoinedChallenge}
      />
    );
  }

  if (currentPage === 'my-challenges') {
    return (
      <MyChallenges 
        user={user} 
        onNavigate={handleNavigate}
        joinedChallenges={joinedChallenges}
        onUpdateJoinedChallenge={handleUpdateJoinedChallenge}
      />
    );
  }

  if (currentPage === 'admin-dashboard') {
    return <AdminDashboard user={user} onNavigate={handleNavigate} />;
  }

  return (
    <Dashboard 
      user={user} 
      onNavigate={handleNavigate}
      joinedChallenges={joinedChallenges}
      onJoinChallenge={handleJoinChallenge}
      onUpdateJoinedChallenge={handleUpdateJoinedChallenge}
    />
  );
}

export default App;
