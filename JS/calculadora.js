
const cart = [];

function addProduct() {
  // Obtiene el producto seleccionado y su cantidad
  const product = parseInt(document.getElementById("product").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  // Verifica que se haya ingresado una cantidad válida
  if (isNaN(quantity) || quantity <= 0) {
    alert("Por favor, ingrese una cantidad válida.");
    return;
  }

  // Agrega el producto al carrito
  cart.push({ product, quantity });

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
