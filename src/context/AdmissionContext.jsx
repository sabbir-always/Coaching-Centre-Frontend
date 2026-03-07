import { createContext, useContext, useState } from 'react';
import { DEL_ADMISSION, GET_ADMISSION, GET_ADMISSION_PAYMENT_DUE } from './Route';
import { useCommonContext } from './CommonContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const AdmissionContext = createContext();

const AdmissionContextProvider = ({ children }) => {
    const { semester, section, department } = useCommonContext()
    const [admission, setAdmission] = useState({ isLoading: false, data: [], pagination: null, search: '', from_date: '', to_date: '', semester: '', group: '', department: '', error_message: null, options: [], options_value: null })
    const updateAdmissionState = (data) => { setAdmission(prev => ({ ...prev, ...data })) };

    const fetchAdmissionData = async (page) => {
        try {
            updateAdmissionState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_ADMISSION, {
                params: { search: admission.search, from_date: admission.from_date, to_date: admission.to_date, semester: semester.options_value?.value, group: section.options_value?.value, department: department.options_value?.value, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];

                updateAdmissionState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.full_name }))
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

    const [admissionPaymentDue, setAdmissionPaymentDue] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateAdmissionPaymentDueState = (data) => { setAdmissionPaymentDue(prev => ({ ...prev, ...data })) };

    const fetchPaymentDueData = async (page) => {
        try {
            updateAdmissionPaymentDueState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_ADMISSION_PAYMENT_DUE, {
                params: { search: admissionPaymentDue.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];

                updateAdmissionPaymentDueState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.student }))
                });
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }
        } finally {
            updateAdmissionPaymentDueState({ isLoading: false });
        }
    }


    return (
        <AdmissionContext.Provider value={{ admission, updateAdmissionState, fetchAdmissionData, deleteAdmission, admissionPaymentDue, updateAdmissionPaymentDueState, fetchPaymentDueData }}>
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