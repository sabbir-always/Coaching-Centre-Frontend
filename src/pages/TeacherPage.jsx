import TableTeacherComponent from '../components/teacher/TableTeacherComponent'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import WebLayout from '../layout/WebLayout'
import { Link } from 'react-router-dom'

const TeacherPage = () => {
    return (
        <WebLayout>
            <section className='container-fluid'>
                <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Teacher List</h4>
                    <Link to='/academic/teacher/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
                </div>
                <div className='pt-2 pb-5'>
                    <TableTeacherComponent />
                </div>
            </section>
        </WebLayout>
    )
}

export default TeacherPage