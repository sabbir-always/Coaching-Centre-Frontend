import { TeacherSchema } from "../../validation/FormValidation"
import { useCommonContext } from "../../context/CommonContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { POST_TEACHER } from "../../context/Route";
import WebLayout from "../../layout/WebLayout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from 'react-select'
import axios from "axios";

const CreateTeacherComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Ruda, sans-serif" }) };
    const { department, updateDepartmentState, fetchDepartmentData } = useCommonContext()
    useEffect(() => { fetchDepartmentData(1) }, [department.search]);

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(TeacherSchema), defaultValues: { first_name: "", last_name: "", phone: "", email: "", department_id: "", blood_group: "no_selected", religion: "no_selected" }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(POST_TEACHER, {
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
                department_id: data.department_id,
                blood_group: data.blood_group,
                religion: data.religion
            });
            if (response && response.data && response.data.success) {
                toast.success(response.data.message || "Create Success.");
                updateDepartmentState({ options_value: null });
                navigate("/academic/teacher/table");
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
            <section className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm bg-light p-3 pt-0">
                            <h4 className="form_heading py-4">Create Teacher</h4>
                            <div className="row border-top border-warning pt-4">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">First Name</label>
                                    <input type="text" {...register("first_name")} className={`form-control rounded-0 ${errors.first_name ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.first_name && <div className="invalid-feedback">{errors.first_name.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Last Name</label>
                                    <input type="text"{...register("last_name")} className={`form-control rounded-0 ${errors.last_name ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.last_name && <div className="invalid-feedback">{errors.last_name.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
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

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text"{...register("phone")} className={`form-control rounded-0 ${errors.phone ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text"{...register("email")} className={`form-control rounded-0 ${errors.email ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
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
                                <div className="col-md-6 mb-3">
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
                            </div>

                            <div className="row mt-3">
                                <div className="col-6"><Link to="/academic/teacher/table" className="btn btn-danger rounded-0 w-100 custom_btn">Cancel</Link></div>
                                <div className="col-6"><button type="submit" className="btn btn-success rounded-0 w-100 custom_btn">{isLoading ? <span role="status" className="spinner-border spinner-border-sm"></span> : "Create"}</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}

export default CreateTeacherComponent