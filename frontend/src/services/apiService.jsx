import api from '../api'; // Adjust the import path based on your project structure
import dayjs from 'dayjs'; // Adjust the import path for dayjs


const apiService = {

    getNotes: async () => {
        try {
            const response = await api.get('/api/notes/');
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },

    deleteNote: async (id) => {
        try {
            const response = await api.delete(`/api/notes/delete/${id}/`);
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },
    
    createNote: async (content, title) => {
        try {
            const response = await api.post('/api/notes/', { content, title });
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },

    getTransactions: async () => {
        try {
            const response = await api.get('/api/transactions/');
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },

    createTransaction: async (transactionData) => {
        try {
            const response = await api.post('/api/transactions/', transactionData);
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },

    deleteTransaction: async (id) => {
        try {
            const response = await api.delete(`/api/transactions/delete/${id}/`);
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },

    getImportedTransactions: async () => {
        try {
            const response = await api.get('/api/transactions/import/');
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },

    importTransactions: async (formData) => {
        try {
            const response = await api.post('/api/transactions/import/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            alert(error);
            throw error;
        }
    },
};

export default apiService;



