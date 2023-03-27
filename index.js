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
// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Patata',
        precio: 1,
        imagen: 'patata.jpg'
    },
    {
        id: 2,
        nombre: 'Cebolla',
        precio: 1.2,
        imagen: 'th-1881588962'
    },
    {
        id: 3,
        nombre: 'Calabacin',
        precio: 2.1,
        imagen: 'calabacin.jpg'
    },
    {
        id: 4,
        nombre: 'Fresas',
        precio: 0.6,
        imagen: 'fresas.jpg'
    }

];

let carrito = [];
const divisa = '€';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img-fluid');
        miNodoImagen.setAttribute('src', info.imagen);
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();
renderizarCarrito();






