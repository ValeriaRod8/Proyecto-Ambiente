// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Salchipapas Colombianas',
        precio: 11000,
        imagen: '/src/pics/previews_0012_custom_1604997535.1665.jpg'
    },
    {
        id: 2,
        nombre: 'Pizza Artesanal',
        precio: 15000,
        imagen: '/src/pics/pizza-4-1.jpg'
    },
    {
        id: 3,
        nombre: 'Espaguetti Italia',
        precio: 4500,
        imagen: '/src/pics/th-1881588962'
    },
    {
        id: 4,
        nombre: 'Hambugueza Deluxe',
        precio: 4000,
        imagen: '/src/pics/th-1358255314'
    }

];

let carrito = [];
const divisa = '₡';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones

/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function agregarAlCarrito(nombre, precio) {
    // Creamos un objeto para el producto
    const producto = {
      nombre: nombre,
      precio: precio
    };
  
    // Buscamos el carrito en el DOM
    const carrito = document.querySelector('#carrito tbody');
  
    // Buscamos si ya existe el producto en el carrito
    const existeEnCarrito = Array.from(carrito.children).some((fila) => {
      return fila.querySelector('.nombre-producto').textContent === nombre;
    });
  
    // Si ya existe, aumentamos la cantidad y actualizamos el total
    if (existeEnCarrito) {
      const fila = Array.from(carrito.children).find((fila) => {
        return fila.querySelector('.nombre-producto').textContent === nombre;
      });
      const cantidad = fila.querySelector('.cantidad-producto');
      cantidad.value++;
      actualizarTotal();
    } else { // Si no existe, creamos una nueva fila en la tabla
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td class="nombre-producto">${nombre}</td>
        <td class="precio-producto">${precio}</td>
        <td><input type="number" class="cantidad-producto" value="1"></td>
        <td class="subtotal-producto">${precio}</td>
        <td><button class="btn btn-danger" onclick="eliminarDelCarrito(this)">X</button></td>
      `;
      carrito.appendChild(fila);
      actualizarTotal();
    }
  }
  
  function actualizarTotal() {
    const carrito = document.querySelector('#carrito tbody');
    const total = Array.from(carrito.children).reduce((acumulador, fila) => {
      const precio = parseFloat(fila.querySelector('.precio-producto').textContent);
      const cantidad = parseFloat(fila.querySelector('.cantidad-producto').value);
      return acumulador + (precio * cantidad);
    }, 0);
    document.querySelector('#total-carrito').textContent = `₡${total}`;
  }
  
  function eliminarDelCarrito(boton) {
    const fila = boton.closest('tr');
    const nombre = fila.querySelector('.nombre-producto').textContent;
    const precio = parseFloat(fila.querySelector('.precio-producto').textContent);
    const cantidad = parseFloat(fila.querySelector('.cantidad-producto').value);
    const carrito = document.querySelector('#carrito tbody');
    carrito.removeChild(fila);
    actualizarTotal();
  }  

  function vaciarCarrito() {
    // Obtener la tabla del carrito
    let tablaCarrito = document.getElementById("carrito-tabla");
  
    // Borrar todas las filas del cuerpo de la tabla
    tablaCarrito.getElementsByTagName("tbody")[0].innerHTML = "";
  
    // Reinicializar el arreglo carrito a un arreglo vacío
    carrito = [];
  
    // Actualizar el total del carrito
    actualizarTotal();
  }
  