const mysql = require('mysql');
const util = require('util');
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const DB_NAME = "Employee";
const DB_HOST = "localhost";
const DB_USERNAME = "root";
const DB_PASSWORD = "root";

const dbName = DB_NAME;
const dbHost = DB_HOST;
const dbUserName = DB_USERNAME;
const dbPassword = DB_PASSWORD;

const pool = mysql.createPool({
  connectionLimit: 100,
  host: dbHost,
  user: dbUserName,
  password: dbPassword,
  database: dbName
});

module.exports = pool;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});

app.get('/', function (req, res) {
    res.send('GET request to homepage, SUCCESS!');
});

app.get('/registerEMployee', (req, res) => {
    res.render('form');
});

app.post('/addEmployee', async(req, res) => {
    const {
        First_Name,
        Last_Name,
        Email_Address,
        Portfolio,
        Position,
        Salary,
        StartDate,
        Phone,
        Fax,
        Relocate,
        Organization,
        Reference,
    } = req.body;
    // console.log('req >>>>', req.body);
    try {
        const query = util.promisify(pool.query).bind(pool);
        let insertQuery = 'INSERT INTO ?? (??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        let finalQuery = mysql.format(insertQuery,
            [
                "employeeDetails",
                "First_Name",
                "Last_Name",
                "Email_Address",
                "Portfolio",
                "Position",
                "Salary",
                "StartDate",
                "Phone",
                "Fax",
                "Relocate",
                "Organization",
                "Reference",
                First_Name,
                Last_Name,
                Email_Address,
                Portfolio,
                Position,
                Salary,
                StartDate,
                Phone,
                Fax,
                Relocate,
                Organization,
                Reference,
            ]);
        await query(finalQuery); 
        res.send('Data inserted successfully');
    } catch (error) {
        console.log('ERROR OCCURRED!!!!', error);
        res.send('Error Occured');
    }
});