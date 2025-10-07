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
  const [currentPage, setCurrentPage] = useState('login');
  const [highlightChallengeId, setHighlightChallengeId] = useState(null);
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Always start with login page - clear any existing sessions
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Keep data but force fresh login
    const savedJoinedChallenges = localStorage.getItem('joinedChallenges');
    if (savedJoinedChallenges) {
      try {
        setJoinedChallenges(JSON.parse(savedJoinedChallenges));
      } catch (error) {
        console.error('Error parsing joined challenges:', error);
      }
    }

    // Load submissions from localStorage
    const savedSubmissions = localStorage.getItem('submissions');
    if (savedSubmissions) {
      try {
        setSubmissions(JSON.parse(savedSubmissions));
      } catch (error) {
        console.error('Error parsing submissions:', error);
      }
    }

    // Load posts from localStorage
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error parsing posts:', error);
      }
    }

    // Always start with login page
    setCurrentPage('login');
    setUser(null);
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

    // If proof is submitted, add to submissions for admin review
    if (updates.submittedProof && updates.proofStatus === 'under_review') {
      const submission = {
        id: Date.now().toString(),
        studentId: user._id,
        studentName: user.name,
        studentDepartment: user.department,
        challengeId: challengeId,
        proofFiles: updates.proofFiles || [],
        proofDescription: updates.proofDescription || '',
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      const updatedSubmissions = [...submissions, submission];
      setSubmissions(updatedSubmissions);
      localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    }
  };

  const handleUpdateUser = (updatedUserData) => {
    const newUser = { ...user, ...updatedUserData };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleSubmissionReview = (submissionId, action, adminComment = '') => {
    const updatedSubmissions = submissions.map(submission => {
      if (submission.id === submissionId) {
        const updatedSubmission = {
          ...submission,
          status: action,
          adminComment,
          reviewedAt: new Date().toISOString()
        };

        // If approved, award points to user
        if (action === 'approved') {
          // Find the challenge to get points
          const challengeId = submission.challengeId;
          // Award points (you can customize point values)
          const pointsToAward = 50; // Default points, can be made dynamic
          
          if (submission.studentId === user._id) {
            const updatedUser = {
              ...user,
              eco_points: (user.eco_points || 0) + pointsToAward
            };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }

          // Update joined challenge status
          const updatedJoinedChallenges = joinedChallenges.map(jc => 
            jc.challengeId === challengeId ? { 
              ...jc, 
              proofStatus: 'approved',
              status: 'Completed',
              progress: 100
            } : jc
          );
          setJoinedChallenges(updatedJoinedChallenges);
          localStorage.setItem('joinedChallenges', JSON.stringify(updatedJoinedChallenges));
        }

        return updatedSubmission;
      }
      return submission;
    });

    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now().toString(),
      studentId: user._id,
      author: {
        name: user.name,
        department: user.department
      },
      content: postData.content,
      timestamp: new Date().toISOString(),
      likes: 0,
      likedByAdmin: false,
      comments: [],
      ...postData
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likedByAdmin ? post.likes - 1 : post.likes + 1,
          likedByAdmin: !post.likedByAdmin
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('login');
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
    return (
      <AdminDashboard 
        user={user} 
        onNavigate={handleNavigate}
        submissions={submissions}
        onSubmissionReview={handleSubmissionReview}
        posts={posts}
        onLikePost={handleLikePost}
        onUpdateUser={handleUpdateUser}
      />
    );
  }

  return (
    <Dashboard 
      user={user} 
      onNavigate={handleNavigate}
      joinedChallenges={joinedChallenges}
      onJoinChallenge={handleJoinChallenge}
      onUpdateJoinedChallenge={handleUpdateJoinedChallenge}
      onUpdateUser={handleUpdateUser}
      onCreatePost={handleCreatePost}
      posts={posts}
      onLikePost={handleLikePost}
    />
  );
}

export default App;
