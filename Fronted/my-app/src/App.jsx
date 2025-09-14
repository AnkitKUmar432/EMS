
// import "./App.css";
import EmployeeTable from "./components/EmployeeTable";
import { Route, Routes } from "react-router-dom";
import EmployeeEdit from "./components/EmployeeEdit";
import EmployeeForm from "./components/EmployeeForm";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/create" element={<EmployeeForm />} />
        <Route path="/update/:id" element={<EmployeeEdit />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
}

export default App;
