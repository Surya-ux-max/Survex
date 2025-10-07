import { useState, useEffect } from 'react';

const AllChallenges = ({ user, onNavigate, highlightChallengeId, joinedChallenges, onJoinChallenge, onUpdateJoinedChallenge }) => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showJoinPopup, setShowJoinPopup] = useState(false);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedChallengeForProof, setSelectedChallengeForProof] = useState(null);
  const [proofFiles, setProofFiles] = useState([]);
  const [proofDescription, setProofDescription] = useState('');
  const [showProofSubmitPopup, setShowProofSubmitPopup] = useState(false);

  useEffect(() => {
    loadChallenges();
  }, []);

  useEffect(() => {
    if (highlightChallengeId && challenges.length > 0) {
      const challengeToHighlight = challenges.find(c => c._id === highlightChallengeId);
      if (challengeToHighlight) {
        setSelectedChallenge(challengeToHighlight);
      }
    }
  }, [highlightChallengeId, challenges]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setScrollPosition(currentScrollY);
      setShowScrollButtons(documentHeight > windowHeight && currentScrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadChallenges = async () => {
    try {
     
      const mockChallenges = [
        {
          _id: '1',
          title: 'Sri Eshwar Plastic-Free Week Challenge',
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
          title: 'Sri Eshwar Campus Tree Planting',
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
      setLoading(false);
    } catch (error) {
      console.error('Error loading challenges:', error);
      setLoading(false);
    }
  };

  const handleJoinChallenge = (challengeId) => {
    const challenge = challenges.find(c => c._id === challengeId);
    const isAlreadyJoined = joinedChallenges.some(jc => jc.challengeId === challengeId);
    
    if (!isAlreadyJoined && challenge) {
      const success = onJoinChallenge(challengeId, challenge);
      if (success) {
        
        setShowJoinPopup(true);
        setTimeout(() => setShowJoinPopup(false), 3000);
      }
    } else if (isAlreadyJoined) {
      alert('You have already joined this challenge! Check "My Challenges" to track your progress.');
    }
  };

  const handleSubmitProof = (challengeId) => {
    const joinedChallenge = joinedChallenges.find(jc => jc.challengeId === challengeId);
    if (joinedChallenge) {
      const challenge = challenges.find(c => c._id === challengeId);
      setSelectedChallengeForProof(challenge);
      setShowProofModal(true);
      setProofFiles([]);
      setProofDescription('');
    } else {
      alert('Please join the challenge first before submitting proof.');
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setProofFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setProofFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submitProofWithFiles = () => {
    if (proofFiles.length === 0 && !proofDescription.trim()) {
      alert('Please upload at least one file or add a description.');
      return;
    }

    onUpdateJoinedChallenge(selectedChallengeForProof._id, {
      submittedProof: true,
      proofStatus: 'under_review',
      proofFiles: proofFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      })),
      proofDescription: proofDescription
    });

    setShowProofModal(false);
    setShowProofSubmitPopup(true);
    setTimeout(() => setShowProofSubmitPopup(false), 3000);
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

  const isJoined = (challengeId) => {
    return joinedChallenges.some(jc => jc.challengeId === challengeId);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  const isNearTop = scrollPosition < window.innerHeight / 2;
  const isNearBottom = scrollPosition > document.documentElement.scrollHeight - window.innerHeight - window.innerHeight / 2;

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
                          backgroundColor: isJoined(challenge._id) ? '#4CAF50' : '#2E7D32',
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
                        {isJoined(challenge._id) ? '✅ Joined' : '🚀 Join'}
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
                          backgroundColor: isJoined(challenge._id) ? '#4CAF50' : '#2E7D32',
                          color: 'white',
                          border: 'none',
                          padding: '12px 25px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold'
                        }}
                      >
                        {isJoined(challenge._id) ? '✅ Already Joined' : '🚀 Join Challenge'}
                      </button>
                      
                      <button
                        onClick={() => handleSubmitProof(challenge._id)}
                        style={{
                          backgroundColor: isJoined(challenge._id) ? '#FF9800' : '#999',
                          color: 'white',
                          border: 'none',
                          padding: '12px 25px',
                          borderRadius: '8px',
                          cursor: isJoined(challenge._id) ? 'pointer' : 'not-allowed',
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

      {/* Responsive Scroll Buttons */}
      {showScrollButtons && (
        <div style={{
          position: 'fixed',
          right: window.innerWidth < 768 ? '15px' : '30px',
          bottom: window.innerWidth < 768 ? '20px' : '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 1000
        }}>
          {/* Challenge Counter */}
          <div style={{
            backgroundColor: 'rgba(46, 125, 50, 0.9)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: window.innerWidth < 768 ? '8px 12px' : '10px 15px',
            borderRadius: '25px',
            fontSize: window.innerWidth < 768 ? '12px' : '14px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
            minWidth: window.innerWidth < 768 ? '80px' : '100px'
          }}>
            <div style={{ fontSize: window.innerWidth < 768 ? '16px' : '18px' }}>🎯</div>
            <div style={{ fontSize: window.innerWidth < 768 ? '10px' : '12px', opacity: 0.9 }}>
              {filteredChallenges.length} of {challenges.length}
            </div>
            <div style={{ fontSize: window.innerWidth < 768 ? '10px' : '11px', opacity: 0.8 }}>
              Available
            </div>
          </div>

          {/* Scroll to Top Button */}
          {!isNearTop && (
            <button
              onClick={scrollToTop}
              style={{
                backgroundColor: 'rgba(46, 125, 50, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: window.innerWidth < 768 ? '50px' : '60px',
                height: window.innerWidth < 768 ? '50px' : '60px',
                color: 'white',
                cursor: 'pointer',
                fontSize: window.innerWidth < 768 ? '20px' : '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = 'rgba(27, 94, 32, 0.95)';
                e.target.style.boxShadow = '0 6px 20px rgba(46, 125, 50, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = 'rgba(46, 125, 50, 0.9)';
                e.target.style.boxShadow = '0 4px 15px rgba(46, 125, 50, 0.3)';
              }}
              title={`Scroll to Top (${challenges.length} total challenges)`}
            >
              ⬆️
            </button>
          )}

          {/* Scroll to Bottom Button */}
          {!isNearBottom && (
            <button
              onClick={scrollToBottom}
              style={{
                backgroundColor: 'rgba(46, 125, 50, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                width: window.innerWidth < 768 ? '50px' : '60px',
                height: window.innerWidth < 768 ? '50px' : '60px',
                color: 'white',
                cursor: 'pointer',
                fontSize: window.innerWidth < 768 ? '20px' : '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.backgroundColor = 'rgba(27, 94, 32, 0.95)';
                e.target.style.boxShadow = '0 6px 20px rgba(46, 125, 50, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.backgroundColor = 'rgba(46, 125, 50, 0.9)';
                e.target.style.boxShadow = '0 4px 15px rgba(46, 125, 50, 0.3)';
              }}
              title={`Scroll to Bottom (${challenges.length} total challenges)`}
            >
              ⬇️
            </button>
          )}
        </div>
      )}

      {/* Proof Submission Modal */}
      {showProofModal && selectedChallengeForProof && (
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
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '30px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#2E7D32', margin: 0 }}>📤 Submit Proof for Challenge</h3>
              <button
                onClick={() => setShowProofModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}>
              <h4 style={{ color: '#2E7D32', margin: '0 0 10px 0' }}>{selectedChallengeForProof.title}</h4>
              <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{selectedChallengeForProof.description}</p>
            </div>

            {/* File Upload Section */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#2E7D32' }}>
                📎 Upload Proof Files (Images, Documents, etc.)
              </label>
              <input
                type="file"
                multiple
                accept="image/*,application/pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px dashed #81C784',
                  borderRadius: '8px',
                  backgroundColor: '#F9F9F9',
                  cursor: 'pointer'
                }}
              />
              <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
                Supported formats: Images (JPG, PNG, GIF), PDF, Word documents, Text files
              </p>
            </div>

            {/* Uploaded Files Display */}
            {proofFiles.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ color: '#2E7D32', marginBottom: '10px' }}>📋 Uploaded Files:</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {proofFiles.map((file, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      backgroundColor: '#E8F5E8',
                      borderRadius: '8px',
                      border: '1px solid #81C784'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>
                          {file.type.startsWith('image/') ? '🖼️' : '📄'}
                        </span>
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{file.name}</div>
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#F44336',
                          cursor: 'pointer',
                          fontSize: '18px',
                          padding: '5px'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description Section */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#2E7D32' }}>
                📝 Description (Optional)
              </label>
              <textarea
                value={proofDescription}
                onChange={(e) => setProofDescription(e.target.value)}
                placeholder="Describe your achievement, what you did, challenges faced, etc..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '12px',
                  border: '2px solid #81C784',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowProofModal(false)}
                style={{
                  padding: '12px 24px',
                  border: '2px solid #81C784',
                  backgroundColor: 'white',
                  color: '#2E7D32',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </button>
              <button
                onClick={submitProofWithFiles}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🚀 Submit Proof
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Success Popup */}
      {showJoinPopup && (
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
          <span style={{ fontSize: '20px' }}>🎯</span>
          <span style={{ fontWeight: 'bold' }}>You joined the Challenge!</span>
        </div>
      )}

      {/* Proof Submit Success Popup */}
      {showProofSubmitPopup && (
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
          <span style={{ fontSize: '20px' }}>📤</span>
          <span style={{ fontWeight: 'bold' }}>Proof Submitted Successfully!</span>
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

export default AllChallenges;
