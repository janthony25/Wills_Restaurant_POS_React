import React from 'react'
import { getUserDashboard } from '../services/authService';

const UserDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchDashboard = async () => {
        try {
          const result = await getUserDashboard();
          if (result.success) {
            setDashboard(result.data);
          } else {
            setError(result.error);
          }
        } catch (err) {
          setError('Failed to load dashboard');
        } finally {
          setLoading(false);
        }
      };
  
      fetchDashboard();
    }, []);
  
    if (loading) return <div>Loading dashboard...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!dashboard) return <div>Dashboard not available</div>;
  
  return (
    <div>
    <h2>User Dashboard</h2>
    <div>
      <p>{dashboard.message}</p>
      <p>Access Level: {dashboard.accessLevel}</p>
    </div>
  </div>
  )
}

export default UserDashboard
