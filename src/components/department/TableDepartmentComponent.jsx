import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useCommonContext } from '../../context/CommonContext';

const TableDepartmentComponent = () => {
    const { department, fetchDepartmentData, deleteDepartment } = useCommonContext()
    useEffect(() => { fetchDepartmentData(1) }, [department.search]);
    const onPageChange = (page) => { fetchDepartmentData(page) };

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
            name: "Department Name",
            selector: row => row.department_name
        },
        {
            name: "Student Count",
            selector: row => row.student_count
        },
        {
            name: "Action",
            cell: row => (
                <div className="d-flex align-items-center gap-2">
                    <Link to={`/academic/department/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                    <button type="button" onClick={() => deleteDepartment(row._id)} className={`btn rounded-0 btn-sm ${Number(row.student_count) > 0 ? "btn-secondary disabled-btn" : "btn-outline-danger"}`} disabled={Number(row.student_count) > 0}><BiTrash /></button>
                </div>),
            width: "150px"
        }
    ];

    if (department.error_message) {
        return <div className="text-center">{department.error_message}</div>
    } else {
        return (
            <DataTable
                columns={columns}
                data={department.data}
                pagination
                paginationServer
                paginationComponentOptions={{ noRowsPerPage: true }}
                progressPending={department.isLoading}
                progressComponent={<span role="status" className="spinner-border spinner-border-sm"></span>}
                paginationTotalRows={department.pagination?.total_data}
                onChangePage={onPageChange}
                customStyles={customStyles}
            />
        )
    }
}

export default TableDepartmentComponent