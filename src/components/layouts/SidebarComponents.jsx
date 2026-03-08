import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaLayerGroup } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { LuNewspaper } from "react-icons/lu";
import { VscSignIn } from "react-icons/vsc";
import { FaBookOpen } from "react-icons/fa";
import { NavLink } from "react-router-dom"
import "./HeaderSidebarComponent.css"

const SidebarComponents = () => {
    return (
        <div className="offcanvas offcanvas-start offcanvas_sidebar" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Polytechnic Home</h5>
                <button type="button" className="btn-close offcanvas_close_btn" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body offcanvas_sidebar_body">
                <div className="sidebar_link_groups">
                    <NavLink to='/' className='sidebar_links'><MdOutlineSpaceDashboard className="sidebar_icons" />Dashboard</NavLink>
                    <NavLink to='/student/admission/table' className='sidebar_links'><PiStudentFill className="sidebar_icons" />Admission</NavLink>
                    <NavLink to='/student/payment/table' className='sidebar_links'><TbCurrencyTaka className="sidebar_icons" />Payment</NavLink>
                    <NavLink to='/student/semester/table' className='sidebar_links'><FaBookOpen className="sidebar_icons" />Semester</NavLink>
                    <NavLink to='/student/section/table' className='sidebar_links'><LuNewspaper className="sidebar_icons" />Section</NavLink>
                    <NavLink to='/academic/department/table' className='sidebar_links'><FaLayerGroup className="sidebar_icons" />Department</NavLink>
                    <NavLink to='/academic/teacher/table' className='sidebar_links'><FaChalkboardTeacher className="sidebar_icons" />Teachers</NavLink>
                </div>
                <button className="btn btn-sm btn-danger sidebar_logout"><VscSignIn className="sidebar_icons" />Sign Out</button>
            </div>
        </div>

    )
}

export default SidebarComponents
