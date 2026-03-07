import TablePaymentComponent from '../components/payment/TablePaymentComponent'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import WebLayout from '../layout/WebLayout'
import { Link } from 'react-router-dom'
import { useCommonContext } from '../context/CommonContext'

const PaymentPage = () => {
  const { updatePaymentState } = useCommonContext()

  return (
    <WebLayout>
      <section className='container-fluid'>
        <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
          <h4 className='table_name_title'>Payment List</h4>
          <Link to='/student/payment/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
        </div>
        <div className="row bg-light shadow-sm p-2">
          <div className="col-md-9"></div>
          <div className="col-md-3">
            <div className='w-100'><input type="search" onChange={(event) => updatePaymentState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." /></div>
          </div>
        </div>
        <div className='pt-2 pb-5'>
          <TablePaymentComponent />
        </div>
      </section>
    </WebLayout>
  )
}

export default PaymentPage