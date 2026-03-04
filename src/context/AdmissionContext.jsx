import { createContext, useContext, useState } from 'react';
import { DEL_ADMISSION, GET_ADMISSION } from './Route';
import axios from 'axios';
import { toast } from 'react-toastify';
const AdmissionContext = createContext();

const AdmissionContextProvider = ({ children }) => {
    const [admission, setAdmission] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateAdmissionState = (newState) => { setAdmission(prev => ({ ...prev, ...newState })) };

    const fetchAdmissionData = async (page) => {
        try {
            updateAdmissionState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_ADMISSION, {
                params: { search: admission.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];

                updateAdmissionState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.semester_name }))
                });
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }
        } finally {
            updateAdmissionState({ isLoading: false });
        }
    }

    const deleteAdmission = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateAdmissionState({ isLoading: true });
            const response = await axios.delete(`${DEL_ADMISSION}${id}`);

            if (response && response.data && response.data.success) {
                fetchAdmissionData(1)
                toast.success(response.data.message || "Deleted Success.");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }

        } finally {
            updateAdmissionState({ isLoading: false });
        }
    }


    return (
        <AdmissionContext.Provider value={{ admission, updateAdmissionState, fetchAdmissionData, deleteAdmission }}>
            {children}
        </ AdmissionContext.Provider>
    );
};

export default AdmissionContextProvider;

// Custom hook for easier usage
export const useAdmissionContext = () => {
    const context = useContext(AdmissionContext);
    if (!context) { throw new Error("useAdmissionContextProvider must be used within a AdmissionContext") }
    return context;
};