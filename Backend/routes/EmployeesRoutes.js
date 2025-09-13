const express = require('express');
const router = express.Router();
const {createEmployee,getEmployees, deleteEmployeesById, updateEmployeesById} = require('../controllers/EmployeesController');

router.get('/',getEmployees);
router.post('/create',createEmployee);
router.delete('/remove/:id',deleteEmployeesById);
router.delete('/update/:id',updateEmployeesById);
module.exports = router;