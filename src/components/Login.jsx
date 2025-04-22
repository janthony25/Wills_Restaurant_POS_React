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

    // Helper function to format error messages from the API
    const formatErrorMessage = (errorStr) => {
        try {
            // Try to parse the error as JSON
            const errorObj = JSON.parse(errorStr);
            
            // If it's an object with field-specific errors
            if (typeof errorObj === 'object' && !Array.isArray(errorObj)) {
                // Extract all error messages from the object
                const messages = [];
                Object.keys(errorObj).forEach(key => {
                    const fieldErrors = errorObj[key];
                    if (Array.isArray(fieldErrors)) {
                        fieldErrors.forEach(msg => messages.push(msg));
                    } else if (typeof fieldErrors === 'string') {
                        messages.push(fieldErrors);
                    }
                });
                return messages.join('. ');
            }
            
            // If it's already parsed but is an array
            if (Array.isArray(errorObj)) {
                return errorObj.join('. ');
            }
            
            // If JSON parsing succeeded but it's something else
            return errorStr;
        } catch (e) {
            // If it's not valid JSON, just return the original string
            return errorStr;
        }
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
                // Format the error message before displaying it
                setError(formatErrorMessage(result.error));
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

            <form onSubmit={handleSubmit}>
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
                    <input type="password"
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