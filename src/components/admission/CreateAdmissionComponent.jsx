import { AdmissionSchema } from "../../validation/FormValidation"
import { useCommonContext } from "../../context/CommonContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { POST_ADMISSION } from "../../context/Route";
import WebLayout from "../../layout/WebLayout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from 'react-select'
import axios from "axios";

const CreateAdmissionComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Ruda, sans-serif" }) };
    const { semester, fetchSemesterData, updateSemesterState, section, updateSectionState, fetchSectionData, department, updateDepartmentState, fetchDepartmentData } = useCommonContext()
    useEffect(() => { fetchSemesterData(1) }, [semester.search]);
    useEffect(() => { fetchSectionData(1) }, [section.search]);
    useEffect(() => { fetchDepartmentData(1) }, [department.search]);

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(AdmissionSchema), defaultValues: { date_and_time: "", first_name: "", last_name: "", email: "", phone: "", semester_id: "", section_id: "", department_id: "", semester_fee: "", institute_name: "", blood_group: "no_selected", religion: "no_selected", guardian_name: "", guardian_phone: "", guardian_relation_ship: "no_selected", address: "", notes: "", }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(POST_ADMISSION, {
                date_and_time: data.date_and_time,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                semester_id: data.semester_id,
                section_id: data.section_id,
                department_id: data.department_id,
                semester_fee: data.semester_fee,
                institute_name: data.institute_name,
                blood_group: data.blood_group,
                religion: data.religion,
                guardian_name: data.guardian_name,
                guardian_phone: data.guardian_phone,
                guardian_relation_ship: data.guardian_relation_ship,
                address: data.address,
                notes: data.notes,
            });
            if (response && response.data && response.data.success) {
                toast.success(response.data.message || "Create Success.");
                updateSemesterState({ options_value: null });
                updateSectionState({ options_value: null });
                updateDepartmentState({ options_value: null });
                navigate("/student/admission/table");
            }

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const err = error.response.data
                if (!err.success) { alert(err.message) }
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <WebLayout>
            <section className="container mt-2 mt-sm-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm bg-light p-3 pt-0">
                            <h4 className="form_heading py-4">New Student</h4>
                            <div className="row border-top border-warning pt-4">

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Admission Date</label>
                                    <input type="date" {...register("date_and_time")} className={`form-control rounded-0 ${errors.date_and_time ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.date_and_time && <div className="invalid-feedback">{errors.date_and_time.message}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text"{...register("first_name")} className={`form-control rounded-0 ${errors.first_name ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.first_name && <div className="invalid-feedback">{errors.first_name.message}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text"{...register("last_name")} className={`form-control rounded-0 ${errors.last_name ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.last_name && <div className="invalid-feedback">{errors.last_name.message}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" {...register("phone")} className={`form-control rounded-0 ${errors.phone ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" {...register("email")} className={`form-control rounded-0 ${errors.email ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Select Semester</label>
                                    <Select
                                        options={semester.options}
                                        value={semester.options_value}
                                        onChange={(value) => {
                                            updateSemesterState({ options_value: value });
                                            setValue("semester_id", value ? value.value : "", { shouldValidate: true });
                                        }}
                                        onInputChange={(input) => updateSemesterState({ search: input })}
                                        isLoading={semester.isLoading}
                                        placeholder={semester.isLoading ? "Loading..." : "Select Semester"}
                                        isClearable={true}
                                        styles={customStyles}
                                        maxMenuHeight={300}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Select Section</label>
                                    <Select
                                        options={section.options}
                                        value={section.options_value}
                                        onChange={(value) => {
                                            updateSectionState({ options_value: value });
                                            setValue("section_id", value ? value.value : "", { shouldValidate: true });
                                        }}
                                        onInputChange={(input) => updateSectionState({ search: input })}
                                        isLoading={section.isLoading}
                                        placeholder={section.isLoading ? "Loading..." : "Select Section"}
                                        isClearable={true}
                                        styles={customStyles}
                                        maxMenuHeight={300}
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Select Department</label>
                                    <Select
                                        options={department.options}
                                        value={department.options_value}
                                        onChange={(value) => {
                                            updateDepartmentState({ options_value: value });
                                            setValue("department_id", value ? value.value : "", { shouldValidate: true });
                                        }}
                                        onInputChange={(input) => updateDepartmentState({ search: input })}
                                        isLoading={department.isLoading}
                                        placeholder={department.isLoading ? "Loading..." : "Select Department"}
                                        isClearable={true}
                                        styles={customStyles}
                                        maxMenuHeight={300}
                                        required
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Semester Fee</label>
                                    <input type="number" {...register("semester_fee", { valueAsNumber: true })} className={`form-control rounded-0 ${errors.semester_fee ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.semester_fee && <div className="invalid-feedback">{errors.semester_fee.message}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Institute Name</label>
                                    <input type="text" {...register("institute_name")} className={`form-control rounded-0 ${errors.institute_name ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.institute_name && <div className="invalid-feedback">{errors.institute_name.message}</div>}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Religion</label>
                                    <select {...register("religion")} className={`form-select rounded-0 ${errors.religion ? "is-invalid" : ""}`} disabled={isLoading}>
                                        <option value="no_selected">Select Religion</option>
                                        <option value="Islam">Islam</option>
                                        <option value="Hindu">Hindu</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Buddhism">Buddhism</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.religion && (<div className="invalid-feedback">{errors.religion.message}</div>)}
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Blood Group</label>
                                    <select {...register("blood_group")} className={`form-select rounded-0 ${errors.blood_group ? "is-invalid" : ""}`} disabled={isLoading}>
                                        <option value="no_selected">Select Blood</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                    {errors.blood_group && (<div className="invalid-feedback">{errors.blood_group.message}</div>)}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Guardian Name</label>
                                    <input type="text" {...register("guardian_name")} className={`form-control rounded-0 ${errors.guardian_name ? "is-invalid" : ""}`} />
                                    {errors.guardian_name && (<div className="invalid-feedback">{errors.guardian_name.message}</div>)}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Guardian Phone</label>
                                    <input type="text"{...register("guardian_phone")} className={`form-control rounded-0 ${errors.guardian_phone ? "is-invalid" : ""}`} />
                                    {errors.guardian_phone && (<div className="invalid-feedback">{errors.guardian_phone.message}</div>)}
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Relationship</label>
                                    <select {...register("guardian_relation_ship")} className={`form-control rounded-0 ${errors.guardian_relation_ship ? "is-invalid" : ""}`}>
                                        <option value="no_selected">Select Relation</option>
                                        <option value="Father">Father</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Uncle">Uncle</option>
                                        <option value="Others">Others</option>
                                    </select>
                                    {errors.guardian_relation_ship && (<div className="invalid-feedback">{errors.guardian_relation_ship.message}</div>)}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" {...register("address")} className={`form-control rounded-0 ${errors.address ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Notes</label>
                                    <textarea rows="1" {...register("notes")} className={`form-control rounded-0 ${errors.notes ? "is-invalid" : ""}`}></textarea>
                                    {errors.notes && <div className="invalid-feedback">{errors.notes.message}</div>}
                                </div>

                            </div>

                            <div className="row mt-3">
                                <div className="col-6"><Link to="/student/admission/table" className="btn btn-danger rounded-0 w-100 custom_btn">Cancel</Link></div>
                                <div className="col-6"><button type="submit" className="btn btn-success rounded-0 w-100 custom_btn">{isLoading ? <span role="status" className="spinner-border spinner-border-sm"></span> : "Create"}</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}

export default CreateAdmissionComponent