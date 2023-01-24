const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//mysqlheroku
const connection = mysql.createConnection({
    host: "eu-cdbr-west-03.cleardb.net",
    user: "b6611ca55c2850",
    password: "22de0b51",
    database: "heroku_000034b1603f252"
});

//Routes
app.get('/data', (req, res) => {
    const sql = 'SELECT * FROM datos';

    connection.query(sql, (error, results) => {

        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    });
});

app.get('/data/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM datos WHERE id = ${id}`;

    connection.query(sql, (error, results) => {

        if (error) {
            throw error;
        } else {
            res.json(results);
        }
    });
});

app.post('/data', (req, res) => {
    const sql = 'INSERT INTO datos SET ?';
    const obj = {
        propietario: req.body.propietario,
        marca: req.body.marca,
        modelo: req.body.modelo,
        matricula: req.body.matricula
    };

    connection.query(sql, obj, error => {

        if (error) {
            throw error;
        } else {
            res.send('Created');
        }
    });
});

app.put('/data/:id', (req, res) => {
    const { id } = req.params;
    const { propietario, marca, modelo, matricula } = req.body;
    const sql = `UPDATE datos SET propietario = '${propietario}', marca = '${marca}', modelo = '${modelo}', matricula = '${matricula}' WHERE id = '${id}'`;

    connection.query(sql, error => {
        if (error) {
            throw error;
        } else {
            res.send('Updated');
        }
    });
});

app.delete('/data/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM datos WHERE id = '${id}'`;

    connection.query(sql, error => {
        if (error) {
            throw error;
        } else {
            res.send('Deleted');
        }
    });
});

// check connection
connection.connect(error => {

    if (error) {
        throw error;
    } else {
        console.log('connection OK');
    }
});

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
})
