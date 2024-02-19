const fs = require('fs');

class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Método para crear un nuevo carrito
  createCart() {
    const newCartId = Math.floor(Math.random() * 1000); // Generar ID único

    const newCart = {
      id: newCartId,
      products: [],
    };

    // Guardar el nuevo carrito en el archivo
    this.saveCartToFile(newCart);

    console.log(`New cart created with ID: ${newCartId}`);
    return newCartId;
  }

  // Método para obtener un carrito por su ID
  getCartById(cartId) {
    const carts = this.getCartsFromFile();
    return carts.find(cart => cart.id === cartId) || null;
  }

  // Método para agregar un producto al carrito
  addProductToCart(cartId, productId, quantity = 1) {
    const carts = this.getCartsFromFile();
    const cartIndex = carts.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
      throw new Error('Cart not found.');
    }

    const cart = carts[cartIndex];
    const existingProductIndex = cart.products.findIndex(product => product.id === productId);

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({ id: productId, quantity });
    }

    carts[cartIndex] = cart;
    this.saveCartsToFile(carts);

    console.log(`Product with ID ${productId} added to cart with ID ${cartId}`);
  }

  // Método para guardar los carritos en un archivo
  saveCartsToFile(carts) {
    fs.writeFileSync(this.path, JSON.stringify(carts, null, 2), 'utf8');
  }

  // Métodos existentes (getCartsFromFile)...
}

module.exports = CartManager;
