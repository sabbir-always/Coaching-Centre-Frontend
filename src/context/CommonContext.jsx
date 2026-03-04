import { DEL_DEPARTMENT, DEL_PAYMENT, DEL_SECTION, DEL_SEMESTER, DEL_TEACHER, GET_DEPARTMENT, GET_PAYMENT, GET_SECTION, GET_SEMESTER, GET_TEACHER } from './Route';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
const CommonContext = createContext();

const CommonContextProvider = ({ children }) => {
    const [semester, setSemester] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateSemesterState = (newState) => { setSemester(prev => ({ ...prev, ...newState })) };

    const fetchSemesterData = async (page) => {
        try {
            updateSemesterState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_SEMESTER, {
                params: { search: semester.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateSemesterState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.semester_name })),
                });
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }
        } finally {
            updateSemesterState({ isLoading: false });
        }
    }

    const deleteSemester = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateSemesterState({ isLoading: true });
            const response = await axios.delete(`${DEL_SEMESTER}${id}`);
            if (response && response.data && response.data.success) {
                fetchSemesterData(1)
                toast.success(response.data.message || "Deleted Success.");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }

        } finally {
            updateSemesterState({ isLoading: false });
        }
    }

    //-----------------------------------------------=== SECTION ===---------------------------------------------------------

    const [section, setSection] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateSectionState = (newState) => { setSection(prev => ({ ...prev, ...newState })) };

    const fetchSectionData = async (page) => {
        try {
            updateSectionState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_SECTION, {
                params: { search: section.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateSectionState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.section_name })),
                });
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }
        } finally {
            updateSectionState({ isLoading: false });
        }
    }

    const deleteSection = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateSemesterState({ isLoading: true });
            const response = await axios.delete(`${DEL_SECTION}${id}`);
            if (response && response.data && response.data.success) {
                fetchSectionData(1)
                toast.success(response.data.message || "Deleted Success.");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }

        } finally {
            updateSemesterState({ isLoading: false });
        }
    }

    //------------------------------------------------------=== Department ===------------------------------------------------

    const [department, setDepartment] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateDepartmentState = (newState) => { setDepartment(prev => ({ ...prev, ...newState })) };

    const fetchDepartmentData = async (page) => {
        try {
            updateDepartmentState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_DEPARTMENT, {
                params: { search: section.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateDepartmentState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.department_name })),
                });
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }
        } finally {
            updateDepartmentState({ isLoading: false });
        }
    }

    const deleteDepartment = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateDepartmentState({ isLoading: true });
            const response = await axios.delete(`${DEL_DEPARTMENT}${id}`);
            if (response && response.data && response.data.success) {
                fetchDepartmentData(1)
                toast.success(response.data.message || "Deleted Success.");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }

        } finally {
            updateDepartmentState({ isLoading: false });
        }
    }

    //------------------------------------------------------=== Teacher ===----------------------------------------------------

    const [teacher, setTeacher] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null, options: [], options_value: null })
    const updateTeacherState = (newState) => { setTeacher(prev => ({ ...prev, ...newState })) };

    const fetchTeacherData = async (page) => {
        try {
            updateTeacherState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_TEACHER, {
                params: { search: section.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updateTeacherState({
                    data: data, pagination: response.data.pagination || null,
                    options: data.map(item => ({ value: item._id, label: item.full_name })),
                });
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }
        } finally {
            updateTeacherState({ isLoading: false });
        }
    }

    const deleteTeacher = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updateTeacherState({ isLoading: true });
            const response = await axios.delete(`${DEL_TEACHER}${id}`);

            if (response && response.data && response.data.success) {
                fetchTeacherData(1)
                toast.success(response.data.message || "Deleted Success.");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }

        } finally {
            updateTeacherState({ isLoading: false });
        }
    }

    //------------------------------------------------------=== Payment ===----------------------------------------------------

    const [payment, setPayment] = useState({ isLoading: false, data: [], pagination: null, search: '', error_message: null })
    const updatePaymentState = (newState) => { setPayment(prev => ({ ...prev, ...newState })) };

    const fetchPaymentData = async (page) => {
        try {
            updatePaymentState({ isLoading: true, error_message: null });
            const response = await axios.get(GET_PAYMENT, {
                params: { search: section.search, page: page }
            })

            if (response && response.data) {
                const data = response.data.payload || [];
                updatePaymentState({ data: data, pagination: response.data.pagination || null });
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }
        } finally {
            updatePaymentState({ isLoading: false });
        }
    }

    const deletePayment = async (id) => {
        try {
            const confirm_delete = window.confirm('Are You Sure ? You Want to Delete!');
            if (!confirm_delete) return;

            updatePaymentState({ isLoading: true });
            const response = await axios.delete(`${DEL_PAYMENT}${id}`);

            if (response && response.data && response.data.success) {
                fetchPaymentData(1)
                toast.success(response.data.message || "Deleted Success.");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { console.error(err.message) }
            }

        } finally {
            updatePaymentState({ isLoading: false });
        }
    }


    return (
        <CommonContext.Provider value={{ semester, updateSemesterState, fetchSemesterData, deleteSemester, section, updateSectionState, fetchSectionData, deleteSection, department, updateDepartmentState, fetchDepartmentData, deleteDepartment, teacher, updateTeacherState, fetchTeacherData, deleteTeacher, payment, updatePaymentState, fetchPaymentData, deletePayment }}>
            {children}
        </ CommonContext.Provider>
    );
};

export default CommonContextProvider;

// Custom hook for easier usage
export const useCommonContext = () => {
    const context = useContext(CommonContext);
    if (!context) { throw new Error("useCommonContextProvider must be used within a CommonContext") }
    return context;
};