import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './Login';
import Register from './Register';
import ResumeBuilder from './ResumeBuilder';

// 1. Create a tiny bouncer component
const ProtectedRoute = ({ children }) => {
  // It checks localStorage right exactly when the route is visited
  const hasToken = !!localStorage.getItem('token');
  
  if (!hasToken) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
    {/* 2. Add the Toaster here. It will show up on top of everything else */}
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        {/* 2. Wrap your ResumeBuilder in the bouncer */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          } 
        />
        
        {/* The Public Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;