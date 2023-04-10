


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
  
