import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value} = e.target;

        setCredentials((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // validate input
        if(!credentials.email || !credentials.password) {
            setError('Please enter email and password');
            setIsLoading(false);
            return;
        }

        try{
            const result = await login(credentials);
            if(result.success) {
                navigate('/profile');
            } else {
                setError(result.error);
            }
        }
        catch(err) {
            setError('Failed to login. Please try again.');
        } 
        finally {
            setIsLoading(false);
        }
    }

  return (
    <div>
        <h2>Login</h2>
        {error && <div style={{color: 'red'}}>{error}</div>}

        <form onSubmit={handleChange}>
            <div>
                <label>Email: </label>
                <input type="text"
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        required />
            </div>

            <div>
                <label>Password: </label>
                <input type="text"
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        required />
            </div>

            <button type='submit' disabled={loading}>
                {loading ? 'logging in...' : 'Login'}
            </button>
        </form>
    </div>
  )
}

export default Login
