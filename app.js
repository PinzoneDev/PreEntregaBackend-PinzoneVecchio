const express = require('express');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('./products.json');
const cartManager = new CartManager('./carts.json');

app.use(express.json());

// Rutas para productos
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = productManager.getProducts(limit);
  res.json(products);
});

productRouter.get('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = productManager.getProductById(productId);
  res.json(product);
});

productRouter.post('/', (req, res) => {
  try {
    const productId = productManager.addProduct(req.body);
    res.status(201).json({ productId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

productRouter.put('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    productManager.updateProduct(productId, req.body);
    res.status(200).send('Product updated successfully.');
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

productRouter.delete('/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    productManager.deleteProduct(productId);
    res.status(200).send('Product deleted successfully.');
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.use('/api/products', productRouter);

// Rutas para carritos
const cartRouter = express.Router();

cartRouter.post('/', (req, res) => {
  const cartId = cartManager.createCart();
  res.status(201).json({ cartId });
});

cartRouter.get('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = cartManager.getCartById(cartId);
  res.json(cart);
});

cartRouter.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const quantity = parseInt(req.body.quantity) || 1;
  try {
    cartManager.addProductToCart(cartId, productId, quantity);
    res.status(200).send('Product added to cart successfully.');
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.use('/api/carts', cartRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
