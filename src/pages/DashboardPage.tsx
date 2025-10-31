import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { partsAPI, ordersAPI } from '../services/api';
import type { Part } from '../types';

function DashboardPage() {
    const navigate = useNavigate();
    const [parts, setParts] = useState<Part[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [orderPartId, setOrderPartId] = useState('');
    const [orderQuantity, setOrderQuantity] = useState('');
    const [orderMessage, setOrderMessage] = useState('');

    // 재고 목록 불러오기
    useEffect(() => {
        fetchParts();
    }, []);

    const fetchParts = async () => {
        try {
            const response = await partsAPI.getAll();
            setParts(response.data);
            setLoading(false);
        } catch (err: any) {
            setError('재고 조회 실패: ' + (err.response?.data || err.message));
            setLoading(false);
        }
    };

    // 주문 생성
    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setOrderMessage('');

        try {
            await ordersAPI.create({
                partId: Number(orderPartId),
                quantity: Number(orderQuantity),
            });
            setOrderMessage('주문 성공!');
            setOrderPartId('');
            setOrderQuantity('');

            // 재고 새로고침
            fetchParts();
        } catch (err: any) {
            setOrderMessage('주문 실패: ' + (err.response?.data || err.message));
        }
    };

    // 로그아웃
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login');
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1>재고 관리 대시보드</h1>
                <button onClick={handleLogout} style={{ padding: '8px 16px' }}>
                    로그아웃
                </button>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

            {/* 재고 목록 */}
            <section style={{ marginBottom: '40px' }}>
                <h2>재고 목록</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #ddd' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>부품명</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>재고 수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts.map((part) => (
                            <tr key={part.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{part.id}</td>
                                <td style={{ padding: '10px' }}>{part.name}</td>
                                <td style={{ padding: '10px', textAlign: 'right' }}>{part.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* 주문 생성 */}
            <section>
                <h2>주문 생성</h2>
                <form onSubmit={handleOrder} style={{ display: 'flex', gap: '10px', alignItems: 'end' }}>
                    <div>
                        <label>부품 ID</label>
                        <input
                            type="number"
                            value={orderPartId}
                            onChange={(e) => setOrderPartId(e.target.value)}
                            style={{ width: '100px', padding: '8px', marginTop: '5px', display: 'block' }}
                            required
                        />
                    </div>

                    <div>
                        <label>수량</label>
                        <input
                            type="number"
                            value={orderQuantity}
                            onChange={(e) => setOrderQuantity(e.target.value)}
                            style={{ width: '100px', padding: '8px', marginTop: '5px', display: 'block' }}
                            required
                        />
                    </div>

                    <button type="submit" style={{ padding: '8px 20px' }}>
                        주문하기
                    </button>
                </form>

                {orderMessage && (
                    <div style={{
                        marginTop: '15px',
                        padding: '10px',
                        backgroundColor: orderMessage.includes('성공') ? '#d4edda' : '#f8d7da',
                        color: orderMessage.includes('성공') ? '#155724' : '#721c24',
                        borderRadius: '4px'
                    }}>
                        {orderMessage}
                    </div>
                )}
            </section>
        </div>
    );
}

export default DashboardPage;