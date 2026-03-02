import { Link } from 'react-router-dom';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useCommonContext } from '../../context/CommonContext';

const TablePaymentComponent = () => {
    const { payment, updatePaymentState, fetchPaymentData, deletePayment } = useCommonContext()
    useEffect(() => { fetchPaymentData(1) }, [payment.search]);
    const onPageChange = (page) => { fetchPaymentData(page) };

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
            name: "Payment Date",
            selector: row => row.date_and_time_format
        },
        {
            name: "Student Name",
            selector: row => row.student_name
        },
        {
            name: "Semester Name",
            selector: row => row.semester
        },
        {
            name: "Department",
            selector: row => row.department
        },
        {
            name: "Student Phone",
            selector: row => row.student_phone
        },
        {
            name: "Total Fee",
            selector: row => row.total_fee
        },
        {
            name: "Payment",
            selector: row => row.payment
        },
        {
            name: "Current Due",
            selector: row => row.current_due
        },
        {
            name: "Payment Method",
            selector: row => row.payment_method
        },
        {
            name: "Action",
            cell: row => (
                <div className="d-flex align-items-center gap-2">
                    <Link to={`/student/semester/update/${row._id}`} className="btn btn-outline-success rounded-0 btn-sm"><BiEditAlt /></Link>
                    <button type="button" onClick={() => deletePayment(row._id)} className="btn rounded-0 btn-sm btn-outline-danger"><BiTrash /></button>
                </div>),
            width: "150px"
        }
    ];

    if (payment.error_message) {
        return <div className="text-center">{payment.error_message}</div>
    } else {
        return (
            <DataTable
                columns={columns}
                data={payment.data}
                pagination
                paginationServer
                paginationComponentOptions={{ noRowsPerPage: true }}
                progressPending={payment.isLoading}
                progressComponent={<span role="status" className="spinner-border spinner-border-sm"></span>}
                paginationTotalRows={payment.pagination?.total_data}
                onChangePage={onPageChange}
                customStyles={customStyles}
            />
        )
    }
}

export default TablePaymentComponent