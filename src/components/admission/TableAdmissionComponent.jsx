import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { IoReaderOutline } from "react-icons/io5";
import { useAdmissionContext } from '../../context/AdmissionContext';

const TableAdmissionComponent = () => {
    const { admission, fetchAdmissionData, deleteAdmission } = useAdmissionContext()
    useEffect(() => { fetchAdmissionData(1) }, [admission.search]);
    const onPageChange = (page) => { fetchAdmissionData(page) };

    const customStyles = {
        table: { style: { fontFamily: "'Ruda', sans-serif" } },
        headRow: { style: { backgroundColor: "#6b6b6b", color: "#fff", fontSize: "14px", fontWeight: "600" } }
    };

    const columns = [
        {
            name: "SL",
            selector: (row, index) => (index + 1),
            width: "60px"
        },
        {
            name: "Admission Date",
            selector: row => row.date_and_time_format
        },
        {
            name: "Full Name",
            selector: row => <Link to={`/student/admission/view/${row._id}`} className='text-dark'>{row.full_name}</Link>
        },
        {
            name: "Phone",
            selector: row => row.phone
        },
        {
            name: "Semester Name",
            selector: row => row.semester_name
        },
        {
            name: "Group Name",
            selector: row => row.section_name
        },
        {
            name: "Department",
            selector: row => row.department_name
        },
        {
            name: "Semester Fee",
            selector: row => row.semester_fee
        },
        {
            name: "Semester Payment",
            selector: row => row.semester_fee_payment
        },
        {
            name: "Semester Due",
            selector: row => row.semester_fee_due
        },
        {
            name: "Action",
            cell: row => (
                <div className="d-flex align-items-center gap-2">
                    <Link to={`/student/admission/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><IoReaderOutline /></Link>
                    <Link to={`/student/admission/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                    <button type="button" onClick={() => deleteAdmission(row._id)} className={`btn rounded-0 btn-sm ${Number(row.student_count) > 0 ? "btn-secondary disabled-btn" : "btn-outline-danger"}`} disabled={Number(row.student_count) > 0}><BiTrash /></button>
                </div>),
            width: "150px"
        }
    ];

    if (admission.error_message) {
        return <div className="text-center">{admission.error_message}</div>
    } else {
        return (
            <DataTable
                columns={columns}
                data={admission.data}
                pagination
                paginationServer
                selectableRows
                paginationComponentOptions={{ noRowsPerPage: true }}
                progressPending={admission.isLoading}
                progressComponent={<span role="status" className="spinner-border spinner-border-sm"></span>}
                paginationTotalRows={admission.pagination?.total_data}
                onChangePage={onPageChange}
                customStyles={customStyles}
            />
        )
    }
}

export default TableAdmissionComponent