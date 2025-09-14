const express = require('express');
const router = express.Router();
const {createEmployee,getEmployees,getEmployeesById, deleteEmployeesById, updateEmployeesById} = require('../controllers/EmployeesController');

router.get('/',getEmployees);
router.get('/:id',getEmployeesById);
router.post('/create',createEmployee);
router.delete('/remove/:id',deleteEmployeesById);
router.patch('/update/:id',updateEmployeesById);
module.exports = router;