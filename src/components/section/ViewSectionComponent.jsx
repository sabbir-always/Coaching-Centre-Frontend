import { GET_SINGLE_SECTION } from '../../context/Route';
import WebLayout from '../../layout/WebLayout'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

const ViewSectionComponent = () => {
    const { id } = useParams();
    const [section, setSection] = useState({ isLoading: false, data: [], error_message: null })
    const updateSectionState = (data) => { setSection(prev => ({ ...prev, ...data })) };

    useEffect(() => {
        const fetchSection = async () => {
            try {
                updateSectionState({ isLoading: true, error_message: null });
                const response = await axios.get(`${GET_SINGLE_SECTION}${id}`);
                if (response.data && response.data.success) {
                    updateSectionState({ data: response.data.payload });
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const err = error.response.data
                    if (!err.success) { console.error(err.message) }
                }
            }
            finally {
                updateSectionState({ isLoading: false });
            }
        };

        if (id) { fetchSection() }
    }, [id]);

    if (section.isLoading) {
        return (
            <WebLayout>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                    <p>Loading section data...</p>
                </div>
            </WebLayout>
        );
    }

    if (!section.data) {
        return (
            <WebLayout>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                    <p>No Section data found.</p>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <div className="container mt-4">
                {/* ===== Section Info ===== */}
                <div className="card student_card rounded-0 mb-3">
                    <div className="card-header">Section Information</div>
                    <div className="card-body">
                        <p><strong>Class Day : </strong>{section.data.class_day && section.data.class_day.length > 0 ? (section.data.class_day.map((day, index) => (<span key={index} className="badge bg-primary me-1">{day}</span>))) : (<span>No class day found</span>)}</p>
                        <p><strong>Semester Name : </strong>{section.data.semester_name}</p>
                        <p><strong>Group Name : </strong>{section.data.section_name}</p>
                        <p><strong>Student Count : </strong>{section.data.student_count}</p>
                        <p><strong>Class Time : </strong>{section.data.class_time}</p>
                        <p><strong>Teacher Name : </strong>{section.data.teacher_name}</p>
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}

export default ViewSectionComponent