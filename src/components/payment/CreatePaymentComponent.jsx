import { PaymentSchema } from "../../validation/FormValidation"
import { useAdmissionContext } from "../../context/AdmissionContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { POST_PAYMENT } from "../../context/Route";
import WebLayout from "../../layout/WebLayout";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Select from 'react-select'
import axios from "axios";

const CreatePaymentComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const customStyles = { control: (styles) => ({ ...styles, backgroundColor: 'white', border: "1px solid #dee2e6", borderRadius: "0px", fontFamily: "Ruda, sans-serif" }) };
    const { admissionPaymentDue, updateAdmissionPaymentDueState, fetchPaymentDueData } = useAdmissionContext()
    useEffect(() => { fetchPaymentDueData(1) }, [admissionPaymentDue.search]);

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(PaymentSchema), defaultValues: { date_and_time: "", admission_id: "", payment: "", payment_method: "" }
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(POST_PAYMENT, {
                date_and_time: data.date_and_time,
                student_id: data.admission_id,
                payment: data.payment,
                payment_method: data.payment_method
            });
            if (response && response.data && response.data.success) {
                toast.success(response.data.message || "Create Success.");
                updateAdmissionPaymentDueState({ options_value: null });
                navigate("/student/payment/table");
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
                            <h4 className="form_heading py-4">Student Payment</h4>
                            <div className="row border-top border-warning pt-4">

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Payment Date</label>
                                    <input type="date" {...register("date_and_time")} className={`form-control rounded-0 ${errors.date_and_time ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.date_and_time && <div className="invalid-feedback">{errors.date_and_time.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Select Student</label>
                                    <Select
                                        options={admissionPaymentDue.options}
                                        value={admissionPaymentDue.options_value}
                                        onChange={(value) => {
                                            updateAdmissionPaymentDueState({ options_value: value });
                                            setValue("admission_id", value ? value.value : "", { shouldValidate: true });
                                        }}
                                        onInputChange={(input) => updateAdmissionPaymentDueState({ search: input })}
                                        isLoading={admissionPaymentDue.isLoading}
                                        placeholder={admissionPaymentDue.isLoading ? "Loading..." : "Select Student"}
                                        isClearable={true}
                                        styles={customStyles}
                                        maxMenuHeight={300}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Payment</label>
                                    <input type="number" {...register("payment", { valueAsNumber: true })} className={`form-control rounded-0 ${errors.payment ? "is-invalid" : ""}`} disabled={isLoading} />
                                    {errors.payment && <div className="invalid-feedback">{errors.payment.message}</div>}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Payment </label>
                                    <select {...register("payment_method")} className={`form-select rounded-0 ${errors.payment_method ? "is-invalid" : ""}`} disabled={isLoading}>
                                        <option value="">Select Method</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Bkash">Bkash</option>
                                        <option value="Nagad">Nagad</option>
                                        <option value="Bank">Bank</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.payment_method && (<div className="invalid-feedback">{errors.payment_method.message}</div>)}
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-6"><Link to="/student/payment/table" className="btn btn-danger rounded-0 w-100 custom_btn">Cancel</Link></div>
                                <div className="col-6"><button type="submit" className="btn btn-success rounded-0 w-100 custom_btn">{isLoading ? <span role="status" className="spinner-border spinner-border-sm"></span> : "Payment"}</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </WebLayout>
    )
}

export default CreatePaymentComponent