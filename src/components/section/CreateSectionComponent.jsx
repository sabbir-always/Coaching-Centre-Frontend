import { SectionSchema } from "../../validation/FormValidation"
import { useCommonContext } from "../../context/CommonContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { POST_SECTION } from "../../context/Route";
import WebLayout from "../../layout/WebLayout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from 'react-select'
import axios from "axios";


const CreateSectionComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const options = [{ value: 'Saturday', label: 'Saturday' }, { value: 'Sunday', label: 'Sunday' }, { value: 'Monday', label: 'Monday' }, { value: 'Tuesday', label: 'Tuesday' }, { value: 'Wednesday', label: 'Wednesday' }, { value: 'Thursday', label: 'Thursday' }, { value: 'Friday', label: 'Friday' }]
    const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Ruda, sans-serif" }) };
    const { semester, fetchSemesterData, updateSemesterState, teacher, fetchTeacherData, updateTeacherState } = useCommonContext()
    useEffect(() => { fetchSemesterData(1) }, [semester.search]);
    useEffect(() => { fetchTeacherData(1) }, [teacher.search]);

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(SectionSchema), defaultValues: { section_name: "", class_day: [], semester_id: "", teacher_id: "" }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(POST_SECTION, {
                section_name: data.section_name,
                class_time: data.class_time,
                class_day: data.class_day,
                semester_id: data.semester_id,
                teacher_id: data.teacher_id,
            });
            if (response && response.data && response.data.success) {
                toast.success(response.data.message || "Create Success.");
                updateSemesterState({ options_value: null });
                updateTeacherState({ options_value: null });
                navigate("/student/section/table");
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
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm bg-light p-3 pt-0">
                            <h4 className="form_heading py-4">Create Section</h4>
                            <div className="row border-top border-warning pt-4">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Section Name</label>
                                    <input type="text" {...register("section_name")} className={`form-control rounded-0 ${errors.section_name ? "is-invalid" : ""}`} placeholder="Ex: Group-A" disabled={isLoading} />
                                    {errors.section_name && <div className="invalid-feedback">{errors.section_name.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Class Time</label>
                                    <input type="text"{...register("class_time")} className={`form-control rounded-0 ${errors.class_time ? "is-invalid" : ""}`} placeholder="Ex: 10:00 AM - 11:00 AM" disabled={isLoading} />
                                    {errors.class_time && <div className="invalid-feedback">{errors.class_time.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
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

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Select Teacher</label>
                                    <Select
                                        options={teacher.options}
                                        value={teacher.options_value}
                                        onChange={(value) => {
                                            updateTeacherState({ options_value: value });
                                            setValue("teacher_id", value ? value.value : "", { shouldValidate: true });
                                        }}
                                        onInputChange={(input) => updateTeacherState({ search: input })}
                                        isLoading={teacher.isLoading}
                                        placeholder={teacher.isLoading ? "Loading..." : "Select Teacher"}
                                        isClearable={true}
                                        styles={customStyles}
                                        maxMenuHeight={300}
                                        required
                                    />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <label className="form-label d-block">Class Days</label>
                                    <Select
                                        options={options}
                                        value={options.data}
                                        styles={customStyles}
                                        placeholder="Select Class Days"
                                        onChange={(selected) => {
                                            const values = selected ? selected.map((item) => item.value) : [];
                                            setValue("class_day", values, { shouldValidate: true });
                                        }}
                                        isMulti
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-6"><Link to="/student/section/table" className="btn btn-danger rounded-0 w-100 custom_btn">Cancel</Link></div>
                                <div className="col-6"><button type="submit" className="btn btn-success rounded-0 w-100 custom_btn">{isLoading ? <span role="status" className="spinner-border spinner-border-sm"></span> : "Create"}</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}

export default CreateSectionComponent