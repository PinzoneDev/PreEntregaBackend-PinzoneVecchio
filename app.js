const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

const productManager = new ProductManager('./products.json');

// Endpoint para obtener todos los productos con límite opcional
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts(limit);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para obtener un producto por id
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  if (!isNaN(productId)) {
    try {
      const product = await productManager.getProductById(productId);
      if (product) {
        res.json({ product });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
