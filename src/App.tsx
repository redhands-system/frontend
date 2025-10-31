import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RootRedirect />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// 루트 페이지: 토큰 교체 후 리다이렉트
function RootRedirect() {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Navigate to='/login' replace />;
}

export default App;
