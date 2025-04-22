import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    const [ userData, setUserData ] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [ error, setError ] = useState('');
    const [ loading, setIsLoading ] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        // Validate input
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
          }

        if (userData.password !== userData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try{
            const result = await register(userData);
            if(result.success) {
                navigate('/profile');
            } else {
                setError(Array.isArray(result.error) ? result.error.join(', ') : result.error);                
            }
        }
        catch (err) {
            setError('Failed to register. Please try again');
        } 
        finally {
            setIsLoading(false);
        }
    }


  return (
    <div>
        <h2>Register</h2>
        {error && <div style={{color: 'red'}}>{error}</div>}

        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                required
            />
            </div>
            
            <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                required
            />
            </div>
            
            <div>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
            />
            </div>
            
            <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
            />
            </div>
            
            <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleChange}
                required
            />
            </div>

            <button type='submit'>
                {loading ? 'Signing up...' : 'Sign up'}
            </button>
        </form>
    </div>
  )
}

export default Register
