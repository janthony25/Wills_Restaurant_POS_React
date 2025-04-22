// API URL - Backend URL
const API_URL = 'https://localhost:7256/api';

// Register user
export const register = async (userData) => {
    try{
        const response = await fetch(`${API_URL}/Account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if(response.ok) {
            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(data));
            return {success: true, data};
        }
        else {
            // IMPROVED: Handle case where error might be an object or array
            let errorMessage = 'Registration failed.';
            if (data.error) {
                // Convert object/array errors to string to avoid React child rendering issues
                errorMessage = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
            }
            return {success: false, error: errorMessage};
        }
    }
    catch(error) {
        return {success: false, error: error.message || 'Registration failed'};
    }
};


// Login user
export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/Account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if(response.ok) {
            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(data));
            return {success: true, data}
        } else {
            // IMPROVED: Handle case where errors might be an object or array
            let errorMessage = 'Invalid credentials.';
            if (data.errors) {
                // Convert object/array errors to string to avoid React child rendering issues
                errorMessage = typeof data.errors === 'string' ? data.errors : JSON.stringify(data.errors);
            }
            return {success: false, error: errorMessage};
        }
    } 
    catch (error) {
        return {success: false, error: error.message || 'Login failed.'};
    }
};

// Logout user
export const logout = () => {
    // Remove user from local storage
    localStorage.removeItem('user');
}

// Get current user
export const getCurrentUser = () => {
    // Add try-catch to handle potential JSON parse errors for invalid localStorage data
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
        // If localStorage data is invalid, remove it and return null
        localStorage.removeItem('user');
        return null;
    }
}

// Check if user is authenticated
export const isAuthenticated = () => {
    const user = getCurrentUser();
    return !!user;
}

// Get user profile
export const getUserProfile = async () => {
    try {
        const user = getCurrentUser();

        if(!user) {
            return {success: false, error: 'User not authenticated'};
        }
        const response = await fetch(`${API_URL}/User/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(response.ok) {
            return {success: true, data};
        } else {
            // IMPROVED: Handle case where errors might be an object or array
            let errorMessage = 'Failed to fetch profile.';
            if (data.errors) {
                // Convert object/array errors to string to avoid React child rendering issues
                errorMessage = typeof data.errors === 'string' ? data.errors : JSON.stringify(data.errors);
            }
            return {success: false, error: errorMessage};
        }
    }
    catch (error) {
        return {success: false, error: error.message || 'failed to fetch profile.'};
    }
};

// Check if user has role
export const hasRole = (role) => {
    const user = getCurrentUser();
    if(!user || !user.roles) return false;
    return user.roles.includes(role);
};

// Get user dashboard (based on role)
export const getUserDashboard = async () => {
    try{
        const user = getCurrentUser();

        if(!user) {
            return {success: false, error: 'User not authenticated.'};
        }

        const endpoint = hasRole('Admin') ?
            `${API_URL}/Admin/dashboard` : 
            `${API_URL}/User/dashboard`;


        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if(response.ok) {
            return {success: true, data};
        } else {
            // IMPROVED: Handle case where errors might be an object or array
            let errorMessage = 'Failed to fetch dashboard';
            if (data.errors) {
                // Convert object/array errors to string to avoid React child rendering issues
                errorMessage = typeof data.errors === 'string' ? data.errors : JSON.stringify(data.errors);
            }
            return {success: false, error: errorMessage};
        }
    }
    catch(error) {
        return {success: false, error: error.message || 'Failed to fetch dashboard'};
    }
};