import { useState } from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable";
import { Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/EmployeeEdit";
import EmployeeEdit from "./components/EmployeeForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<EmployeeTable />} />
        <Route path="/create" element={<EmployeeForm/>} />
        <Route path="/update/:id" element={<EmployeeEdit/>} />
      </Routes>

      <div className="container mt-5">
        <h1 className="text-primary">Hello Bootstrap in React</h1>
        <button className="btn btn-success">Click Me</button>
      </div>

      {/* Agar neeche EmployeeTable dikhana chahte ho to Routes me dobara dene ki need nahi hai */}
      {/* <EmployeeTable /> */}
    </>
  );
}

export default App;
