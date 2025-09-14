const db = require('../config/db');

const HRAValue = (salary) => Number((salary * 0.30).toFixed(2));

exports.createEmployee = (req, res) => {
    const { name, email, salary, joining_date, department, age } = req.body;

    if (!name || !email || !salary || !joining_date || !department || !age) {
        return res.status(400).json({ error: "All fields are required" });
    }

    
    if (typeof salary !== 'number' || salary <= 0)
        return res.status(400).json({ error: "Salary must be a positive number" });

    if (!/^\S+@\S+\.\S+$/.test(email))
        return res.status(400).json({ error: "Invalid email format" });

    if (typeof age !== 'number' || age <= 0)
        return res.status(400).json({ error: "Age must be a positive number" });

    const HRA = HRAValue(salary);

    const query = `INSERT INTO employees 
        (name, email, salary, HRA, joining_date, department, age) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, email, salary, HRA, joining_date, department, age], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.status(201).json({ message: "Employee created successfully", employeeId: result.insertId });
    });
}

exports.getEmployees = (req, res) => {
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
};


exports.getEmployeesById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM employees WHERE e_id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching employee", details: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Employee not found" });

    res.json(result[0]);
  });
};

exports.updateEmployeesById = (req, res) => {
    const { id } = req.params;
    const { name, email, salary, joining_date, department, age } = req.body;
    const HRA = HRAValue(salary);
    const sqlDate = joining_date ? new Date(joining_date).toISOString().split("T")[0] : null;
    const query = `UPDATE employees SET name=?, email=?, salary=?, HRA=?, joining_date=?, department=?,age=? WHERE e_id=?`;

    db.query(query, [name, email, salary, HRA, sqlDate, department, age, id], (err, result) => {
        
        if (err) return res.status(500).json({ err: "Employees not updated" })
        if (result.affectedRows === 0) return res.status(404).json({ message: "Employee not found" });

        return res.json({ message: "updated successfully" });

    })

}

exports.deleteEmployeesById = (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM employees WHERE e_id = ?', [id], (err, result) => {
        if (err) return res.status(404).json({ error: "Not Found" });
        res.status(200).json({ message: "Mission Success" })
    });
}