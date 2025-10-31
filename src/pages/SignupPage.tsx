import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

function SignupPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await authAPI.signup({ username, password, email, role });
            setSuccess('회원가입 성공! 로그인 페이지로 이동합니다...');

            // 2초 후 로그인 페이지로
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data || '회원가입 실패');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h1>회원가입</h1>

            <form onSubmit={handleSignup}>
                <div style={{ marginBottom: '15px' }}>
                    <label>아이디</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label>역할</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="USER">일반 사용자</option>
                        <option value="ADMIN">관리자</option>
                    </select>
                </div>

                {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}

                <button type="submit" style={{ width: '100%', padding: '10px' }}>
                    회원가입
                </button>
            </form>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <a href="/login">로그인</a>
            </div>
        </div>
    );
}

export default SignupPage;