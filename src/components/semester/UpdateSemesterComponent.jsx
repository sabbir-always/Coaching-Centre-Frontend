import { GET_SINGLE_SEMESTER, PUT_SEMESTER } from "../../context/Route";
import { SemesterSchema } from "../../validation/FormValidation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import WebLayout from "../../layout/WebLayout";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateSemesterComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(SemesterSchema) });

    useEffect(() => {
        const fetchSemester = async () => {
            try {
                const response = await axios.get(`${GET_SINGLE_SEMESTER}${id}`);
                if (response.data && response.data.success) {
                    const data = response.data.payload
                    reset({ semester_name: data.semester_name });
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const err = error.response.data
                    if (!err.success) { console.error(err.message) }
                }
            }
        };

        if (id) { fetchSemester() }
    }, [id, reset]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${PUT_SEMESTER}${id}`, { semester_name: data.semester_name });
            if (response && response.data && response.data.success) {
                toast.success(response.data.message || "Update Success.");
                navigate("/student/semester/table");
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
                    <div className="col-md-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="shadow-sm bg-light p-3 pt-0">
                            <h4 className="form_heading py-4">Update Semester</h4>
                            <div className="row border-top border-warning pt-4">
                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Semester Name</label>
                                    <input type="text"{...register("semester_name")} className={`form-control rounded-0 ${errors.semester_name ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.semester_name && (<div className="invalid-feedback">{errors.semester_name.message}</div>)}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-6"><Link to="/student/semester/table" className="btn btn-danger rounded-0 w-100 custom_btn">Cancel</Link></div>
                                <div className="col-6"><button type="submit" className="btn btn-success rounded-0 w-100 custom_btn">{isLoading ? <span role="status" className="spinner-border spinner-border-sm"></span> : "Update"}</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
};

export default UpdateSemesterComponent;