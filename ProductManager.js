const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();

    // Validar que el código sea único
    if (products.some(p => p.code === product.code)) {
      console.error("Error: Duplicate product code.");
      return;
    }

    // Asignar un id autoincrementable
    const productId = products.length + 1;
    product.id = productId;

    // Agregar el producto al arreglo
    products.push(product);

    // Guardar en el archivo
    this.saveProductsToFile(products);

    console.log(`Product added successfully. ID: ${productId}`);
  }

  getProducts(limit) {
    const products = this.getProductsFromFile();
    return limit ? products.slice(0, limit) : products;
  }

  getProductById(productId) {
    const products = this.getProductsFromFile();
    const product = products.find(p => p.id === productId);
    return product || null;
  }

  updateProduct(productId, updatedProduct) {
    const products = this.getProductsFromFile();
    const index = products.findIndex(p => p.id === productId);

    if (index !== -1) {
      // Actualizar el producto sin cambiar su ID
      updatedProduct.id = productId;
      products[index] = updatedProduct;
      this.saveProductsToFile(products);
      console.log(`Product with ID ${productId} updated successfully.`);
    } else {
      console.error("Error: Product not found.");
    }
  }

  deleteProduct(productId) {
    let products = this.getProductsFromFile();
    const updatedProducts = products.filter(p => p.id !== productId);

    if (updatedProducts.length < products.length) {
      // Si se eliminó algún producto
      this.saveProductsToFile(updatedProducts);
      console.log(`Product with ID ${productId} deleted successfully.`);
    } else {
      console.error("Error: Product not found.");
    }
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o hay algún error al leerlo, devuelve un array vacío.
      return [];
    }
  }

  saveProductsToFile(products) {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }
}

module.exports = ProductManager;
