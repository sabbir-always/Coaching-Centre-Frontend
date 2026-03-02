import { FaBars } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import "./HeaderSidebarComponent.css"
import { Link } from "react-router-dom";

const HeaderComponent = () => {
    return (
        <div className="container-fluid bg-light">
            <div className="row align-items-center justify-content-between py-3">
                <div className="col-12">
                    <button type="button" className="btn btn-sm btn-success d-flex align-items-center justify-content-center rounded-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><FaBars /></button>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent