const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  // Métodos existentes (addProduct, getProducts, getProductById, updateProduct, deleteProduct)...

  addProduct(productData) {
    const products = this.getProductsFromFile();

    // Generar ID único
    const newProductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    // Completar los datos del producto
    const newProduct = {
      id: newProductId,
      ...productData,
      status: true, // Definir status como true por defecto
    };

    // Validar campos obligatorios
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
      throw new Error('All fields are required.');
    }

    // Agregar el nuevo producto al arreglo
    products.push(newProduct);

    // Guardar los productos en el archivo
    this.saveProductsToFile(products);

    console.log(`Product added successfully. ID: ${newProductId}`);
    return newProductId;
  }

  updateProduct(productId, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) {
      throw new Error('Product not found.');
    }

    const updatedProduct = {
      ...products[productIndex],
      ...updatedFields,
      id: productId, // Asegurar que el ID no se actualice
    };

    products[productIndex] = updatedProduct;
    this.saveProductsToFile(products);

    console.log(`Product with ID ${productId} updated successfully.`);
  }

  // Método para guardar productos en un archivo
  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), 'utf8');
  }

  // Métodos existentes (getProductsFromFile)...
}

module.exports = ProductManager;
