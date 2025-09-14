import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';  // ✅ tumne import nahi kiya
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EmployeeForm() {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  const initialValues = {
    name: '',
    email: '',
    salary: '',
    joining_date: '',
    department: '',
    age: ''
  }
  let submitForm = async (values) => {
    
    try {
      await axios.post(`${URL}/create`, values);
      toast.success("Employee created successfully!");
      navigate('/');
    } catch (error) {
      // console.log("Creating employee Error: ", error);
      toast.error("Creating employee Error");
    }
  };
  return (
    <div className='m-5'>
      <h1>Register Employees</h1>
      <Formik

        initialValues={initialValues}
        onSubmit={submitForm}
      >
        {({ values }) => (
          <Form>
            <label>Name:</label>
            <Field name="name" type="text" className='form-control mb-3' required />

            <label>Email:</label>
            <Field name="email" type="email" className='form-control mb-3' required />

            <label>Salary:</label>
            <Field name="salary" type="number" className='form-control mb-3' required />

            <label>Joining Date:</label>
            <Field name="joining_date" type="date" className="form-control mb-3" required />

            <label>Department:</label>
            <Field name="department" type="text" className="form-control mb-3" required />

            <label>Age:</label>
            <Field name="age" type="number" className="form-control mb-3" required />

            <button type="submit" className="btn btn-success">Create</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EmployeeForm