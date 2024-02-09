require('dotenv').config()
var express = require('express')
var cors = require('cors')
var app = express()

const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
const corsOptions = {
  origin: 'http://localhost:4200', // กำหนด URL ของ port 4200
};
app.use(cors(corsOptions))

app.get('/helloworld', function (req, res, next) {
  res.json({msg: 'helloworld'})
})

app.get('/products', function (req, res, next) {
    // execute will internally call prepare and query
    connection.execute(
        'SELECT * FROM it_product',
        function (err, results, fields) {
        res.json(results)
        }
    );
  })

app.listen(process.env.PORT, function () {
  console.log('CORS-enabled web server listening on port 5000')
})