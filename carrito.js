function agregarAlCarrito(nombre, precio) {
    // Obtener el carrito y la lista de productos
    const carrito = document.querySelector('#carrito');
    const listaProductos = carrito.querySelectorAll('.list-group-item');
  
    // Buscar si el producto ya está en el carrito
    let productoExistente = null;
    listaProductos.forEach(item => {
      if (item.dataset.nombre === nombre) {
        productoExistente = item;
      }
    });
  
    if (productoExistente) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      const cantidad = parseInt(productoExistente.dataset.cantidad) + 1;
      productoExistente.dataset.cantidad = cantidad;
      productoExistente.querySelector('.cantidad').textContent = cantidad;
      actualizarTotal();
    } else {
      // Si el producto no está en el carrito, agregarlo
      const nuevoProducto = document.createElement('li');
      nuevoProducto.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      nuevoProducto.dataset.nombre = nombre;
      nuevoProducto.dataset.precio = precio;
      nuevoProducto.dataset.cantidad = 1;
      nuevoProducto.innerHTML = `
        <span class="nombre">${nombre}</span>
        <span class="precio">${precio}₡</span>
        <span class="cantidad badge badge-primary badge-pill">1</span>
      `;
      carrito.appendChild(nuevoProducto);
      actualizarTotal();
    }
  }
  
  function actualizarTotal() {
    // Obtener todos los precios y cantidades
    const listaProductos = document.querySelectorAll('#carrito .list-group-item');
    let total = 0;
    let cantidadTotal = 0;
    listaProductos.forEach(item => {
      const precio = parseInt(item.dataset.precio);
      const cantidad = parseInt(item.dataset.cantidad);
      total += precio * cantidad;
      cantidadTotal += cantidad;
    });
  
    // Actualizar los elementos HTML
    document.querySelector('#total').textContent = total;
  }
  