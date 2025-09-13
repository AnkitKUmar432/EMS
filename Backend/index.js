const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const EmployeeRoutes = require('./routes/EmployeesRoutes');

const app = express();
 
dotenv.config();
app.use(cors());
app.use(express.json());

// ✅ Corrected Route Prefix
app.use('/api/employees', EmployeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
