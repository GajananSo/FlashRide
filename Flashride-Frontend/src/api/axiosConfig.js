// import axios from 'axios';

// const api = axios.create({
//     // Replace 8080 with your Spring Boot port if it's different
//     baseURL: 'http://localhost:8080/api', 
//     headers: {
//         'Content-Type': 'application/json',
//     }
// });

// // Optional: This automatically attaches your JWT token to every request 
// // once the user is logged in.
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default api;


import axios from 'axios';

const api = axios.create({
    // IMPORTANT: Change this to '/api' so it hits your Vite Proxy
    // Do NOT include http://localhost:8080 here
    baseURL: '/api', 
    headers: {
        'Content-Type': 'application/json',
    }
});

// Automatically attaches your JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token.trim()}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;