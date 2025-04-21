import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../services/authService';

const Profile = () => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try{
                // First try to get from LocalStorage
                const currentUser = getCurrentUser();

                if(currentUser) {
                    setUser(currentUser);
                    setLoading(false);
                } else {
                    setError('User not found');
                    setLoading(false);
                }
            }
            catch(err) {
                setError('Failed to load profile.');
                setLoading(false);
            }
        }

        fetchUserProfile();
    }, []);

    if (loading) return <div>Loading profile...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>User Profile</h2>
        <div>
            <strong>Name:</strong> {user.firstName} {user.lastName}
        </div>
        <div>
            <strong>Email:</strong> {user.email}
        </div>
        <div>
        <strong>Role(s):</strong> {user.roles && user.roles.join(', ')}
      </div>
    </div>
  )
}

export default Profile
