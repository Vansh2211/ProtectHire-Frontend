// src/lib/api.ts

/**
 * A utility file for making API calls to the backend.
 * This will be used by the contexts and components to interact with the Spring Boot API.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'; // Default to localhost:8080 for Spring Boot

// Helper function to get the auth token from localStorage
const getAuthToken = (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
};

// Main fetch function to handle requests
async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        // Attempt to parse error response from the backend
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    // Handle responses with no content
    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export default apiFetch;
