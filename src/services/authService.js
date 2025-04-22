// API URL - Backend URL
const API_URL = 'https://localhost:7256/api';

// Register user
export const register = async (userData) => {
    try{
        const response = await fetch(`${API_URL}/AccountContoller/register`, {
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
            return {success: false, error: data.error || 'Registration failed.'};
        }
    }
    catch(error) {
        return {success: false, error: error.message || 'Registration failed'};
    }
};


// Login user
export const login = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/AccountContoller/login`, {
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
            return {success: false, error: data.errors || 'Invalid credentials.'};
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
    return JSON.parse(localStorage.getItem('user'));
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
            return {success: false, error: data.errors || 'Failed to fetch profile.'};
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
            return {success: false, error: data.errors || 'Failed to fetch dashboard'}
        }
    }
    catch(error) {
        return {success: false, error: error.message || 'Failed to fetch dashboard'};
    }
};