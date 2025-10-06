import { useState, useEffect } from 'react';

const Dashboard = ({ user, onNavigate, joinedChallenges, onJoinChallenge, onUpdateJoinedChallenge }) => {
  const [challenges, setChallenges] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('challenges');
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [showRewardsPopup, setShowRewardsPopup] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showSharePopup, setShowSharePopup] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      // Load challenges (using same mock data as AllChallenges)
      const mockChallenges = [
        {
          _id: '1',
          title: 'Plastic-Free Week Challenge',
          description: 'Eliminate single-use plastics from your daily routine for one week.',
          category: 'Waste Reduction',
          difficulty: 'Medium',
          points: 50,
          duration: '7 days',
          participants: 45,
          status: 'Active',
          requirements: ['Document daily plastic usage', 'Find alternatives', 'Share progress'],
          tips: ['Use reusable bags', 'Carry water bottle', 'Choose bulk items']
        },
        {
          _id: '2',
          title: 'Campus Tree Planting',
          description: 'Plant and maintain trees around the campus area.',
          category: 'Environmental',
          difficulty: 'Easy',
          points: 75,
          duration: '1 day',
          participants: 32,
          status: 'Active',
          requirements: ['Attend planting session', 'Plant minimum 2 trees', 'Commit to maintenance'],
          tips: ['Wear comfortable clothes', 'Bring gloves', 'Stay hydrated']
        },
        {
          _id: '3',
          title: 'Energy Conservation Week',
          description: 'Reduce energy consumption in your dorm/home by 20%.',
          category: 'Energy',
          difficulty: 'Hard',
          points: 100,
          duration: '7 days',
          participants: 28,
          status: 'Active',
          requirements: ['Track energy usage', 'Implement conservation methods', 'Report savings'],
          tips: ['Use LED bulbs', 'Unplug devices', 'Optimize AC usage']
        },
        {
          _id: '4',
          title: 'Sustainable Transportation',
          description: 'Use eco-friendly transport for all campus commutes.',
          category: 'Transportation',
          difficulty: 'Medium',
          points: 60,
          duration: '5 days',
          participants: 38,
          status: 'Active',
          requirements: ['Use bike/walk/public transport', 'Log daily commutes', 'Calculate carbon savings'],
          tips: ['Plan routes ahead', 'Use campus bike sharing', 'Walk with friends']
        },
        {
          _id: '5',
          title: 'Zero Food Waste Challenge',
          description: 'Minimize food waste through smart planning and composting.',
          category: 'Waste Reduction',
          difficulty: 'Medium',
          points: 80,
          duration: '10 days',
          participants: 22,
          status: 'Active',
          requirements: ['Plan meals', 'Compost scraps', 'Track waste reduction'],
          tips: ['Buy only needed items', 'Store food properly', 'Share excess food']
        },
        {
          _id: '6',
          title: 'Water Conservation Drive',
          description: 'Implement water-saving techniques and track usage.',
          category: 'Water',
          difficulty: 'Easy',
          points: 40,
          duration: '7 days',
          participants: 55,
          status: 'Active',
          tips: ['Fix leaks immediately', 'Take shorter showers', 'Collect rainwater']
        }
      ];
      
      setChallenges(mockChallenges);

      // Load posts (with mock data)
      const mockPosts = [
        {
          _id: '1',
          content: 'Just completed my first plastic-free week challenge! Reduced my plastic usage by 80%. Feeling great about contributing to our planet! 🌱',
          student: { name: 'Priya Sharma', department: 'Environmental Science' },
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 15,
          comments: [{ text: 'Amazing work!' }],
          shares: 3
        },
        {
          _id: '2', 
          content: 'Organized a campus cleanup drive today. Collected 50kg of waste and planted 20 saplings. Small steps, big impact! 🌳',
          student: { name: 'Rahul Kumar', department: 'Computer Science' },
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          likes: 23,
          comments: [{ text: 'Inspiring!' }, { text: 'Count me in next time!' }],
          shares: 7
        }
      ];
      
      try {
        const postsRes = await fetch('http://localhost:5000/api/feed', { headers });
        const postsData = await postsRes.json();
        setPosts([...mockPosts, ...(postsData.posts || [])]);
      } catch {
        setPosts(mockPosts);
      }

      // Load notifications (mock data for released challenges)
      const mockNotifications = [
        {
          id: '1',
          challengeName: 'Plastic-Free Week Challenge',
          releaseDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
          challengeId: '1',
          type: 'new_challenge'
        },
        {
          id: '2',
          challengeName: 'Campus Tree Planting',
          releaseDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
          challengeId: '2',
          type: 'new_challenge'
        },
        {
          id: '3',
          challengeName: 'Energy Conservation Week',
          releaseDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
          challengeId: '3',
          type: 'new_challenge'
        },
        {
          id: '4',
          challengeName: 'Sustainable Transportation',
          releaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          challengeId: '4',
          type: 'new_challenge'
        },
        {
          id: '5',
          challengeName: 'Zero Food Waste Challenge',
          releaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          challengeId: '5',
          type: 'new_challenge'
        }
      ];
      
      setNotifications(mockNotifications);

    } catch (err) {
      setError('Failed to load data: ' + err.message);
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleSharePost = () => {
    if (newPost.trim()) {
      const newPostData = {
        _id: Date.now().toString(),
        user: user?.name || 'Anonymous',
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        shares: 0,
        image: postImage ? URL.createObjectURL(postImage) : null
      };
      
      setPosts(prev => [newPostData, ...prev]);
      setNewPost('');
      setPostImage(null);
      
      // Show success popup
      setShowSharePopup(true);
      setTimeout(() => setShowSharePopup(false), 3000);
    }
  };

  const handleJoinChallenge = (challengeId) => {
    const challenge = challenges.find(c => c._id === challengeId);
    const isAlreadyJoined = joinedChallenges.some(jc => jc.challengeId === challengeId);
    
    if (!isAlreadyJoined && challenge) {
      const success = onJoinChallenge(challengeId, challenge);
      if (success) {
        alert('Successfully joined the challenge! You can now track your progress in "My Challenges".');
      }
    } else if (isAlreadyJoined) {
      alert('You have already joined this challenge! Check "My Challenges" to track your progress.');
    }
  };

  const handleSubmitProof = (challengeId) => {
    const joinedChallenge = joinedChallenges.find(jc => jc.challengeId === challengeId);
    if (joinedChallenge) {
      onUpdateJoinedChallenge(challengeId, {
        submittedProof: true,
        proofStatus: 'under_review'
      });
      alert('Proof submitted successfully! It will be reviewed by admin.');
    } else {
      alert('Please join the challenge first before submitting proof.');
    }
  };

  const isJoined = (challengeId) => {
    return joinedChallenges.some(jc => jc.challengeId === challengeId);
  };

  const handleRedeemPoints = () => {
    const pointsToRedeem = parseInt(redeemPoints);
    const currentPoints = user?.eco_points || 0;
    
    if (!pointsToRedeem || pointsToRedeem <= 0) {
      alert('Please enter a valid number of points to redeem.');
      return;
    }
    
    if (pointsToRedeem > currentPoints) {
      alert(`You don't have enough points. You have ${currentPoints} points available.`);
      return;
    }
    
    // Process redemption
    alert(`Successfully redeemed ${pointsToRedeem} points! Your reward will be processed shortly.`);
    setShowRewardsPopup(false);
    setRedeemPoints('');
  };

  const handleNotificationClick = (challengeId) => {
    setShowNotifications(false);
    // Navigate to all challenges page and highlight the selected challenge
    onNavigate('all-challenges', challengeId);
  };

  const formatNotificationDate = (date) => {
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h2>Error: {error}</h2>
        <button onClick={loadData} style={{ padding: '10px', marginTop: '10px' }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      width: '100%'
    }}>
      {/* Navigation Header */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white', 
        padding: '15px',
        boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
        position: 'relative',
        '@media (min-width: 768px)': {
          padding: '20px'
        }
      }}>
        {/* Background Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(46, 125, 50, 0.4)',
          zIndex: 1
        }}></div>
        {/* Glass Effect Container */}
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
          gap: window.innerWidth < 768 ? '15px' : '0',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          padding: window.innerWidth < 768 ? '15px' : '20px',
          position: 'relative',
          zIndex: 2
        }}>
          <div>
            <h1 style={{ 
              margin: '0 0 5px 0', 
              fontSize: window.innerWidth < 768 ? '24px' : '32px', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              🌿 Survex Dashboard
            </h1>
            <p style={{ 
              margin: 0, 
              opacity: 0.95, 
              fontSize: window.innerWidth < 768 ? '14px' : '16px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              Welcome back, {user?.name || 'User'}! Ready to make a difference?
            </p>
          </div>
          
          {/* Header Icons */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: window.innerWidth < 768 ? '10px' : '15px',
            flexWrap: 'wrap'
          }}>
            {/* Eco Points */}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.25)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '10px 20px', 
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              💰 {user?.eco_points || 0} Points
            </div>

            {/* Notifications */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: 'white',
                  position: 'relative'
                }}
              >
                🔔
                {notifications.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: '#FF4444',
                    borderRadius: '50%',
                    width: '12px',
                    height: '12px',
                    fontSize: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    {notifications.length > 9 ? '9+' : notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '55px',
                  right: '0',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  border: '2px solid #81C784',
                  width: '350px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  zIndex: 1000
                }}>
                  {/* Header */}
                  <div style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #E0E0E0',
                    backgroundColor: '#E8F5E8',
                    borderRadius: '13px 13px 0 0'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h3 style={{
                        margin: 0,
                        color: '#2E7D32',
                        fontSize: '16px',
                        fontWeight: 'bold'
                      }}>
                        🔔 New Challenges
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => {
                            setShowNotifications(false);
                            onNavigate('all-challenges');
                          }}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#2E7D32',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                            padding: '0'
                          }}
                        >
                          View All
                        </button>
                        <button
                          onClick={() => setShowNotifications(false)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#666',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: '5px'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification.challengeId)}
                          style={{
                            padding: '15px 20px',
                            borderBottom: '1px solid #F0F0F0',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#F8F8F8';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '12px'
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: '#E8F5E8',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '18px',
                              flexShrink: 0
                            }}>
                              🎯
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{
                                fontWeight: 'bold',
                                color: '#2E7D32',
                                fontSize: '14px',
                                marginBottom: '4px'
                              }}>
                                New Challenge Released!
                              </div>
                              <div style={{
                                color: '#333',
                                fontSize: '13px',
                                marginBottom: '6px',
                                lineHeight: '1.4'
                              }}>
                                {notification.challengeName}
                              </div>
                              <div style={{
                                color: '#666',
                                fontSize: '11px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}>
                                <span>📅</span>
                                {formatNotificationDate(notification.releaseDate)}
                                <span style={{ margin: '0 4px' }}>•</span>
                                {notification.releaseDate.toLocaleDateString()} {notification.releaseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                            <div style={{
                              color: '#81C784',
                              fontSize: '16px',
                              flexShrink: 0
                            }}>
                              →
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{
                        padding: '40px 20px',
                        textAlign: 'center',
                        color: '#666'
                      }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔕</div>
                        <div>No new notifications</div>
                      </div>
                    )}
                  </div>

                </div>
              )}
            </div>

            {/* Achievements/Rewards */}
            <button 
              onClick={() => setShowRewardsPopup(true)}
              style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                cursor: 'pointer',
                fontSize: '20px',
                color: 'white'
              }}
            >
              🏆
            </button>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  cursor: 'pointer',
                  fontSize: '20px',
                  color: 'white'
                }}
              >
                👤
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '55px',
                  right: '0',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                  minWidth: '200px',
                  zIndex: 1000
                }}>
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setShowProfileDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#333',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    👤 My Details
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('my-challenges');
                      setShowProfileDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#333',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    🎯 My Challenges
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowProfileDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '15px 20px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#333'
                    }}
                  >
                    👋 Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        padding: window.innerWidth < 768 ? '15px' : '20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Banner Section */}
        <div style={{
          background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
          padding: window.innerWidth < 768 ? '20px' : '30px',
          borderRadius: '15px',
          marginBottom: window.innerWidth < 768 ? '20px' : '30px',
          border: '2px solid #81C784',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            color: '#2E7D32', 
            fontSize: window.innerWidth < 768 ? '20px' : '28px', 
            margin: '0 0 10px 0' 
          }}>
            🌱 Welcome to Your Sustainability Journey!
          </h2>
          <p style={{ 
            color: '#1B5E20', 
            fontSize: window.innerWidth < 768 ? '14px' : '16px', 
            margin: 0 
          }}>
            Track your eco-impact, participate in challenges, and connect with fellow green warriors!
          </p>
        </div>

        {/* GreenHUB Social Media Section */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: window.innerWidth < 768 ? '20px' : '25px',
          marginBottom: window.innerWidth < 768 ? '20px' : '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          border: '2px solid #81C784'
        }}>
          <h2 style={{ 
            color: '#2E7D32', 
            fontSize: window.innerWidth < 768 ? '20px' : '24px', 
            marginBottom: '20px' 
          }}>
            🌱 GreenHUB - Share Your Achievements
          </h2>
          
          {/* Post Creation */}
          <div style={{
            backgroundColor: '#F5F5F5',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px'
          }}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your sustainability achievements, eco-friendly activities, or green tips..."
              style={{
                width: '100%',
                minHeight: '80px',
                padding: '15px',
                border: '2px solid #81C784',
                borderRadius: '10px',
                fontSize: '16px',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
            <div style={{ 
              display: 'flex', 
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              justifyContent: 'space-between', 
              alignItems: window.innerWidth < 768 ? 'stretch' : 'center', 
              gap: window.innerWidth < 768 ? '15px' : '0',
              marginTop: '15px' 
            }}>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPostImage(e.target.files[0])}
                  style={{ display: 'none' }}
                  id="post-image"
                />
                <label
                  htmlFor="post-image"
                  style={{
                    backgroundColor: '#81C784',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: window.innerWidth < 768 ? '12px' : '14px',
                    marginRight: '10px',
                    display: 'inline-block'
                  }}
                >
                  📷 Add Photo
                </label>
                {postImage && <span style={{ color: '#2E7D32', fontSize: '14px' }}>✓ Image selected</span>}
              </div>
              <button
                onClick={handleSharePost}
                style={{
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  border: 'none',
                  padding: window.innerWidth < 768 ? '12px 20px' : '12px 25px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: window.innerWidth < 768 ? '14px' : '16px',
                  fontWeight: 'bold',
                  width: window.innerWidth < 768 ? '100%' : 'auto'
                }}
              >
                🌿 Share Post
              </button>
            </div>
          </div>

          {/* Posts Feed */}
          <div style={{
            maxHeight: '600px',
            overflowY: 'auto',
            paddingRight: '10px'
          }}>
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post._id} style={{
                  backgroundColor: '#F9F9F9',
                  padding: '20px',
                  borderRadius: '10px',
                  marginBottom: '15px',
                  border: '1px solid #E0E0E0'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#2E7D32',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      marginRight: '15px'
                    }}>
                      {post.student?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#2E7D32' }}>
                        {post.student?.name || 'User'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {new Date(post.timestamp).toLocaleDateString()} • {post.student?.department}
                      </div>
                    </div>
                  </div>
                  <p style={{ margin: '0 0 15px 0', fontSize: '16px', lineHeight: '1.5' }}>{post.content}</p>
                  
                  {/* Display image if available */}
                  {post.image && (
                    <div style={{ marginBottom: '15px' }}>
                      <img 
                        src={post.image} 
                        alt="Post attachment" 
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          borderRadius: '8px',
                          border: '1px solid #E0E0E0'
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4CAF50' }}>
                      👍 {post.likes || 0} likes
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2196F3' }}>
                      💬 {post.comments?.length || 0} comments
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FF9800' }}>
                      🔄 {post.shares || 0} shares
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌱</div>
                <p>No posts yet. Be the first to share your green journey!</p>
              </div>
            )}
          </div>
        </div>

        {/* Tabbed Interface */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: window.innerWidth < 768 ? '20px' : '25px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          border: '2px solid #81C784'
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 480 ? 'column' : 'row',
            borderBottom: '2px solid #E0E0E0',
            marginBottom: '25px',
            gap: window.innerWidth < 480 ? '10px' : '0'
          }}>
            <button
              onClick={() => setActiveTab('challenges')}
              style={{
                padding: window.innerWidth < 768 ? '10px 15px' : '15px 25px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: window.innerWidth < 768 ? '12px' : '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: activeTab === 'challenges' ? '3px solid #2E7D32' : '3px solid transparent',
                color: activeTab === 'challenges' ? '#2E7D32' : '#666',
                transition: 'all 0.3s',
                width: window.innerWidth < 480 ? '100%' : 'auto',
                textAlign: 'center'
              }}
            >
              🎯 Available Challenges
            </button>
            <button
              onClick={() => onNavigate('my-challenges')}
              style={{
                padding: window.innerWidth < 768 ? '10px 15px' : '15px 25px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: window.innerWidth < 768 ? '12px' : '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: '3px solid transparent',
                color: '#666',
                transition: 'all 0.3s',
                width: window.innerWidth < 480 ? '100%' : 'auto',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#2E7D32';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#666';
              }}
            >
              📋 My Challenges
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              style={{
                padding: window.innerWidth < 768 ? '10px 15px' : '15px 25px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: window.innerWidth < 768 ? '12px' : '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: activeTab === 'leaderboard' ? '3px solid #2E7D32' : '3px solid transparent',
                color: activeTab === 'leaderboard' ? '#2E7D32' : '#666',
                transition: 'all 0.3s',
                width: window.innerWidth < 480 ? '100%' : 'auto',
                textAlign: 'center'
              }}
            >
              🏆 View Leaderboard
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'challenges' && (
            <div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px' 
              }}>
                <h3 style={{ 
                  color: '#2E7D32', 
                  fontSize: window.innerWidth < 768 ? '18px' : '22px', 
                  margin: 0 
                }}>
                  🎯 Available Challenges
                </h3>
                <button
                  onClick={() => onNavigate('all-challenges')}
                  style={{
                    backgroundColor: 'transparent',
                    border: '2px solid #2E7D32',
                    color: '#2E7D32',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2E7D32';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#2E7D32';
                  }}
                >
                  View All Challenges →
                </button>
              </div>
              <div style={{ 
                display: 'flex',
                overflowX: 'auto',
                gap: '20px',
                paddingBottom: '10px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#81C784 #f1f1f1'
              }}>
                <style>
                  {`
                    div::-webkit-scrollbar {
                      height: 8px;
                    }
                    div::-webkit-scrollbar-track {
                      background: #f1f1f1;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb {
                      background: #81C784;
                      border-radius: 10px;
                    }
                    div::-webkit-scrollbar-thumb:hover {
                      background: #2E7D32;
                    }
                  `}
                </style>
                {challenges.length > 0 ? (
                  // Show up to 6 challenges, but only 3 visible at once
                  challenges.slice(0, 6).map(challenge => (
                    <div key={challenge._id} style={{
                      border: '2px solid #81C784',
                      padding: '20px',
                      borderRadius: '15px',
                      backgroundColor: '#F9F9F9',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      minWidth: '320px',
                      maxWidth: '320px',
                      flexShrink: 0
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(46, 125, 50, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <h4 style={{ margin: '0 0 10px 0', color: '#2E7D32', fontSize: '18px' }}>
                        {challenge.title}
                      </h4>
                      <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '14px', lineHeight: '1.5' }}>
                        {challenge.description}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span style={{
                          backgroundColor: '#4CAF50',
                          color: 'white',
                          padding: '5px 15px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          {challenge.points} Points
                        </span>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                          📂 {challenge.category}
                        </span>
                      </div>
                      
                      {/* Image Upload Section */}
                      <div style={{
                        backgroundColor: '#E8F5E8',
                        padding: '15px',
                        borderRadius: '10px',
                        marginBottom: '15px'
                      }}>
                        <p style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold', color: '#2E7D32' }}>
                          📷 Submit Your Proof:
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          id={`challenge-${challenge._id}`}
                        />
                        <label
                          htmlFor={`challenge-${challenge._id}`}
                          style={{
                            backgroundColor: '#81C784',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            marginRight: '10px'
                          }}
                        >
                          📸 Upload Image
                        </label>
                        <button
                          onClick={() => handleSubmitProof(challenge._id)}
                          style={{
                            backgroundColor: isJoined(challenge._id) ? '#2E7D32' : '#999',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            cursor: isJoined(challenge._id) ? 'pointer' : 'not-allowed',
                            fontSize: '12px'
                          }}
                        >
                          ✅ Submit Proof
                        </button>
                      </div>

                      <button
                        onClick={() => handleJoinChallenge(challenge._id)}
                        style={{
                          width: '100%',
                          backgroundColor: isJoined(challenge._id) ? '#4CAF50' : '#2E7D32',
                          color: 'white',
                          border: 'none',
                          padding: '12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        {isJoined(challenge._id) ? '✅ Joined' : '🚀 Join Challenge'}
                      </button>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px', color: '#666', gridColumn: '1 / -1' }}>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎯</div>
                    <p>No challenges available at the moment.</p>
                  </div>
                )}
              </div>
            </div>
          )}


          {activeTab === 'leaderboard' && (
            <div>
              <h3 style={{ 
                color: '#2E7D32', 
                fontSize: window.innerWidth < 768 ? '18px' : '22px', 
                marginBottom: '20px' 
              }}>
                🏆 Leaderboard - Top Eco Warriors
              </h3>
              <div style={{
                backgroundColor: '#F9F9F9',
                borderRadius: '10px',
                padding: window.innerWidth < 768 ? '15px' : '20px'
              }}>
                {/* Leaderboard Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '50px 1fr 80px' : '60px 1fr 100px 120px',
                  gap: window.innerWidth < 768 ? '10px' : '15px',
                  padding: window.innerWidth < 768 ? '12px' : '15px',
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  fontSize: window.innerWidth < 768 ? '12px' : '14px'
                }}>
                  <div>Rank</div>
                  <div>Student</div>
                  <div>Points</div>
                  {window.innerWidth >= 768 && <div>Challenges</div>}
                </div>

                {/* Sample Leaderboard Data */}
                {[
                  { rank: 1, name: user?.name || 'You', points: user?.eco_points || 250, challenges: 5, isUser: true },
                  { rank: 2, name: 'Priya Sharma', points: 320, challenges: 7, isUser: false },
                  { rank: 3, name: 'Rahul Kumar', points: 280, challenges: 6, isUser: false },
                  { rank: 4, name: 'Anita Patel', points: 240, challenges: 5, isUser: false },
                  { rank: 5, name: 'Vikram Singh', points: 220, challenges: 4, isUser: false }
                ].map(student => (
                  <div
                    key={student.rank}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: window.innerWidth < 768 ? '50px 1fr 80px' : '60px 1fr 100px 120px',
                      gap: window.innerWidth < 768 ? '10px' : '15px',
                      padding: window.innerWidth < 768 ? '12px' : '15px',
                      backgroundColor: student.isUser ? '#E8F5E8' : 'white',
                      border: student.isUser ? '2px solid #2E7D32' : '1px solid #E0E0E0',
                      borderRadius: '8px',
                      marginBottom: '10px',
                      alignItems: 'center',
                      fontSize: window.innerWidth < 768 ? '12px' : '14px'
                    }}
                  >
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>
                      {student.rank <= 3 ? ['🥇', '🥈', '🥉'][student.rank - 1] : `#${student.rank}`}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#2E7D32' }}>
                        {student.name} {student.isUser && '(You)'}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {user?.department || 'Computer Science'}
                      </div>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                      {student.points}
                    </div>
                    {window.innerWidth >= 768 && (
                      <div style={{ color: '#666' }}>
                        {student.challenges} completed
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rewards Popup */}
      {showRewardsPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '30px',
            width: '90%',
            maxWidth: '450px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '3px solid #81C784',
            position: 'relative'
          }}>
            {/* Close Icon */}
            <button
              onClick={() => {
                setShowRewardsPopup(false);
                setRedeemPoints('');
              }}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.color = '#333';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#666';
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🏆</div>
              <h2 style={{ 
                color: '#2E7D32', 
                fontSize: '24px', 
                margin: '0 0 8px 0',
                fontWeight: 'bold'
              }}>
                My Reward Points
              </h2>
              <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                Redeem your eco points for exciting rewards
              </p>
            </div>

            {/* Current Points Display */}
            <div style={{
              backgroundColor: '#E8F5E8',
              border: '2px solid #81C784',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>
                Available Points
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: '#2E7D32',
                textShadow: '2px 2px 4px rgba(46, 125, 50, 0.2)'
              }}>
                💰 {user?.eco_points || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                Eco Points
              </div>
            </div>

            {/* Redeem Section */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '12px', 
                fontWeight: 'bold', 
                color: '#2E7D32',
                fontSize: '16px'
              }}>
                Redeem Points
              </label>
              <input
                type="number"
                value={redeemPoints}
                onChange={(e) => setRedeemPoints(e.target.value)}
                placeholder="Enter points to redeem"
                min="1"
                max={user?.eco_points || 0}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #81C784',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  textAlign: 'center'
                }}
              />
              <div style={{ 
                fontSize: '11px', 
                color: '#666', 
                marginTop: '6px',
                textAlign: 'center'
              }}>
                Maximum: {user?.eco_points || 0} points
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => {
                  setShowRewardsPopup(false);
                  setRedeemPoints('');
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #666',
                  color: '#666',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  minWidth: '120px'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#666';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#666';
                }}
              >
                Close
              </button>
              
              <button
                onClick={handleRedeemPoints}
                style={{
                  backgroundColor: '#2E7D32',
                  border: '2px solid #2E7D32',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  minWidth: '120px',
                  boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#1B5E20';
                  e.target.style.borderColor = '#1B5E20';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(46, 125, 50, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#2E7D32';
                  e.target.style.borderColor = '#2E7D32';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(46, 125, 50, 0.3)';
                }}
              >
                🎁 Redeem
              </button>
            </div>

            {/* Quick Redeem Options */}
            <div style={{ marginTop: '18px' }}>
              <div style={{ 
                fontSize: '12px', 
                color: '#666', 
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Quick Select:
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '10px', 
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {[50, 100, 250, 500].filter(amount => amount <= (user?.eco_points || 0)).map(amount => (
                  <button
                    key={amount}
                    onClick={() => setRedeemPoints(amount.toString())}
                    style={{
                      backgroundColor: redeemPoints === amount.toString() ? '#81C784' : 'transparent',
                      border: '1px solid #81C784',
                      color: redeemPoints === amount.toString() ? 'white' : '#81C784',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s'
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Success Popup */}
      {showSharePopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <span style={{ fontWeight: 'bold' }}>Your Achievement is Shared!</span>
        </div>
      )}

      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
