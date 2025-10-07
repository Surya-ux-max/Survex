import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleLogin = async (role) => {
    setLoading(true);
    setError('');

    try {
      // Create a user with any email for demo purposes
      const demoUser = {
        name: role === 'student' ? 'Demo Student' : 'Demo Admin',
        email: formData.email || `demo.${role}@college.edu`,
        password: 'demo123',
        role: role,
        department: role === 'student' ? 'Computer Science Engineering' : 'Administration',
        year: role === 'student' ? '3rd Year' : 'Faculty'
      };

      // Try to register first, then login
      const registerResponse = await fetch('http://10.11.144.88:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoUser)
      });

      let loginData;
      if (registerResponse.ok) {
        loginData = await registerResponse.json();
      } else {
        // If registration fails (user exists), try login
        const loginResponse = await fetch('http://10.11.144.88:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: demoUser.email, 
            password: demoUser.password 
          })
        });
        
        if (loginResponse.ok) {
          loginData = await loginResponse.json();
        } else {
          // If both fail, create a mock user for demo
          loginData = {
            token: 'demo-token-' + Date.now(),
            user: {
              _id: 'demo-' + role + '-' + Date.now(),
              ...demoUser,
              eco_points: role === 'student' ? 250 : 1000,
              badges: role === 'student' ? ['🌱 Green Beginner', '🌿 Eco Learner'] : ['🌱 Green Beginner', '🌿 Eco Learner', '🌾 Sustainability Hero']
            }
          };
        }
      }
      
      if (loginData.token) {
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
        onLogin(loginData.user);
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError('Connection failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundImage: 'url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Background Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(46, 125, 50, 0.3)',
        zIndex: 1
      }}></div>
      
      {/* Glassy Login Panel */}
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '40px', 
        borderRadius: '25px', 
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '500px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            color: 'white', 
            fontSize: '42px', 
            margin: '0 0 5px 0', 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            🌿 Survex
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.95)', 
            margin: '0 0 8px 0', 
            fontSize: '16px',
            fontWeight: '500',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Sri Eshwar College of Engineering
          </p>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            margin: 0, 
            fontSize: '14px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Campus Sustainability Platform
          </p>
        </div>

        {/* Role Selection */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ 
            textAlign: 'center', 
            color: 'white', 
            marginBottom: '30px', 
            fontSize: '22px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Choose Your Role
          </h3>
          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => handleRoleLogin('student')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '30px 20px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '18px',
                transition: 'all 0.3s',
                opacity: loading ? 0.6 : 1,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.background = 'rgba(46, 125, 50, 0.8)';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(46, 125, 50, 0.4)';
                  e.target.style.borderColor = 'rgba(46, 125, 50, 0.8)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }
              }}
            >
              🎓 Student Login
            </button>
            <button 
              onClick={() => handleRoleLogin('admin')}
              disabled={loading}
              style={{
                flex: 1,
                padding: '30px 20px',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '15px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '18px',
                transition: 'all 0.3s',
                opacity: loading ? 0.6 : 1,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.background = 'rgba(25, 118, 210, 0.8)';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(25, 118, 210, 0.4)';
                  e.target.style.borderColor = 'rgba(25, 118, 210, 0.8)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                }
              }}
            >
              👨‍💼 Admin Login
            </button>
          </div>
        </div>

        {/* No Registration Note */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '20px',
          borderRadius: '15px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h3 style={{ 
            color: 'white', 
            fontSize: '20px', 
            margin: '0 0 10px 0',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            🚀 No Registration Required!
          </h3>
          <p style={{ 
            color: 'rgba(255,255,255,0.9)', 
            margin: 0, 
            fontSize: '16px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Simply select your role above to get started instantly
          </p>
        </div>

        {error && (
          <div style={{ 
            color: 'white', 
            backgroundColor: 'rgba(211, 47, 47, 0.8)', 
            padding: '15px', 
            borderRadius: '10px', 
            marginBottom: '20px',
            fontSize: '14px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ 
            textAlign: 'center', 
            color: 'white', 
            marginTop: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            🌿 Creating your account...
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
