
const cart = [];

function addProduct() {
  // Obtiene el producto seleccionado y su cantidad
  const product = parseInt(document.getElementById("product").value);
  let quantity = parseInt(document.getElementById("quantity").value);

  // Verifica que se haya ingresado una cantidad válida
  if (isNaN(quantity) || quantity <= 0) {
    alert("Por favor, ingrese una cantidad válida.");
    return;
  }

  // Busca el producto en el carrito
  const existingProduct = cart.find(item => item.product === product);

  // Si el producto ya existe, incrementa su cantidad
  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    // Si el producto no existe, agrega el producto al carrito
    cart.push({ product, quantity });
  }

  // Limpia el campo "quantity"
  quantity = 0;
  document.getElementById("quantity").value = quantity;

  // Muestra el carrito en la página
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    switch (item.product) {
      case 1:
        li.innerHTML = `${item.quantity} x Headsets ($10)`;
        break;
      case 2:
        li.innerHTML = `${item.quantity} x Hard Drive ($15)`;
        break;
      case 3:
        li.innerHTML = `${item.quantity} x Batery ($20)`;
        break;
    }
    cartElement.appendChild(li);
  });

  // Muestra u oculta el botón de "Eliminar carrito" según corresponda
  const eliminarCarritoButton = document.getElementById("eliminar-carrito");
  const calcularPriceButton = document.getElementById("calculate-price");
  if (cart.length > 0) {
    eliminarCarritoButton.style.display = "block";
    calcularPriceButton.style.display = "block";
  } else {
    eliminarCarritoButton.style.display = "none";
    calcularPriceButton.style.display = "none";
  }
}

function emptyCart() {
  // Vaciar el arreglo "cart"
  cart.length = 0;

  // Actualizar el contenido del elemento HTML correspondiente
  const cartElement = document.getElementById("cart");
  cartElement.innerHTML = "El carrito está vacío.";

  // Ocultar el botón de "Eliminar carrito"
  const eliminarCarritoButton = document.getElementById("eliminar-carrito");
  eliminarCarritoButton.style.display = "none";

  // Ocultar el parrafo de "price"
  const priceP = document.getElementById("price");
  priceP.style.display = "none";

  const calcularPriceButton = document.getElementById("calculate-price");
  calcularPriceButton.style.display = "none";
}


function calculatePrice() {
  let price = 0;

  // Calcula el precio total en base al carrito
  cart.forEach((item) => {
    switch (item.product) {
      case 1:
        price += 10 * item.quantity;
        break;
      case 2:
        price += 15 * item.quantity;
        break;
      case 3:
        price += 20 * item.quantity;
        break;
    }
  });

  // Muestra el precio total en la página
  document.getElementById("price").innerHTML = `El precio total es: $${price}`;

}

// crea un botón de compra
const buyButton = document.createElement('button');
buyButton.textContent = 'Comprar';
let formCreated = false;
const form = document.createElement('form');
// agrega un evento para el botón de compra
buyButton.addEventListener('click', () => {
  // Verificar si el formulario ya ha sido creado
  if (formCreated) {
    return;
  }
  // Crear un formulario
  // const form = document.createElement('form');
  form.setAttribute('id', 'shipping-form');

  // Agregar campo de nombre
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.textContent = 'Nombre: ';
  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'name');
  nameInput.setAttribute('name', 'name');
  nameInput.setAttribute('required', true);
  nameLabel.appendChild(nameInput);
  form.appendChild(nameLabel);

  // Agregar campo de dirección
  const addressLabel = document.createElement('label');
  addressLabel.setAttribute('for', 'address');
  addressLabel.textContent = 'Dirección: ';
  const addressInput = document.createElement('input');
  addressInput.setAttribute('type', 'text');
  addressInput.setAttribute('id', 'address');
  addressInput.setAttribute('name', 'address');
  addressInput.setAttribute('required', true);
  addressLabel.appendChild(addressInput);
  form.appendChild(addressLabel);

  // Agregar campo de ciudad
  const cityLabel = document.createElement('label');
  cityLabel.setAttribute('for', 'city');
  cityLabel.textContent = 'Ciudad: ';
  const cityInput = document.createElement('input');
  cityInput.setAttribute('type', 'text');
  cityInput.setAttribute('id', 'city');
  cityInput.setAttribute('name', 'city');
  cityInput.setAttribute('required', true);
  cityLabel.appendChild(cityInput);
  form.appendChild(cityLabel);

  // Agregar campo de código postal
  const zipLabel = document.createElement('label');
  zipLabel.setAttribute('for', 'zip');
  zipLabel.textContent = 'Código postal: ';
  const zipInput = document.createElement('input');
  zipInput.setAttribute('type', 'text');
  zipInput.setAttribute('id', 'zip');
  zipInput.setAttribute('name', 'zip');
  zipInput.setAttribute('required', true);
  zipLabel.appendChild(zipInput);
  form.appendChild(zipLabel);

  // Agregar botón de envío
  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Enviar';
  form.appendChild(submitButton);

  // Agregar formulario al DOM
  const formContainer = document.getElementById('form-container');
  formContainer.appendChild(form);

  // Actualizar la variable de estado
  formCreated = true;
});




form.addEventListener('submit', async (event) => {
  event.preventDefault(); // evita que la página se recargue al enviar el formulario

  // Obtiene los valores del formulario
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const zip = document.getElementById('zip').value;

  const shippingData = { name, address, city, zip };
  const cart = JSON.parse(localStorage.getItem('cart'));

  try {
    // Simula un proceso de pago con un delay de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Realiza el fetch a los datos de envío
    const response = await fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .then(json => console.log(json));

    // Guarda el carrito y los datos de envío en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('shippingData', JSON.stringify(shippingData));

    // Oculta el formulario y muestra el mensaje de confirmación
    form.style.display = 'none';
    const confirmationMessage = document.createElement('p');
    confirmationMessage.textContent = 'Gracias por su compra. Los siguientes son los detalles de su pedido:';
    const cartElement = document.getElementById('cart');
    cartElement.parentNode.insertBefore(confirmationMessage, cartElement);

    // Muestra una notificación de éxito con SweetAlert
    swal({
      title: "¡Compra realizada con éxito!",
      icon: "success",
      button: "Continuar",
    });
    showOrderDetails();
  } catch (error) {
    console.error(error);

    // Muestra una notificación de error con SweetAlert
    swal({
      title: "Ha ocurrido un error",
      text: "No se pudo procesar la compra",
      icon: "error",
      button: "Cerrar",
    });
  }
});

function showOrderDetails() {
  // Obtiene el carrito y los datos de envío del localStorage
  const cart = JSON.parse(localStorage.getItem('cart'));
  const shippingData = JSON.parse(localStorage.getItem('shippingData'));

  // Muestra los detalles del envío
  const shippingDetails = document.createElement('div');
  const nameParagraph = document.createElement('p');
  nameParagraph.textContent = `Nombre: ${shippingData.name}`;
  shippingDetails.appendChild(nameParagraph);
  const addressParagraph = document.createElement('p');
  addressParagraph.textContent = `Dirección: ${shippingData.address}`;
  shippingDetails.appendChild(addressParagraph);
  const cityParagraph = document.createElement('p');
  cityParagraph.textContent = `Ciudad: ${shippingData.city}`;
  shippingDetails.appendChild(cityParagraph);
  const zipParagraph = document.createElement('p');
  zipParagraph.textContent = `Código postal: ${shippingData.zip}`;
  shippingDetails.appendChild(zipParagraph);
  const orderDetailsContainer = document.getElementById('order-details');
  orderDetailsContainer.style.display = 'block';
  orderDetailsContainer.appendChild(shippingDetails);

  // Muestra los detalles del carrito
  const cartDetails = document.createElement('ul');
  cart.forEach(item => {
    const li = document.createElement('li');
    switch (item.product) {
      case 1:
        li.innerHTML = `${item.quantity} x Headsets ($10)`;
        break;
      case 2:
        li.innerHTML = `${item.quantity} x Hard Drive ($15)`;
        break;
      case 3:
        li.innerHTML = `${item.quantity} x Batery ($20)`;
        break;
    }
    cartDetails.appendChild(li);
  });
  orderDetailsContainer.appendChild(cartDetails);
}


// agrega el botón de compra a un elemento existente en la página
const container = document.getElementById('comprar');
container.appendChild(buyButton);



