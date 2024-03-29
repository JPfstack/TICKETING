const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//mysqlheroku
const connection = mysql.createConnection({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b28577ceb8e607",
    password: "a030f8fb",
    database: "heroku_687d24e53797995"
});
//mysql://b28577ceb8e607:a030f8fb@us-cdbr-east-06.cleardb.net/heroku_687d24e53797995?reconnect=true
//Routes

app.get('/', (req, res) => {

    res.send('HOLA QUE TAL');
});

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
