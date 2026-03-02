import TableSectionComponent from '../components/section/TableSectionComponent'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import WebLayout from '../layout/WebLayout'
import { Link } from 'react-router-dom'


const SectionPage = () => {
    return (
        <WebLayout>
            <section className='container-fluid'>
                <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Section List</h4>
                    <Link to='/student/section/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
                </div>
                <div className='pt-2 pb-5'>
                    <TableSectionComponent />
                </div>
            </section>
        </WebLayout>
    )
}

export default SectionPage