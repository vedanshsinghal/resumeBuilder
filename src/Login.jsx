import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // <--- Turn on loading spinner/text
    setError('');

    try {
      const response = await fetch('https://resumebuilderbackend-nozm.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.name);
        navigate('/'); // Teleport to builder
      } else {
        setError(data.message);
        
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <form onSubmit={handleLogin} className="auth-form">
          <input 
            type="email" 
            className="auth-input"
            placeholder="Email Address" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            className="auth-input"
            placeholder="Password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Loading..." : 'Login'}
          </button>
        </form>
        
        <p className="auth-link-text">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;