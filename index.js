const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql'); // Importamos el modulo mysql para poder conectarnos a la base de datos



app.use(express.static('src'));


app.get('/', (req, res) => res.sendfile(__dirname + '/src/view/index.html'));
app.get('/contacto', (req, res) => res.sendfile(__dirname + '/src/view/contacto.html'));
app.get('/menu', (req, res) => res.sendfile(__dirname + '/src/view/menu.html'));
app.get('/reservas', (req, res) => res.sendfile(__dirname + '/src/view/reservas.html'));

const connection = mysql.createConnection({ // Creamos la conexion a la base de datos
    host: 'localhost', // Host de la base de datos (localhost) 
    port: 3306, // Puerto de la base de datos (3306)
    database: 'restaurante', // Nombre de la base de datos (restaurante) 
    user: "restaurante", // Usuario de la base de datos (root) 
    password: "restaurante" // Contraseña de la base de datos (vacio) 
});


connection.connect((err) => { // Conectamos a la base de datos 
    if (err) throw err; // Si hay un error lo mostramos en consola 
    console.log('Conectado a la base de datos'); // Si no hay error mostramos un mensaje de conexion exitosa 
});

app.get('/api/ordenes', (req, res) => { // Creamos la ruta para obtener los datos de la base de datos 
    connection.query('SELECT * FROM ORDENES', (err, rows) => { // Hacemos la consulta a la base de datos
        if (err) throw err; // Si hay un error lo mostramos en consola
        res.send(rows); // Si no hay error mostramos los datos de la base de datos
    });
});

app.get('/api/ordenes/:id', (req, res) => { // Creamos la ruta para obtener los datos de la base de datos
    connection.query('SELECT * FROM ORDENES WHERE ID = ?', [req.params.id], (err, rows) => { // Hacemos la consulta a la base de datos
        if (err) throw err; // Si hay un error lo mostramos en consola
        res.send(rows); // Si no hay error mostramos los datos de la base de datos
    });
});

app.post('/api/ordenes', (req, res) => { // Creamos la ruta para insertar datos a la base de datos 
    connection.query('INSERT INTO ORDENES (NUMERO_MESA,ORDEN,TIPO_ORDEN,TOTAL) VALUES (?,?,?,?)', [req.body.NUMERO_MESA, req.body.ORDEN, req.body.TIPO_ORDEN, req.body.TOTAL], (err, rows) => { // Hacemos la consulta a la base de datos 
        if (err) throw err; // Si hay un error lo mostramos en consola
        res.send(rows); // Si no hay error mostramos los datos de la base de datos
    }); 
});


    app.put('/api/ordenes/:id', (req, res) => { // Creamos la ruta para actualizar datos de la base de datos
        connection.query('UPDATE ORDENES SET ? WHERE ID = ?', [req.body, req.params.id], (err, rows) => { // Hacemos la consulta a la base de datos
            if (err) throw err; // Si hay un error lo mostramos en consola
            res.send(rows); // Si no hay error mostramos los datos de la base de datos
        });
    });

    app.delete('/api/ordenes/:id', (req, res) => { // Creamos la ruta para eliminar datos de la base de datos
        connection.query('DELETE FROM ORDENES WHERE ID = ?', [req.params.id], (err, rows) => { // Hacemos la consulta a la base de datos
            if (err) throw err; // Si hay un error lo mostramos en consola
            res.send(rows); // Si no hay error mostramos los datos de la base de datos
        });
    });



    app.listen(port, () => console.log(`http://localhost:${port}`));





