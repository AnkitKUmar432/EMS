import React, { useEffect, useState } from 'react'
import { Field, Formik, Form } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import {toast} from 'react-toastify'
function EmployeeEdit() {
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    salary: '',
    joining_date: '',
    department: '',
    age: ''
  });

 useEffect(() => {
  let getData = async () => {
    try {
      let res = await axios.get(`${URL}/${id}`);
      const emp = res.data; // 👈 ab yahan array nahi, directly object milega
      
      setInitialValues({
        ...emp,
        joining_date: emp.joining_date?.slice(0, 10) || "" // ✅ date field fix
      });
    } catch (err) {
      toast.error("Error fetching employee:");
    }
  };
  getData();
}, [id]);


  let submitForm = async (values) => {
    try {
      await axios.patch(`${URL}/update/${id}`, values);
      toast.success("Employee updated successfully!");
      navigate('/');
    } catch (error) {
      // console.log("Error updating employee: ", error);
      toast.error("Error updating employee");
    }
  };

  return (
    <div className='container mt-5'>
      <h2>Update Employee</h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={submitForm}
      >
        {() => (
          <Form>
            <label>Name:</label>
            <Field name="name" type="text" className='form-control mb-3' />

            <label>Email:</label>
            <Field name="email" type="email" className='form-control mb-3' />

            <label>Salary:</label>
            <Field name="salary" type="number" className='form-control mb-3' />

            <label>Joining Date:</label>
            <Field name="joining_date" type="date" className="form-control mb-3" />

            <label>Department:</label>
            <Field name="department" type="text" className="form-control mb-3" />

            <label>Age:</label>
            <Field name="age" type="number" className="form-control mb-3" />

            <button type="submit" className="btn btn-success">Update</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EmployeeEdit;
