import { GET_SINGLE_ADMISSION } from '../../context/Route';
import WebLayout from '../../layout/WebLayout'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

const ViewAdmissionComponent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState({ isLoading: false, data: [], error_message: null })
    const updateStudentState = (data) => { setStudent(prev => ({ ...prev, ...data })) };

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                updateStudentState({ isLoading: true, error_message: null });
                const response = await axios.get(`${GET_SINGLE_ADMISSION}${id}`);
                if (response.data && response.data.success) {
                    updateStudentState({ data: response.data.payload });
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const err = error.response.data
                    if (!err.success) { console.error(err.message) }
                }
            }
            finally {
                updateStudentState({ isLoading: false });
            }
        };

        if (id) { fetchStudent() }
    }, [id]);

    if (student.isLoading) {
        return (
            <WebLayout>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                    <p>Loading student data...</p>
                </div>
            </WebLayout>
        );
    }

    if (!student.data) {
        return (
            <WebLayout>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                    <p>No student data found.</p>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <div className="container mt-4">
                {/* ===== Basic Info ===== */}
                <div className="card student_card rounded-0 mb-3">
                    <div className="card-header">Basic Information</div>
                    <div className="card-body">
                        <p><strong>Name : </strong> {student.data.full_name}</p>
                        <p><strong>Phone : </strong> <a href={`tel:${student.data.phone}`} className='text-dark'>{student.data.phone}</a></p>
                        <p><strong>Email : </strong> {student.data.email || '-'}</p>
                        <p><strong>Address : </strong> {student.data.address || '-'}</p>
                        <p><strong>Blood Group : </strong> {student.data.blood_group || '-'}</p>
                        <p><strong>Religion : </strong> {student.data.religion || '-'}</p>
                        <p><strong>Notes : </strong> {student.data.notes || '-'}</p>
                    </div>
                </div>

                {/* ===== Academic Info ===== */}
                <div className="card student_card rounded-0 mb-3">
                    <div className="card-header">Academic Information</div>
                    <div className="card-body">
                        <p><strong>Institute : </strong> {student.data.institute_name || '-'}</p>
                        <p><strong>Semester : </strong> {student.data.semester_name}</p>
                        <p><strong>Section : </strong> {student.data.section_name}</p>
                        <p><strong>Department : </strong> {student.data.department_name}</p>
                        <p><strong>Semester Fee : </strong> {student.data.semester_fee}</p>
                        <p><strong>Total Paid : </strong> {student.data.semester_fee_payment}</p>
                        <p><strong>Current Due : </strong> {student.data.semester_fee_due}</p>
                    </div>
                </div>

                {/* ===== Guardian Info ===== */}
                <div className="card student_card rounded-0 mb-3">
                    <div className="card-header">Guardian Information</div>
                    <div className="card-body">
                        <p><strong>Guardian Name : </strong> {student.data.guardian_name || '-'}</p>
                        <p><strong>Guardian Phone : </strong> <a href={`tel:${student.data.phone}`} className='text-dark'>{student.data.guardian_phone}</a></p>
                        <p><strong>Relation : </strong> {student.data.guardian_relation_ship || '-'}</p>
                    </div>
                </div>

                {/* ===== Payment History ===== */}
                <div className="card student_card rounded-0 mb-3">
                    <div className="card-header">Payment History</div>
                    <div className="card-body">
                        {student.data.payment_history && student.data.payment_history.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th className="text-nowrap">Date</th>
                                            <th className="text-nowrap">Payment</th>
                                            <th className="text-nowrap">Current Due</th>
                                            <th className="text-nowrap">Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student.data.payment_history.map(payment => (
                                            <tr key={payment._id}>
                                                <td>{payment.date_and_time}</td>
                                                <td>{payment.payment}</td>
                                                <td>{payment.current_due}</td>
                                                <td>{payment.payment_method}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className='text-center'>No payments found.</p>
                        )}
                    </div>
                </div>

            </div>
        </WebLayout>
    )
}

export default ViewAdmissionComponent