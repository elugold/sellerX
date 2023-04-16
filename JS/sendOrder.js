
function sendOrder() {

    window.location.href = "../pages/shipping.html";
    

    // Obtiene la información del pedido y la información de envío del formulario
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const postalCode = document.getElementById("postalCode").value;
  
    // Verifica que se hayan ingresado todos los campos necesarios
    if (!name || !address || !city || !state || !country || !postalCode) {
      alert("Por favor, ingrese toda la información de envío necesaria.");
      return;
    }
  
    // Calcula el precio total del carrito
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
    // Crea un objeto que contenga la información del pedido y la información de envío
    const order = {
      cart: cart,
      total: total,
      name: name,
      address: {
        street: address,
        city: city,
        state: state,
        country: country,
        postalCode: postalCode
      }
    };
  
    // Crea una cadena de texto que contenga la información del carrito de compras y del formulario de envío
    const orderInfo = `Carrito de compras: ${JSON.stringify(cart)} \n Total: ${total} \n Detalles de envío: ${JSON.stringify(order.address)}`;
  
    alert(orderInfo)
  }


// Declaración de variables y objetos
var precioProducto = 100;
var cantidad = 0;
var descuento = 0;
var costoEnvio = 10;
var impuesto = 0.21;
var total = 0;

// Captura de entradas por prompt
cantidad = prompt("Ingrese la cantidad que desea comprar:");
descuento = prompt("Ingrese el código de descuento (si no tiene, deje en blanco):");

// Función para calcular el descuento
function calcularDescuento(precio, cantidad, descuento) {
  var descuentoAplicado = 0;
  if (descuento == "DESC10") {
    descuentoAplicado = 0.1;
  } else if (descuento == "DESC20") {
    descuentoAplicado = 0.2;
  }
  var descuentoTotal = precio * cantidad * descuentoAplicado;
  return descuentoTotal;
}

// Función para calcular el impuesto
function calcularImpuesto(precio, cantidad, impuesto) {
  var impuestoTotal = precio * cantidad * impuesto;
  return impuestoTotal;
}

// Cálculo del total a pagar
var descuentoTotal = calcularDescuento(precioProducto, cantidad, descuento);
var impuestoTotal = calcularImpuesto(precioProducto, cantidad, impuesto);
total = precioProducto * cantidad - descuentoTotal + impuestoTotal + costoEnvio;

// Mostrar salidas por alert
alert("Precio original del producto: $" + precioProducto);
alert("Cantidad: " + cantidad);
alert("Descuento aplicado: $" + descuentoTotal);
alert("Impuesto aplicado: $" + impuestoTotal);
alert("Costo de envío: $" + costoEnvio);
alert("Total a pagar: $" + total.toFixed(2));

