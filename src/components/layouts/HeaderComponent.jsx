import { FaBars } from "react-icons/fa6";
import { BiUser } from "react-icons/bi";
import "./HeaderSidebarComponent.css"
import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div className="container-fluid bg-light">
            <div className="row align-items-center justify-content-between py-3">
                <div className="col-6 col-md-10">
                    <button type="button" className="btn btn-sm btn-success d-flex align-items-center justify-content-center rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><FaBars /></button>
                </div>
                <div className="col-6 col-md-2">
                    <div className="d-flex align-items-center justify-content-end gap-2">
                        <div className="d-flex flex-column text-end">
                            <Link to='' className="header_users_name">Sabbir Hosain</Link>
                            <span className="header_users_title">Computer Department</span>
                        </div>
                        <div className="header_users_icon"><Link to=''><BiUser /></Link></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent