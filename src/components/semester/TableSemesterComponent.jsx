import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useCommonContext } from '../../context/CommonContext';

const TableSemesterComponent = () => {
  const { semester, fetchSemesterData, deleteSemester } = useCommonContext()
  useEffect(() => { fetchSemesterData(1) }, [semester.search]);
  const onPageChange = (page) => { fetchSemesterData(page) };

  const customStyles = {
    table: { style: { fontFamily: "'Ruda', sans-serif" } },
    headRow: { style: { backgroundColor: "#6b6b6b", color: "#fff", fontSize: "14px", fontWeight: "600" } }
  };

  const columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1 + ((semester.pagination?.current_page || 1) - 1) * (semester.pagination?.per_page || 10),
      width: "60px"
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
      name: "Group Count",
      selector: row => row.group_count
    },
    {
      name: "Action",
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <Link to={`/student/semester/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
          <button type="button" onClick={() => deleteSemester(row._id)} className={`btn rounded-0 btn-sm ${Number(row.student_count) > 0 || Number(row.group_count) > 0 ? "btn-secondary disabled-btn" : "btn-outline-danger"}`} disabled={Number(row.student_count) > 0 || Number(row.group_count) > 0}><BiTrash /></button>
        </div>),
      width: "150px"
    }
  ];

  if (semester.error_message) {
    return <div className="text-center">{semester.error_message}</div>
  } else {
    return (
      <DataTable
        columns={columns}
        data={semester.data}
        pagination
        paginationServer
        paginationComponentOptions={{ noRowsPerPage: true }}
        progressPending={semester.isLoading}
        progressComponent={<span role="status" className="spinner-border spinner-border-sm"></span>}
        paginationTotalRows={semester.pagination?.total_data}
        onChangePage={onPageChange}
        customStyles={customStyles}
      />
    )
  }
}

export default TableSemesterComponent