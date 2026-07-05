import api from './axiosConfig';

export const customerService = {
    // Matches @GetMapping("/seeavailableVehicles")
    getAvailableVehicles: async (mobileNo, destination) => {
        try {
            const response = await api.get(`/seeavailableVehicles?mobileNo=${mobileNo}&destination=${destination}`);
            return response.data; // This returns your ResponseStructure<AvailableVehiclesDTO>
        } catch (error) {
            throw error.response?.data || "Error fetching vehicles";
        }
    },

    // Matches @PostMapping("/customercancelbooking")
    cancelBooking: async (bookingId, customerId) => {
        try {
            const response = await api.post(`/customercancelbooking?bookingid=${bookingId}&custid=${customerId}`);
            return response.data; // Returns CustomerCancelBookingResponseDTO
        } catch (error) {
            throw error.response?.data || "Cancellation failed";
        }
    }
};