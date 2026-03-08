import TableAdmissionComponent from '../components/admission/TableAdmissionComponent'
import { useAdmissionContext } from '../context/AdmissionContext'
import { LuListFilter, LuTextSearch } from "react-icons/lu";
import { useCommonContext } from '../context/CommonContext'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import WebLayout from '../layout/WebLayout'
import { RxReset } from "react-icons/rx";
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { useEffect } from 'react'

const AdmissionPage = () => {
    const { admission, updateAdmissionState } = useAdmissionContext()
    const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Ruda, sans-serif" }) };
    const { semester, fetchSemesterData, updateSemesterState, section, updateSectionState, fetchSectionData, department, updateDepartmentState, fetchDepartmentData } = useCommonContext()
    useEffect(() => { fetchSemesterData(1) }, [semester.search]);
    useEffect(() => { fetchSectionData(1) }, [section.search]);
    useEffect(() => { fetchDepartmentData(1) }, [department.search]);

    const handleReset = () => {
        updateAdmissionState({ search: "", from_date: "", to_date: "" });
        updateSemesterState({ options_value: null, search: "" });
        updateDepartmentState({ options_value: null, search: "" });
        updateSectionState({ options_value: null, search: "" });
    };

    return (
        <WebLayout>
            <section className='container-fluid'>
                <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Admission List</h4>
                    <Link to='/student/admission/create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
                </div>

                <div className="d-flex align-items-center justify-content-end gap-2 px-3 pe-md-5 bg-light shadow-sm py-2">
                    <div className='search-box'>
                        <input type="search" onChange={(event) => updateAdmissionState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." />
                    </div>

                    <div className=''>
                        <button className="btn btn-outline-primary btn-sm rounded-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><LuListFilter /></button>
                    </div>
                </div>

                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Admission List Filter</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    <div className="offcanvas-body offcanvas_filter_body">
                        <div className="d-flex flex-column gap-2">
                            <div className="w-100">
                                <input
                                    type={admission.from_date ? "date" : "text"}
                                    placeholder="Select From Date"
                                    value={admission.from_date || ""}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => !e.target.value && (e.target.type = "text")}
                                    onChange={(event) => updateAdmissionState({ from_date: event.target.value })}
                                    className="form-control rounded-0"
                                />
                            </div>
                            <div className="w-100">
                                <input
                                    type={admission.to_date ? "date" : "text"}
                                    placeholder="Select To Date"
                                    value={admission.to_date || ""}
                                    onFocus={(e) => (e.target.type = "date")}
                                    onBlur={(e) => !e.target.value && (e.target.type = "text")}
                                    onChange={(event) => updateAdmissionState({ to_date: event.target.value })}
                                    className="form-control rounded-0"
                                />
                            </div>

                            <div className="w-100">
                                <Select
                                    options={semester.options}
                                    value={semester.options_value}
                                    onChange={(value) => { updateSemesterState({ options_value: value }) }}
                                    onInputChange={(input) => updateSemesterState({ search: input })}
                                    isLoading={semester.isLoading}
                                    placeholder={semester.isLoading ? "Loading..." : "Select Semester"}
                                    isClearable={true}
                                    styles={customStyles}
                                    maxMenuHeight={300}
                                    required
                                />
                            </div>
                            <div className='w-100'>
                                <Select
                                    options={department.options}
                                    value={department.options_value}
                                    onChange={(value) => { updateDepartmentState({ options_value: value }) }}
                                    onInputChange={(input) => updateDepartmentState({ search: input })}
                                    isLoading={department.isLoading}
                                    placeholder={department.isLoading ? "Loading..." : "Select Department"}
                                    isClearable={true}
                                    styles={customStyles}
                                    maxMenuHeight={300}
                                    required
                                />
                            </div>
                            <div className="w-100">
                                <Select
                                    options={section.options}
                                    value={section.options_value}
                                    onChange={(value) => { updateSectionState({ options_value: value }) }}
                                    onInputChange={(input) => updateSectionState({ search: input })}
                                    isLoading={section.isLoading}
                                    placeholder={section.isLoading ? "Loading..." : "Select Section"}
                                    isClearable={true}
                                    styles={customStyles}
                                    maxMenuHeight={300}
                                    required
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <button onClick={handleReset} className="btn btn-sm btn-danger sidebar_logout justify-content-center rounded"><RxReset className="sidebar_icons" />Reset</button>
                            <button className="btn btn-sm btn-success sidebar_logout justify-content-center rounded" data-bs-dismiss="offcanvas" aria-label="Close"><LuTextSearch className="sidebar_icons" />Search</button>
                        </div>
                    </div>
                </div>

                <div className='pt-2 pb-5'>
                    <TableAdmissionComponent />
                </div>
            </section>
        </WebLayout>
    )
}

export default AdmissionPage