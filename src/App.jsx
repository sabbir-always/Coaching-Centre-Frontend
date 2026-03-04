import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "react-toastify/dist/ReactToastify.css";
// react-toastify
import { ToastContainer } from "react-toastify"
import { Route, Routes } from "react-router-dom"
import AdmissionPage from "./pages/AdmissionPage"
import DashboardPage from "./pages/DashboardPage"
import DepartmentPage from "./pages/DepartmentPage"
import PaymentPage from "./pages/PaymentPage"
import SectionPage from "./pages/SectionPage"
import SemesterPage from "./pages/SemesterPage"
import TeacherPage from "./pages/TeacherPage"
import LoginPage from "./pages/LoginPage"
import CreateDepartmentComponent from "./components/department/CreateDepartmentComponent";
import UpdateDepartmentComponent from "./components/department/UpdateDepartmentComponent";
import CreateSemesterComponent from "./components/semester/CreateSemesterComponent"
import UpdateSemesterComponent from "./components/semester/UpdateSemesterComponent"
import CreateSectionComponent from "./components/section/CreateSectionComponent"
import UpdateSectionComponent from "./components/section/UpdateSectionComponent"
import CreateTeacherComponent from "./components/teacher/CreateTeacherComponent";
import UpdateTeacherComponet from "./components/teacher/UpdateTeacherComponet";
import CreateAdmissionComponent from "./components/admission/CreateAdmissionComponent";
import UpdateAdmissionComponent from "./components/admission/UpdateAdmissionComponent";
import CreatePaymentComponent from "./components/payment/CreatePaymentComponent";
import UpdatePaymentComponent from "./components/payment/UpdatePaymentComponent";
import './App.css'

function App() {
  return (
    <><ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/student/admission/table" element={<AdmissionPage />} />
        <Route path="/student/admission/create" element={<CreateAdmissionComponent />} />
        <Route path="/student/admission/update/:id" element={<UpdateAdmissionComponent />} />
        <Route path="/academic/department/table" element={<DepartmentPage />} />
        <Route path="/academic/department/create" element={<CreateDepartmentComponent />} />
        <Route path="/academic/department/update/:id" element={<UpdateDepartmentComponent />} />
        <Route path="/student/payment/table" element={<PaymentPage />} />
        <Route path="/student/payment/create" element={<CreatePaymentComponent />} />
        <Route path="/student/payment/update/:id" element={<UpdatePaymentComponent />} />
        <Route path="/student/section/table" element={<SectionPage />} />
        <Route path="/student/section/create" element={<CreateSectionComponent />} />
        <Route path="/student/section/update/:id" element={<UpdateSectionComponent />} />
        <Route path="/student/semester/table" element={<SemesterPage />} />
        <Route path="/student/semester/create" element={<CreateSemesterComponent />} />
        <Route path="/student/semester/update/:id" element={<UpdateSemesterComponent />} />
        <Route path="/academic/teacher/table" element={<TeacherPage />} />
        <Route path="/academic/teacher/create" element={<CreateTeacherComponent />} />
        <Route path="/academic/teacher/update/:id" element={<UpdateTeacherComponet />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
