import { useEffect } from 'react';
import { useCommonContext } from '../context/CommonContext'
import WebLayout from '../layout/WebLayout'

const DashboardPage = () => {
    const { dashboard, fetchDashboardData } = useCommonContext();
    useEffect(() => { fetchDashboardData(1) }, ['']);

    if (dashboard.isLoading) {
        return (
            <WebLayout>
                <div className="d-flex align-items-center justify-content-center" style={{ height: '90vh' }}>
                    <p style={{ fontFamily: 'Ruda, sans-serif', fontSize: '12px' }}>Please Wait...</p>
                </div>
            </WebLayout>
        );
    }

    return (
        <WebLayout>
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-6 col-sm-2 mb-4">
                        <div className="dashboard_card total_students">
                            <h4 className='dashboard_value'>{dashboard.data.total_students}</h4>
                            <p className='dashboard_label'>Total Students</p>
                        </div>
                    </div>

                    <div className="col-6 col-sm-2 mb-4">
                        <div className="dashboard_card total_semesters">
                            <h4 className='dashboard_value'>{dashboard.data.total_semesters}</h4>
                            <p className='dashboard_label'>Total Semesters</p>
                        </div>
                    </div>

                    <div className="col-6 col-sm-2 mb-4">
                        <div className="dashboard_card total_students_fee">
                            <h4 className='dashboard_value'>{dashboard.data.total_students_fee}</h4>
                            <p className='dashboard_label'>Total Student Fee</p>
                        </div>
                    </div>

                    <div className="col-6 col-sm-2 mb-4">
                        <div className="dashboard_card total_collection">
                            <h4 className='dashboard_value'>{dashboard.data.total_collection}</h4>
                            <p className='dashboard_label'>Total Collection</p>
                        </div>
                    </div>

                    <div className="col-6 col-sm-2 mb-4">
                        <div className="dashboard_card total_due">
                            <h4 className='dashboard_value'>{dashboard.data.total_due}</h4>
                            <p className='dashboard_label'>Total Due</p>
                        </div>
                    </div>

                    <div className="col-6 col-sm-2 mb-4">
                        <div className="dashboard_card today_collection">
                            <h4 className='dashboard_value'>{dashboard.data.today_collection}</h4>
                            <p className='dashboard_label'>Today Collection</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </WebLayout>
    )
}

export default DashboardPage