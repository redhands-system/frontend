import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await authAPI.login({ username, password });

            // 토큰 저장
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            // 대시보드로 이동
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data || '로그인 실패');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
            <h1>로그인</h1>

            <form onSubmit={handleLogin}>
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

                {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

                <button type="submit" style={{ width: '100%', padding: '10px' }}>
                    로그인
                </button>
            </form>

            <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <a href="/signup">회원가입</a>
            </div>
        </div>
    );
}

export default LoginPage;