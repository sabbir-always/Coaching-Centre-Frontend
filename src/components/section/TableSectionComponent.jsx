import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useCommonContext } from '../../context/CommonContext';
import { IoReaderOutline } from 'react-icons/io5';

const TableSectionComponent = () => {
    const { section, fetchSectionData, deleteSection } = useCommonContext()
    useEffect(() => { fetchSectionData(1) }, [section.search]);
    const onPageChange = (page) => { fetchSectionData(page) };

    const customStyles = {
        table: { style: { fontFamily: "'Ruda', sans-serif" } },
        headRow: { style: { backgroundColor: "#6b6b6b", color: "#fff", fontSize: "14px", fontWeight: "600" } }
    };

    const columns = [
        {
            name: "SL",
            selector: (row, index) => index + 1 + ((section.pagination?.current_page || 1) - 1) * (section.pagination?.per_page || 10),
            width: "60px"
        },
        {
            name: "Class Time",
            selector: row => row.class_time
        },
        {
            name: "Section Name",
            selector: row => row.section_name
        },
        {
            name: "Semester Name",
            selector: row => row.semester_name
        },
        {
            name: "Student Count",
            selector: row => row.student_count
        },
        {
            name: "Class Day",
            selector: row => row.class_day?.join(", ")
        },
        {
            name: "Teacher Name",
            selector: row => row.teacher_name
        },
        {
            name: "Action",
            cell: row => (
                <div className="d-flex align-items-center gap-2">
                    <Link to={`/student/section/view/${row._id}`} className="btn btn-outline-primary rounded-0 btn-sm"><IoReaderOutline /></Link>
                    <Link to={`/student/section/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                    <button type="button" onClick={() => deleteSection(row._id)} className={`btn rounded-0 btn-sm ${Number(row.student_count) > 0 ? "btn-secondary disabled-btn" : "btn-outline-danger"}`} disabled={Number(row.student_count) > 0}><BiTrash /></button>
                </div>),
            width: "150px"
        }
    ];

    if (section.error_message) {
        return <div className="text-center">{section.error_message}</div>
    } else {
        return (
            <DataTable
                columns={columns}
                data={section.data}
                pagination
                paginationServer
                paginationComponentOptions={{ noRowsPerPage: true }}
                progressPending={section.isLoading}
                progressComponent={<span role="status" className="spinner-border spinner-border-sm"></span>}
                paginationTotalRows={section.pagination?.total_data}
                onChangePage={onPageChange}
                customStyles={customStyles}
            />
        )
    }
}

export default TableSectionComponent