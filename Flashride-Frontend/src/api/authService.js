// import api from './axiosConfig';

// export const authService = {
//     // 1. Customer Registration (Maps to RegisterCustomerDTO)
//     registerCustomer: async (customerData) => {
//         try {
//             const response = await api.post('/auth/register/customer', customerData);
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || "Registration failed";
//         }
//     },

//     // 2. Driver & Vehicle Registration (Maps to RegisterDriverVehicleDTO)
//     registerDriver: async (driverVehicleData) => {
//         try {
//             const response = await api.post('/auth/register/driver', driverVehicleData);
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || "Driver registration failed";
//         }
//     },

//     // 3. Login (Maps to LoginRequestDTO)
//     login: async (mobileNo, password) => {
//         try {
//             const response = await api.post('/auth/login', { 
//                 mobileNo: parseInt(mobileNo), 
//                 password 
//             });
            
//             // If your backend returns a token, save it
//             if (response.data.token) {
//                 localStorage.setItem('token', response.data.token);
//                 localStorage.setItem('userRole', response.data.role); // e.g., 'CUSTOMER' or 'DRIVER'
//             }
//             return response.data;
//         } catch (error) {
//             throw error.response?.data || "Login failed";
//         }
//     },

//     // 4. Logout
//     logout: () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('userRole');
//         window.location.href = '/login';
//     }
// };

import api from './axiosConfig';

export const authService = {
    // Matches @GetMapping("/registercustomer") 
    // Note: I'm using .post assuming you'll fix the Controller to @PostMapping.
    // If you stay with @GetMapping, change 'post' to 'get' below.
    registerCustomer: async (customerData) => {
        try {
            const response = await api.post('/registercustomer', customerData);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Registration failed";
        }
    },

    // Matches @GetMapping("/findcustomer")
    findCustomer: async (mobileNo) => {
        try {
            const response = await api.get(`/findcustomer?mobileNo=${mobileNo}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || "Customer not found";
        }
    }
};