const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addtocart = async (req, res) => {
    try {
        const { userID, productId, quantity } = req.body;

        // Validate request body
        if (!userID || !productId || !quantity) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Fetch product details from database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: `Product with ID ${productId} not found` });
        }

        console.log(product);

        // Create cart item with product details
      // Create cart item with product details
const cartItem = {
    userID,
    products: [{
        productId,
        productName: product.productName,
        price: product.price,
        quantity
    }]
};

        console.log(productId );
        console.log(product.productName );


        // Save the new cart item to the database
        const savedCartItem = await Cart.create(cartItem);

        res.status(200).json(savedCartItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
