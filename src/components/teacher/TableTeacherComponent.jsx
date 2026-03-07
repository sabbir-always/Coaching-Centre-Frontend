import { useCommonContext } from '../../context/CommonContext';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const TableTeacherComponent = () => {
    const { teacher, fetchTeacherData, deleteTeacher } = useCommonContext()
    useEffect(() => { fetchTeacherData(1) }, [teacher.search]);
    const onPageChange = (page) => { fetchTeacherData(page) };

    const customStyles = {
        table: { style: { fontFamily: "'Ruda', sans-serif" } },
        headRow: { style: { backgroundColor: "#6b6b6b", color: "#fff", fontSize: "14px", fontWeight: "600" } }
    };

    const columns = [
        {
            name: "SL",
            selector: (row, index) => index + 1 + ((teacher.pagination?.current_page || 1) - 1) * (teacher.pagination?.per_page || 10),
            width: "60px"
        },
        {
            name: "Full Name",
            selector: row => row.full_name
        },
        {
            name: "Phone",
            selector: row => row.phone
        },
        {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "Department",
            selector: row => row.department_name
        },
        {
            name: "Religion",
            selector: row => row.religion || 'No Selected'
        },
        {
            name: "Blood Group",
            selector: row => row.blood_group || 'No Selected'
        },
        {
            name: "Class Count",
            selector: row => row.class_count
        },
        {
            name: "Action",
            cell: row => (
                <div className="d-flex align-items-center gap-2">
                    <Link to={`/academic/teacher/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                    <button type="button" onClick={() => deleteTeacher(row._id)} className={`btn rounded-0 btn-sm ${Number(row.class_count) > 0 ? "btn-secondary disabled-btn" : "btn-outline-danger"}`} disabled={Number(row.class_count) > 0}><BiTrash /></button>
                </div>),
            width: "150px"
        }
    ];

    if (teacher.error_message) {
        return <div className="text-center">{teacher.error_message}</div>
    } else {
        return (
            <DataTable
                columns={columns}
                data={teacher.data}
                pagination
                paginationServer
                paginationComponentOptions={{ noRowsPerPage: true }}
                progressPending={teacher.isLoading}
                progressComponent={<span role="status" className="spinner-border spinner-border-sm"></span>}
                paginationTotalRows={teacher.pagination?.total_data}
                onChangePage={onPageChange}
                customStyles={customStyles}
            />
        )
    }
}

export default TableTeacherComponent