import { useState, useEffect } from 'react';

const AllChallenges = ({ user, onNavigate, highlightChallengeId }) => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadChallenges();
  }, []);

  useEffect(() => {
    // Auto-select highlighted challenge when challenges are loaded
    if (highlightChallengeId && challenges.length > 0) {
      const challengeToHighlight = challenges.find(c => c._id === highlightChallengeId);
      if (challengeToHighlight) {
        setSelectedChallenge(challengeToHighlight);
      }
    }
  }, [highlightChallengeId, challenges]);

  const loadChallenges = async () => {
    try {
      // Mock challenges data with more variety
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
      
      // Mock some joined challenges for demonstration
      setJoinedChallenges(['1', '3']);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading challenges:', error);
      setLoading(false);
    }
  };

  const handleJoinChallenge = (challengeId) => {
    if (!joinedChallenges.includes(challengeId)) {
      setJoinedChallenges(prev => [...prev, challengeId]);
      alert('Successfully joined the challenge!');
    }
  };

  const handleSubmitProof = (challengeId) => {
    if (joinedChallenges.includes(challengeId)) {
      alert('Proof submitted successfully! It will be reviewed by admin.');
    } else {
      alert('Please join the challenge first before submitting proof.');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#F44336';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Waste Reduction': return '♻️';
      case 'Environmental': return '🌳';
      case 'Energy': return '⚡';
      case 'Transportation': return '🚲';
      case 'Water': return '💧';
      default: return '🌱';
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = filterCategory === 'all' || challenge.category === filterCategory;
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(challenges.map(c => c.category))];

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Loading Challenges...</h2>
      </div>
    );
  }

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#F5F5F5'
    }}>
      {/* Header */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        padding: '20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(46, 125, 50, 0.4)',
          zIndex: 1
        }}></div>
        
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          padding: '20px',
          position: 'relative',
          zIndex: 2
        }}>
          <div>
            <h1 style={{ 
              margin: '0 0 5px 0', 
              fontSize: '32px', 
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              🎯 All Challenges
            </h1>
            <p style={{ 
              margin: 0, 
              opacity: 0.95, 
              fontSize: '16px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              Explore all available sustainability challenges
            </p>
          </div>
          
          <button
            onClick={() => onNavigate('dashboard')}
            style={{
              backgroundColor: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              padding: '12px 24px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{ 
        padding: '30px 20px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          border: '2px solid #81C784'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: '20px', 
            alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
            marginBottom: '20px' 
          }}>
            {/* Search */}
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="🔍 Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #81C784',
                  borderRadius: '25px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                style={{
                  padding: '12px 16px',
                  border: '2px solid #81C784',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: 'white',
                  minWidth: '200px'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : `${getCategoryIcon(category)} ${category}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ 
            fontSize: '16px', 
            color: '#666',
            textAlign: 'center'
          }}>
            Showing {filteredChallenges.length} of {challenges.length} challenges
          </div>
        </div>

        {/* Challenges Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #81C784'
          }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '2fr 1fr 1fr 1fr 1fr 150px',
            gap: '15px',
            padding: '20px',
            backgroundColor: '#2E7D32',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>
            <div>Challenge</div>
            {window.innerWidth >= 768 && (
              <>
                <div>Category</div>
                <div>Difficulty</div>
                <div>Points</div>
                <div>Participants</div>
                <div>Action</div>
              </>
            )}
          </div>

          {/* Table Body */}
          {filteredChallenges.map((challenge, index) => (
            <div key={challenge._id}>
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '2fr 1fr 1fr 1fr 1fr 150px',
                  gap: '15px',
                  padding: '20px',
                  borderBottom: index < filteredChallenges.length - 1 ? '1px solid #E0E0E0' : 'none',
                  backgroundColor: selectedChallenge?._id === challenge._id ? '#E8F5E8' : 
                                 (highlightChallengeId === challenge._id ? '#FFF3E0' : 'white'),
                  border: highlightChallengeId === challenge._id ? '2px solid #FF9800' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderRadius: highlightChallengeId === challenge._id ? '8px' : '0',
                  margin: highlightChallengeId === challenge._id ? '5px' : '0'
                }}
                onClick={() => setSelectedChallenge(selectedChallenge?._id === challenge._id ? null : challenge)}
                onMouseOver={(e) => {
                  if (selectedChallenge?._id !== challenge._id) {
                    if (highlightChallengeId === challenge._id) {
                      e.currentTarget.style.backgroundColor = '#FFE0B2';
                    } else {
                      e.currentTarget.style.backgroundColor = '#F5F5F5';
                    }
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedChallenge?._id !== challenge._id) {
                    if (highlightChallengeId === challenge._id) {
                      e.currentTarget.style.backgroundColor = '#FFF3E0';
                    } else {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }
                }}
              >
                <div>
                  <div style={{ fontWeight: 'bold', color: '#2E7D32', marginBottom: '5px' }}>
                    {challenge.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
                    {challenge.description}
                  </div>
                  {window.innerWidth < 768 && (
                    <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                      {getCategoryIcon(challenge.category)} {challenge.category} • 
                      <span style={{ color: getDifficultyColor(challenge.difficulty) }}> {challenge.difficulty}</span> • 
                      {challenge.points} pts • {challenge.participants} participants
                    </div>
                  )}
                </div>
                
                {window.innerWidth >= 768 && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ marginRight: '5px' }}>{getCategoryIcon(challenge.category)}</span>
                      {challenge.category}
                    </div>
                    <div>
                      <span style={{ 
                        color: getDifficultyColor(challenge.difficulty),
                        fontWeight: 'bold'
                      }}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#2E7D32' }}>
                      {challenge.points} pts
                    </div>
                    <div style={{ color: '#666' }}>
                      {challenge.participants} joined
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleJoinChallenge(challenge._id)}
                        style={{
                          backgroundColor: joinedChallenges.includes(challenge._id) ? '#4CAF50' : '#2E7D32',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          width: '100%'
                        }}
                      >
                        {joinedChallenges.includes(challenge._id) ? '✅ Joined' : '🚀 Join'}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Detailed View */}
              {selectedChallenge?._id === challenge._id && (
                <div style={{
                  padding: '25px',
                  backgroundColor: '#E8F5E8',
                  borderTop: '2px solid #81C784'
                }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
                    gap: '30px' 
                  }}>
                    <div>
                      <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>📋 Requirements</h4>
                      <ul style={{ paddingLeft: '20px', color: '#666' }}>
                        {challenge.requirements.map((req, idx) => (
                          <li key={idx} style={{ marginBottom: '8px' }}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>💡 Tips</h4>
                      <ul style={{ paddingLeft: '20px', color: '#666' }}>
                        {challenge.tips.map((tip, idx) => (
                          <li key={idx} style={{ marginBottom: '8px' }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div style={{ 
                    marginTop: '25px', 
                    padding: '20px', 
                    backgroundColor: 'white', 
                    borderRadius: '10px',
                    border: '1px solid #81C784'
                  }}>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: window.innerWidth < 768 ? '1fr 1fr' : 'repeat(4, 1fr)',
                      gap: '20px',
                      textAlign: 'center'
                    }}>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>
                          {challenge.duration}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Duration</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>
                          {challenge.points}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Points</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2E7D32' }}>
                          {challenge.participants}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Participants</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 'bold', color: getDifficultyColor(challenge.difficulty) }}>
                          {challenge.difficulty}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>Difficulty</div>
                      </div>
                    </div>

                    <div style={{ 
                      marginTop: '20px', 
                      display: 'flex', 
                      gap: '15px',
                      justifyContent: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => handleJoinChallenge(challenge._id)}
                        style={{
                          backgroundColor: joinedChallenges.includes(challenge._id) ? '#4CAF50' : '#2E7D32',
                          color: 'white',
                          border: 'none',
                          padding: '12px 25px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        {joinedChallenges.includes(challenge._id) ? '✅ Already Joined' : '🚀 Join Challenge'}
                      </button>
                      
                      <button
                        onClick={() => handleSubmitProof(challenge._id)}
                        style={{
                          backgroundColor: joinedChallenges.includes(challenge._id) ? '#FF9800' : '#999',
                          color: 'white',
                          border: 'none',
                          padding: '12px 25px',
                          borderRadius: '8px',
                          cursor: joinedChallenges.includes(challenge._id) ? 'pointer' : 'not-allowed',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        📸 Submit Proof
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

          {filteredChallenges.length === 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '60px',
            textAlign: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #81C784'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ color: '#2E7D32', marginBottom: '10px' }}>No challenges found</h3>
            <p style={{ color: '#666' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllChallenges;
