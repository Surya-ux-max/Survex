import { useState, useEffect } from 'react';

const AdminDashboard = ({ user, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('greenhub');
  const [challenges, setChallenges] = useState([]);
  const [students, setStudents] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'Medium',
    points: '',
    duration: '',
    requirements: [''],
    tips: ['']
  });
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showProfileComponent, setShowProfileComponent] = useState(false);
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Dr. Rajesh Kumar',
    email: 'admin@sece.ac.in',
    phone: '+91 9876543210',
    department: 'Environmental Sciences',
    designation: 'Head of Sustainability',
    experience: '15 years',
    specialization: 'Environmental Management & Green Technologies'
  });

  useEffect(() => {
    loadAdminData();
    // Load admin profile from localStorage
    const savedProfile = localStorage.getItem('adminProfile');
    if (savedProfile) {
      setAdminProfile(JSON.parse(savedProfile));
    }
  }, []);

  const loadAdminData = async () => {
    try {
      // Mock admin data
      const mockChallenges = [
        {
          _id: '1',
          title: 'Plastic-Free Week Challenge',
          description: 'Eliminate single-use plastics from your daily routine for one week.',
          category: 'Waste Reduction',
          difficulty: 'Medium',
          points: 50,
          duration: '7 days',
          status: 'Active',
          participants: 45,
          completions: 32,
          createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '2',
          title: 'Campus Tree Planting',
          description: 'Plant and maintain trees around the campus area.',
          category: 'Environmental',
          difficulty: 'Easy',
          points: 75,
          duration: '1 day',
          status: 'Active',
          participants: 32,
          completions: 28,
          createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          _id: '3',
          title: 'Energy Conservation Week',
          description: 'Reduce energy consumption in your dorm/home by 20%.',
          category: 'Energy',
          difficulty: 'Hard',
          points: 100,
          duration: '7 days',
          status: 'Active',
          participants: 28,
          completions: 15,
          createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      const mockStudents = [
        { _id: '1', name: 'Priya Sharma', email: 'priya.sharma@sece.ac.in', department: 'Environmental Science', eco_points: 320, challenges_completed: 7, status: 'Active', joinedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '2', name: 'Rahul Kumar', email: 'rahul.kumar@sece.ac.in', department: 'Computer Science', eco_points: 280, challenges_completed: 6, status: 'Active', joinedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '3', name: 'Anita Patel', email: 'anita.patel@sece.ac.in', department: 'Business Administration', eco_points: 240, challenges_completed: 5, status: 'Active', joinedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '4', name: 'Vikram Singh', email: 'vikram.singh@sece.ac.in', department: 'Mechanical Engineering', eco_points: 220, challenges_completed: 4, status: 'Active', joinedDate: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '5', name: 'Sneha Reddy', email: 'sneha.reddy@sece.ac.in', department: 'Civil Engineering', eco_points: 200, challenges_completed: 4, status: 'Active', joinedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '6', name: 'Arjun Nair', email: 'arjun.nair@sece.ac.in', department: 'Electrical Engineering', eco_points: 185, challenges_completed: 3, status: 'Active', joinedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '7', name: 'Kavya Iyer', email: 'kavya.iyer@sece.ac.in', department: 'Electronics Engineering', eco_points: 170, challenges_completed: 3, status: 'Active', joinedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '8', name: 'Ravi Krishnan', email: 'ravi.krishnan@sece.ac.in', department: 'Information Technology', eco_points: 155, challenges_completed: 3, status: 'Active', joinedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '9', name: 'Meera Gupta', email: 'meera.gupta@sece.ac.in', department: 'Chemical Engineering', eco_points: 140, challenges_completed: 2, status: 'Active', joinedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '10', name: 'Karthik Raj', email: 'karthik.raj@sece.ac.in', department: 'Automobile Engineering', eco_points: 125, challenges_completed: 2, status: 'Active', joinedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '11', name: 'Divya Menon', email: 'divya.menon@sece.ac.in', department: 'Biotechnology', eco_points: 110, challenges_completed: 2, status: 'Active', joinedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '12', name: 'Suresh Babu', email: 'suresh.babu@sece.ac.in', department: 'Aeronautical Engineering', eco_points: 95, challenges_completed: 1, status: 'Active', joinedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '13', name: 'Lakshmi Priya', email: 'lakshmi.priya@sece.ac.in', department: 'Food Technology', eco_points: 80, challenges_completed: 1, status: 'Active', joinedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '14', name: 'Arun Kumar', email: 'arun.kumar@sece.ac.in', department: 'Textile Technology', eco_points: 65, challenges_completed: 1, status: 'Active', joinedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
        { _id: '15', name: 'Pooja Srinivas', email: 'pooja.srinivas@sece.ac.in', department: 'Fashion Technology', eco_points: 50, challenges_completed: 1, status: 'Active', joinedDate: new Date().toISOString() }
      ];

      const mockSubmissions = [
        {
          _id: '1',
          challengeId: '1',
          challengeTitle: 'Plastic-Free Week Challenge',
          studentId: '1',
          studentName: 'Priya Sharma',
          submissionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Pending',
          proofImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
          description: 'Completed the plastic-free week by using reusable bags, bottles, and containers.'
        },
        {
          _id: '2',
          challengeId: '2',
          challengeTitle: 'Campus Tree Planting',
          studentId: '2',
          studentName: 'Rahul Kumar',
          submissionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Pending',
          proofImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
          description: 'Planted 3 saplings in the campus garden and committed to their maintenance.'
        },
        {
          _id: '3',
          challengeId: '3',
          challengeTitle: 'Energy Conservation Week',
          studentId: '3',
          studentName: 'Anita Patel',
          submissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'Approved',
          proofImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
          description: 'Reduced energy consumption by 25% through LED bulbs and efficient appliance usage.'
        }
      ];

      const mockAnalytics = {
        totalStudents: 156,
        activeChallenges: 8,
        totalSubmissions: 234,
        pendingReviews: 12,
        totalPointsAwarded: 15680,
        averageParticipation: 78,
        monthlyGrowth: 15.5,
        topCategories: [
          { name: 'Waste Reduction', count: 45 },
          { name: 'Energy', count: 38 },
          { name: 'Environmental', count: 32 },
          { name: 'Transportation', count: 28 }
        ]
      };

      const mockPosts = [
        {
          _id: '1',
          author: {
            name: 'Priya Sharma',
            department: 'Environmental Science'
          },
          content: 'Successfully completed the Plastic-Free Week Challenge! 🌱 Replaced all single-use plastics with reusable alternatives. The hardest part was finding plastic-free packaging, but I discovered some amazing local stores that offer bulk items. Feeling proud to contribute to a cleaner environment! #PlasticFree #SustainableLiving',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 24,
          likedByAdmin: false,
          proofImages: [
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
          ],
          comments: [
            {
              _id: 'c1',
              author: 'Rahul Kumar',
              content: 'Amazing work Priya! Which stores did you find for bulk items?',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
            },
            {
              _id: 'c2',
              author: 'Anita Patel',
              content: 'This is so inspiring! I want to try this challenge next.',
              timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString()
            }
          ],
          challengeCompleted: 'Plastic-Free Week Challenge',
          pointsEarned: 50
        },
        {
          _id: '2',
          author: {
            name: 'Rahul Kumar',
            department: 'Computer Science'
          },
          content: 'Planted 5 saplings in the campus garden today! 🌳 Each tree can absorb up to 48 pounds of CO2 per year. It was amazing to work with fellow students and see everyone so passionate about making our campus greener. Looking forward to watching these trees grow over the years! #TreePlanting #GreenCampus',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          likes: 31,
          likedByAdmin: true,
          proofImages: [
            'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
          ],
          comments: [
            {
              _id: 'c3',
              author: 'Priya Sharma',
              content: 'Great job Rahul! Which area of campus did you plant them in?',
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
            }
          ],
          challengeCompleted: 'Campus Tree Planting',
          pointsEarned: 75
        },
        {
          _id: '3',
          author: {
            name: 'Anita Patel',
            department: 'Business Administration'
          },
          content: 'Week 1 of Energy Conservation Challenge complete! ⚡ Managed to reduce my dorm room energy consumption by 22% by switching to LED bulbs, unplugging devices when not in use, and using natural light during the day. Small changes can make a big difference! Sharing my energy usage tracking sheet for anyone interested. #EnergyConservation #SustainableLiving',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          likes: 18,
          likedByAdmin: false,
          proofImages: [
            'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
          ],
          comments: [
            {
              _id: 'c4',
              author: 'Vikram Singh',
              content: 'Would love to see that tracking sheet! Can you share it?',
              timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString()
            }
          ],
          challengeCompleted: 'Energy Conservation Week',
          pointsEarned: 100
        },
        {
          _id: '4',
          author: {
            name: 'Vikram Singh',
            department: 'Mechanical Engineering'
          },
          content: 'Started using my bicycle for all campus commutes this week! 🚲 Not only am I reducing my carbon footprint, but I\'m also getting great exercise. The bike lanes on campus are well-maintained and it\'s actually faster than walking. Encouraging all my friends to join the sustainable transportation movement! #BikeToSchool #ZeroEmissions',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          likes: 27,
          likedByAdmin: true,
          proofImages: [
            'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
          ],
          comments: [
            {
              _id: 'c5',
              author: 'Anita Patel',
              content: 'I should get a bike too! Any recommendations for good campus bikes?',
              timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString()
            },
            {
              _id: 'c6',
              author: 'Priya Sharma',
              content: 'This is awesome Vikram! I\'ve been thinking about biking to classes too.',
              timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
            }
          ],
          challengeCompleted: 'Sustainable Transportation Week',
          pointsEarned: 60
        }
      ];

      setChallenges(mockChallenges);
      setStudents(mockStudents);
      setSubmissions(mockSubmissions);
      setAnalytics(mockAnalytics);
      setPosts(mockPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleCreateChallenge = () => {
    if (!newChallenge.title || !newChallenge.description || !newChallenge.category) {
      alert('Please fill in all required fields');
      return;
    }

    const challenge = {
      _id: Date.now().toString(),
      ...newChallenge,
      points: parseInt(newChallenge.points),
      status: 'Active',
      participants: 0,
      completions: 0,
      createdDate: new Date().toISOString(),
      requirements: newChallenge.requirements.filter(req => req.trim() !== ''),
      tips: newChallenge.tips.filter(tip => tip.trim() !== '')
    };

    setChallenges(prev => [challenge, ...prev]);
    setNewChallenge({
      title: '',
      description: '',
      category: '',
      difficulty: 'Medium',
      points: '',
      duration: '',
      requirements: [''],
      tips: ['']
    });
    setShowCreateChallenge(false);
    setShowSuccessPopup(true);
    
    // Auto hide success popup after 3 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  const handleSubmissionReview = (submissionId, action) => {
    setSubmissions(prev => 
      prev.map(submission => 
        submission._id === submissionId 
          ? { ...submission, status: action === 'approve' ? 'Approved' : 'Rejected' }
          : submission
      )
    );
    
    if (action === 'approve') {
      // Update student points (in real app, this would be handled by backend)
      const submission = submissions.find(s => s._id === submissionId);
      const challenge = challenges.find(c => c._id === submission.challengeId);
      
      setStudents(prev => 
        prev.map(student => 
          student._id === submission.studentId 
            ? { 
                ...student, 
                eco_points: student.eco_points + challenge.points,
                challenges_completed: student.challenges_completed + 1
              }
            : student
        )
      );
      
      // Show approval popup
      setShowApprovalPopup(true);
      setTimeout(() => setShowApprovalPopup(false), 3000);
    } else {
      alert('Submission rejected successfully!');
    }
  };

  const addRequirement = () => {
    setNewChallenge(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const addTip = () => {
    setNewChallenge(prev => ({
      ...prev,
      tips: [...prev.tips, '']
    }));
  };

  const updateRequirement = (index, value) => {
    setNewChallenge(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const updateTip = (index, value) => {
    setNewChallenge(prev => ({
      ...prev,
      tips: prev.tips.map((tip, i) => i === index ? value : tip)
    }));
  };

  const removeRequirement = (index) => {
    setNewChallenge(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const removeTip = (index) => {
    setNewChallenge(prev => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index)
    }));
  };

  const handleLikePost = (postId) => {
    setPosts(prev => 
      prev.map(post => 
        post._id === postId 
          ? { 
              ...post, 
              likes: post.likedByAdmin ? post.likes - 1 : post.likes + 1,
              likedByAdmin: !post.likedByAdmin
            }
          : post
      )
    );
  };

  const handleAddComment = (postId) => {
    const commentText = newComment[postId];
    if (!commentText || commentText.trim() === '') return;

    const newCommentObj = {
      _id: `admin_${Date.now()}`,
      author: user?.name || 'Admin',
      content: commentText.trim(),
      timestamp: new Date().toISOString(),
      isAdmin: true
    };

    setPosts(prev => 
      prev.map(post => 
        post._id === postId 
          ? { ...post, comments: [...post.comments, newCommentObj] }
          : post
      )
    );

    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComment(prev => ({ ...prev, [postId]: value }));
  };

  const handleProfileSave = () => {
    // In a real app, this would save to backend
    localStorage.setItem('adminProfile', JSON.stringify(adminProfile));
    setShowProfileEdit(false);
    alert('Profile updated successfully!');
  };

  const handleProfileChange = (field, value) => {
    setAdminProfile(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚙️</div>
          <h2 style={{ color: '#2E7D32' }}>Loading Admin Dashboard...</h2>
        </div>
      </div>
    );
  }

  // Admin Profile Component
  if (showProfileComponent) {
    return (
      <div style={{ 
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
        padding: '20px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
            gap: '15px'
          }}>
            <button
              onClick={() => setShowProfileComponent(false)}
              style={{
                backgroundColor: '#2E7D32',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ← Back to Dashboard
            </button>
            <h1 style={{ color: '#2E7D32', margin: 0 }}>Admin Profile Management</h1>
          </div>

          {/* Profile Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid #81C784',
            height: 'calc(100vh - 200px)',
            overflowY: 'auto'
          }}>
            {/* Profile Display */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#FF6B35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '32px'
                }}>
                  {adminProfile.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <h2 style={{ color: '#2E7D32', margin: '0 0 5px 0' }}>{adminProfile.name}</h2>
                  <p style={{ color: '#666', margin: '0 0 5px 0' }}>{adminProfile.designation}</p>
                  <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>{adminProfile.department}</p>
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2E7D32' }}>Full Name *</label>
                  <input
                    type="text"
                    value={adminProfile.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2E7D32' }}>Email Address *</label>
                  <input
                    type="email"
                    value={adminProfile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2E7D32' }}>Phone Number</label>
                  <input
                    type="tel"
                    value={adminProfile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2E7D32' }}>Department</label>
                  <input
                    type="text"
                    value={adminProfile.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2E7D32' }}>Designation</label>
                  <input
                    type="text"
                    value={adminProfile.designation}
                    onChange={(e) => handleProfileChange('designation', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2E7D32' }}>Experience</label>
                  <input
                    type="text"
                    value={adminProfile.experience}
                    onChange={(e) => handleProfileChange('experience', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2E7D32' }}>Specialization</label>
                <textarea
                  value={adminProfile.specialization}
                  onChange={(e) => handleProfileChange('specialization', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    minHeight: '100px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  onClick={() => setShowProfileComponent(false)}
                  style={{
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  style={{
                    backgroundColor: '#2E7D32',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#F5F5F5'
    }}>
      {/* Admin Header */}
      <div style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', 
        padding: '15px',
        boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
        position: 'relative'
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

        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
          gap: window.innerWidth < 768 ? '15px' : '0',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(13px)',
          WebkitBackdropFilter: 'blur(13px)',
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
              ⚙️ Admin Dashboard
            </h1>
            <div style={{ 
              fontSize: window.innerWidth < 768 ? '14px' : '16px',
              fontWeight: 'bold',
              color: '#FFD700',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              marginBottom: '5px'
            }}>
              Sri Eshwar College of Engineering
            </div>
            <p style={{ 
              margin: 0, 
              opacity: 0.95, 
              fontSize: window.innerWidth < 768 ? '12px' : '14px' 
            }}>
              Manage challenges, students, and platform analytics
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: window.innerWidth < 768 ? '10px' : '20px',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            width: window.innerWidth < 768 ? '100%' : 'auto'
          }}>
            {/* Admin Profile */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  padding: '8px 15px',
                  borderRadius: '25px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#FF6B35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  {adminProfile.name?.charAt(0) || 'A'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    {adminProfile.name}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {adminProfile.designation}
                  </div>
                </div>
                <div style={{ fontSize: '12px' }}>▼</div>
              </div>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '10px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  minWidth: '200px',
                  zIndex: 1000,
                  border: '1px solid #E0E0E0'
                }}>
                  <button
                    onClick={() => {
                      setShowProfileComponent(true);
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
                    👤 Admin Profile
                  </button>
                  <button
                    onClick={() => {
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
                    ⚙️ Settings
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

      {/* Main Content */}
      <div style={{ 
        padding: window.innerWidth < 768 ? '15px' : '20px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          border: '2px solid #81C784'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            gap: window.innerWidth < 768 ? '10px' : '0',
            borderBottom: '2px solid #E0E0E0',
            marginBottom: '20px'
          }}>
            {[
              { id: 'greenhub', label: '🌱 GreenHUB', icon: '🌱' },
              { id: 'challenges', label: '🎯 Challenges', icon: '🎯' },
              { id: 'students', label: '👥 Students', icon: '👥' },
              { id: 'submissions', label: '📝 Submissions', icon: '📝' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' },
              { id: 'overview', label: '📊 Overview', icon: '📊' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: window.innerWidth < 768 ? '12px 15px' : '15px 25px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: window.innerWidth < 768 ? '12px' : '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderBottom: activeTab === tab.id ? '3px solid #2E7D32' : '3px solid transparent',
                  color: activeTab === tab.id ? '#2E7D32' : '#666',
                  transition: 'all 0.3s',
                  width: window.innerWidth < 768 ? '100%' : 'auto',
                  textAlign: 'center'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>📊 Platform Overview</h3>
              
              {/* Stats Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 768 ? '1fr 1fr' : 'repeat(4, 1fr)',
                gap: '15px',
                marginBottom: '30px'
              }}>
                <div style={{
                  backgroundColor: '#E8F5E8',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: '2px solid #81C784'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>👥</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2E7D32' }}>
                    {analytics.totalStudents}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Total Students</div>
                </div>
                
                <div style={{
                  backgroundColor: '#E3F2FD',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: '2px solid #64B5F6'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976D2' }}>
                    {analytics.activeChallenges}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Active Challenges</div>
                </div>
                
                <div style={{
                  backgroundColor: '#FFF3E0',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: '2px solid #FFB74D'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>📝</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#F57C00' }}>
                    {analytics.pendingReviews}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Pending Reviews</div>
                </div>
                
                <div style={{
                  backgroundColor: '#FCE4EC',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: '2px solid #F48FB1'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '10px' }}>💰</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#C2185B' }}>
                    {analytics.totalPointsAwarded}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Points Awarded</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{
                backgroundColor: '#F9F9F9',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #E0E0E0'
              }}>
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>Recent Activity</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {submissions.slice(0, 3).map(submission => (
                    <div key={submission._id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #E0E0E0'
                    }}>
                      <div>
                        <strong>{submission.studentName}</strong> submitted proof for{' '}
                        <em>{submission.challengeTitle}</em>
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: submission.status === 'Pending' ? '#FFF3E0' : '#E8F5E8',
                        color: submission.status === 'Pending' ? '#F57C00' : '#2E7D32'
                      }}>
                        {submission.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'greenhub' && (
            <div>
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🌱 GreenHUB - Student Achievements</h3>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: window.innerWidth < 768 ? '20px' : '25px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '2px solid #81C784'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                    View and interact with student sustainability achievements and posts
                  </p>
                </div>

                {/* Posts Feed */}
                <div>
                  {posts.length > 0 ? (
                    posts.map(post => (
                      <div key={post._id} style={{
                        backgroundColor: 'white',
                        padding: window.innerWidth < 768 ? '15px' : '20px',
                        borderRadius: '10px',
                        marginBottom: window.innerWidth < 768 ? '15px' : '20px',
                        border: '1px solid #E0E0E0',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        {/* Post Header */}
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
                            {post.author.name.charAt(0)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', color: '#2E7D32', fontSize: '16px' }}>
                              {post.author.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {post.author.department} • {new Date(post.timestamp).toLocaleString()}
                            </div>
                            {post.challengeCompleted && (
                              <div style={{
                                display: 'inline-block',
                                backgroundColor: '#E8F5E8',
                                color: '#2E7D32',
                                padding: '2px 8px',
                                borderRadius: '12px',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                marginTop: '5px'
                              }}>
                                ✅ {post.challengeCompleted} (+{post.pointsEarned} pts)
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Post Content */}
                        <div style={{
                          color: '#333',
                          fontSize: '14px',
                          lineHeight: '1.5',
                          marginBottom: '15px'
                        }}>
                          {post.content}
                        </div>

                        {/* Photo Proofs */}
                        {post.proofImages && post.proofImages.length > 0 && (
                          <div style={{
                            display: 'flex',
                            gap: '10px',
                            marginBottom: '15px',
                            flexWrap: 'wrap'
                          }}>
                            {post.proofImages.map((image, index) => (
                              <div key={index} style={{
                                width: post.proofImages.length === 1 ? '100%' : window.innerWidth < 768 ? '100%' : '48%',
                                maxWidth: '300px'
                              }}>
                                <img
                                  src={image}
                                  alt={`Achievement proof ${index + 1}`}
                                  style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                    border: '2px solid #E0E0E0',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => window.open(image, '_blank')}
                                  onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
                                    e.target.style.opacity = '0.7';
                                    e.target.onerror = null; // Prevent infinite loop
                                  }}
                                  onLoad={(e) => {
                                    e.target.style.opacity = '1';
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Post Actions */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          paddingTop: '15px',
                          borderTop: '1px solid #E0E0E0',
                          marginBottom: '15px'
                        }}>
                          <button
                            onClick={() => handleLikePost(post._id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              color: post.likedByAdmin ? '#FF6B35' : '#666',
                              fontSize: '14px',
                              fontWeight: post.likedByAdmin ? 'bold' : 'normal'
                            }}
                          >
                            {post.likedByAdmin ? '❤️' : '🤍'} {post.likes}
                          </button>
                          <div style={{ color: '#666', fontSize: '14px' }}>
                            💬 {post.comments.length} comments
                          </div>
                        </div>

                        {/* Comments Section */}
                        <div style={{ marginBottom: '15px' }}>
                          {post.comments.map(comment => (
                            <div key={comment._id} style={{
                              backgroundColor: comment.isAdmin ? '#FFF3E0' : 'white',
                              padding: '10px',
                              borderRadius: '8px',
                              marginBottom: '8px',
                              border: comment.isAdmin ? '1px solid #FFB74D' : '1px solid #E0E0E0'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                  <div style={{ 
                                    fontWeight: 'bold', 
                                    color: comment.isAdmin ? '#FF6B35' : '#2E7D32',
                                    fontSize: '13px'
                                  }}>
                                    {comment.author} {comment.isAdmin && '(Admin)'}
                                  </div>
                                  <div style={{ color: '#333', fontSize: '13px', marginTop: '2px' }}>
                                    {comment.content}
                                  </div>
                                </div>
                                <div style={{ fontSize: '11px', color: '#666' }}>
                                  {new Date(comment.timestamp).toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Comment */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <input
                            type="text"
                            value={newComment[post._id] || ''}
                            onChange={(e) => handleCommentChange(post._id, e.target.value)}
                            placeholder="Add a comment as admin..."
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              border: '2px solid #81C784',
                              borderRadius: '20px',
                              fontSize: '13px',
                              outline: 'none'
                            }}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(post._id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddComment(post._id)}
                            style={{
                              backgroundColor: '#2E7D32',
                              color: 'white',
                              border: 'none',
                              padding: '8px 15px',
                              borderRadius: '20px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: 'bold'
                            }}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                      <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌱</div>
                      <p>No student posts yet. Students will share their sustainability achievements here!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#2E7D32', margin: 0 }}>🎯 Manage Challenges</h3>
                <button
                  onClick={() => setShowCreateChallenge(true)}
                  style={{
                    backgroundColor: '#2E7D32',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  ➕ Create Challenge
                </button>
              </div>


              {/* All Challenges List */}
              <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>📋 All Platform Challenges</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {challenges.map(challenge => (
                  <div key={challenge._id} style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #E0E0E0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#2E7D32', margin: '0 0 10px 0' }}>{challenge.title}</h4>
                        <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>
                          {challenge.description}
                        </p>
                        <div style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666' }}>
                          <span>📂 {challenge.category}</span>
                          <span>⭐ {challenge.difficulty}</span>
                          <span>💰 {challenge.points} points</span>
                          <span>⏱️ {challenge.duration}</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          backgroundColor: challenge.status === 'Active' ? '#E8F5E8' : '#FFF3E0',
                          color: challenge.status === 'Active' ? '#2E7D32' : '#F57C00'
                        }}>
                          {challenge.status}
                        </span>
                        <div style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
                          <div>{challenge.participants} participants</div>
                          <div>{challenge.completions} completed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div>
              <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>👥 Student Management</h3>
              
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                border: '1px solid #E0E0E0'
              }}>
                {/* Students Table Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '2fr 1fr 1fr 1fr 1fr',
                  gap: '15px',
                  padding: '15px',
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  <div>Student</div>
                  {window.innerWidth >= 768 && (
                    <>
                      <div>Department</div>
                      <div>Points</div>
                      <div>Challenges</div>
                      <div>Status</div>
                    </>
                  )}
                </div>

                {/* Students List */}
                {students.map(student => (
                  <div key={student._id} style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '2fr 1fr 1fr 1fr 1fr',
                    gap: '15px',
                    padding: '15px',
                    backgroundColor: '#F9F9F9',
                    borderRadius: '8px',
                    marginBottom: '10px',
                    alignItems: 'center',
                    fontSize: '14px'
                  }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#2E7D32' }}>{student.name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{student.email}</div>
                      {window.innerWidth < 768 && (
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                          {student.department} • {student.eco_points} pts • {student.challenges_completed} challenges
                        </div>
                      )}
                    </div>
                    {window.innerWidth >= 768 && (
                      <>
                        <div>{student.department}</div>
                        <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>{student.eco_points}</div>
                        <div>{student.challenges_completed}</div>
                        <div>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            backgroundColor: student.status === 'Active' ? '#E8F5E8' : '#FFF3E0',
                            color: student.status === 'Active' ? '#2E7D32' : '#F57C00'
                          }}>
                            {student.status}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div>
              <h3 style={{ 
                color: '#2E7D32', 
                marginBottom: '20px',
                fontSize: window.innerWidth < 768 ? '18px' : '24px'
              }}>📝 Review Submissions</h3>
              
              <div style={{
                maxHeight: window.innerWidth < 768 ? '400px' : '500px',
                overflowY: 'auto',
                paddingRight: '10px'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: window.innerWidth < 768 ? '15px' : '20px' }}>
                {submissions.map(submission => (
                  <div key={submission._id} style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #E0E0E0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', gap: '20px' }}>
                      {/* Submission Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                          <div>
                            <h4 style={{ color: '#2E7D32', margin: '0 0 5px 0' }}>{submission.challengeTitle}</h4>
                            <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>
                              Submitted by: <strong>{submission.studentName}</strong>
                            </p>
                            <p style={{ color: '#666', margin: 0, fontSize: '12px' }}>
                              {new Date(submission.submissionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            backgroundColor: submission.status === 'Pending' ? '#FFF3E0' : 
                                           submission.status === 'Approved' ? '#E8F5E8' : '#FFEBEE',
                            color: submission.status === 'Pending' ? '#F57C00' : 
                                   submission.status === 'Approved' ? '#2E7D32' : '#D32F2F'
                          }}>
                            {submission.status}
                          </span>
                        </div>
                        
                        <p style={{ color: '#333', fontSize: '14px', marginBottom: '15px' }}>
                          {submission.description}
                        </p>

                        {submission.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                              onClick={() => handleSubmissionReview(submission._id, 'approve')}
                              style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              ✅ Approve
                            </button>
                            <button
                              onClick={() => handleSubmissionReview(submission._id, 'reject')}
                              style={{
                                backgroundColor: '#F44336',
                                color: 'white',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              ❌ Reject
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Proof Image */}
                      {submission.proofImage && (
                        <div style={{ width: window.innerWidth < 768 ? '100%' : '200px' }}>
                          <img
                            src={submission.proofImage}
                            alt="Submission proof"
                            style={{
                              width: '100%',
                              height: '150px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid #E0E0E0'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h3 style={{ 
                color: '#2E7D32', 
                marginBottom: '20px',
                fontSize: window.innerWidth < 768 ? '18px' : '24px'
              }}>📈 Platform Analytics</h3>
              
              <div style={{
                maxHeight: window.innerWidth < 768 ? '500px' : '600px',
                overflowY: 'auto',
                paddingRight: '10px'
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
                  gap: window.innerWidth < 768 ? '15px' : '20px',
                  marginBottom: window.innerWidth < 768 ? '20px' : '30px'
                }}>
                {/* Participation Stats */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #E0E0E0'
                }}>
                  <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>Participation Overview</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Average Participation:</span>
                      <strong>{analytics.averageParticipation}%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Monthly Growth:</span>
                      <strong style={{ color: '#4CAF50' }}>+{analytics.monthlyGrowth}%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Total Submissions:</span>
                      <strong>{analytics.totalSubmissions}</strong>
                    </div>
                  </div>
                </div>

                {/* Top Categories */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  border: '1px solid #E0E0E0'
                }}>
                  <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>Popular Categories</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {analytics.topCategories?.map((category, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0'
                      }}>
                        <span>{category.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '60px',
                            height: '8px',
                            backgroundColor: '#E0E0E0',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${(category.count / 50) * 100}%`,
                              height: '100%',
                              backgroundColor: '#4CAF50'
                            }}></div>
                          </div>
                          <strong>{category.count}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Student Leaderboard */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                border: '1px solid #E0E0E0'
              }}>
                <h4 style={{ color: '#2E7D32', marginBottom: '15px' }}>🏆 Complete Student Leaderboard</h4>
                
                {/* Leaderboard Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth < 768 ? '50px 1fr 80px' : '60px 2fr 1fr 100px 120px',
                  gap: window.innerWidth < 768 ? '10px' : '15px',
                  padding: window.innerWidth < 768 ? '12px' : '15px',
                  backgroundColor: '#2E7D32',
                  color: 'white',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  <div>Rank</div>
                  <div>Student</div>
                  {window.innerWidth >= 768 && <div>Department</div>}
                  <div>Points</div>
                  {window.innerWidth >= 768 && <div>Challenges</div>}
                </div>

                {/* Scrollable Leaderboard */}
                <div style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  paddingRight: '10px'
                }}>
                  {students
                    .sort((a, b) => b.eco_points - a.eco_points)
                    .map((student, index) => (
                    <div
                      key={student._id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: window.innerWidth < 768 ? '50px 1fr 80px' : '60px 2fr 1fr 100px 120px',
                        gap: window.innerWidth < 768 ? '10px' : '15px',
                        padding: window.innerWidth < 768 ? '12px' : '15px',
                        backgroundColor: index < 3 ? '#E8F5E8' : '#F9F9F9',
                        border: index < 3 ? '2px solid #2E7D32' : '1px solid #E0E0E0',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        alignItems: 'center',
                        fontSize: window.innerWidth < 768 ? '12px' : '14px'
                      }}
                    >
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2E7D32' }}>
                        {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                      </div>
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#2E7D32' }}>{student.name}</div>
                        <div style={{ fontSize: '11px', color: '#666' }}>{student.email}</div>
                        {window.innerWidth < 768 && (
                          <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                            {student.department} • {student.challenges_completed} challenges
                          </div>
                        )}
                      </div>
                      {window.innerWidth >= 768 && (
                        <div style={{ fontSize: '12px', color: '#666' }}>{student.department}</div>
                      )}
                      <div style={{ fontWeight: 'bold', color: '#4CAF50', fontSize: '16px' }}>
                        {student.eco_points}
                      </div>
                      {window.innerWidth >= 768 && (
                        <div style={{ textAlign: 'center' }}>{student.challenges_completed}</div>
                      )}
                    </div>
                  ))}
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Challenge Modal */}
      {showCreateChallenge && (
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
            width: '100%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#2E7D32', margin: 0 }}>Create New Challenge</h3>
              <button
                onClick={() => setShowCreateChallenge(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title *</label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge(prev => ({ ...prev, title: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter challenge title"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description *</label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge(prev => ({ ...prev, description: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    minHeight: '80px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Describe the challenge"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Category *</label>
                  <select
                    value={newChallenge.category}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, category: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select category</option>
                    <option value="Waste Reduction">Waste Reduction</option>
                    <option value="Energy">Energy</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Water">Water</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Difficulty</label>
                  <select
                    value={newChallenge.difficulty}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, difficulty: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Points *</label>
                  <input
                    type="number"
                    value={newChallenge.points}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, points: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Points to award"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Duration</label>
                  <input
                    type="text"
                    value={newChallenge.duration}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, duration: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '2px solid #81C784',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., 7 days"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Requirements</label>
                {newChallenge.requirements.map((req, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #81C784',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      placeholder={`Requirement ${index + 1}`}
                    />
                    {newChallenge.requirements.length > 1 && (
                      <button
                        onClick={() => removeRequirement(index)}
                        style={{
                          backgroundColor: '#F44336',
                          color: 'white',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addRequirement}
                  style={{
                    backgroundColor: '#81C784',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  + Add Requirement
                </button>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Tips</label>
                {newChallenge.tips.map((tip, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={tip}
                      onChange={(e) => updateTip(index, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        border: '1px solid #81C784',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      placeholder={`Tip ${index + 1}`}
                    />
                    {newChallenge.tips.length > 1 && (
                      <button
                        onClick={() => removeTip(index)}
                        style={{
                          backgroundColor: '#F44336',
                          color: 'white',
                          border: 'none',
                          padding: '8px',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addTip}
                  style={{
                    backgroundColor: '#81C784',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  + Add Tip
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  onClick={() => setShowCreateChallenge(false)}
                  style={{
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChallenge}
                  style={{
                    backgroundColor: '#2E7D32',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Create Challenge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup with Ribbon Animation */}
      {showSuccessPopup && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
          zIndex: 2000,
          animation: 'slideInRight 0.5s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{ fontSize: '20px' }}>🎉</div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Challenge Created!</div>
            <div style={{ fontSize: '12px', opacity: 0.9 }}>Your challenge has been successfully added</div>
          </div>
          <button
            onClick={() => setShowSuccessPopup(false)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              cursor: 'pointer',
              marginLeft: '10px'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Profile Edit Modal */}
      {showProfileEdit && (
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
            width: '100%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: '#2E7D32', margin: 0 }}>Edit Admin Profile</h3>
              <button
                onClick={() => setShowProfileEdit(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Name *</label>
                <input
                  type="text"
                  value={adminProfile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email *</label>
                <input
                  type="email"
                  value={adminProfile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone</label>
                <input
                  type="tel"
                  value={adminProfile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Department</label>
                <input
                  type="text"
                  value={adminProfile.department}
                  onChange={(e) => handleProfileChange('department', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Designation</label>
                <input
                  type="text"
                  value={adminProfile.designation}
                  onChange={(e) => handleProfileChange('designation', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Experience</label>
                <input
                  type="text"
                  value={adminProfile.experience}
                  onChange={(e) => handleProfileChange('experience', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Specialization</label>
                <textarea
                  value={adminProfile.specialization}
                  onChange={(e) => handleProfileChange('specialization', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #81C784',
                    borderRadius: '8px',
                    fontSize: '14px',
                    minHeight: '80px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button
                  onClick={() => setShowProfileEdit(false)}
                  style={{
                    backgroundColor: '#666',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileSave}
                  style={{
                    backgroundColor: '#2E7D32',
                    color: 'white',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation for Success Popup */}
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

      {/* Submission Approval Success Popup */}
      {showApprovalPopup && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '20px 30px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          animation: 'approvalSlideIn 0.3s ease-out',
          minWidth: '320px',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '24px' }}>✅</span>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Submission Approved!</div>
            <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '5px' }}>
              Student points have been updated
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes approvalSlideIn {
            from {
              transform: translate(-50%, -50%) scale(0.8);
              opacity: 0;
            }
            to {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
    </>
  );
};

export default AdminDashboard;
