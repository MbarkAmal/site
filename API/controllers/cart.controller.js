const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

exports.addtocart = async (req, res) => {
    try {
        const { userID, productId, quantity } = req.body;

        // Validate request body
        if (userID === undefined || productId === undefined || quantity === undefined) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // If userID is null or undefined, set it to null
        const userIdToSave = userID || null;

        // Fetch product details from database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: `Product with ID ${productId} not found` });
        }

        // Calculate the total price
        const total = product.price * quantity;

        // Create cart item with user and product details
        const cartItem = {
            userID: userIdToSave,
            products: [{
                _id: productId,
                productName: product.productName,
                price: product.price
            }],
            quantity: quantity,
            total: total, // Set the total price here
        };

        // Create the cart item in the database
        const savedCartItem = await Cart.create(cartItem);

        res.status(200).json(savedCartItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//get cart detail

exports.getCartDetail = async (req, res) => {
    try {
        const { cartId } = req.params;

        const cartDetail = await Cart.findById(cartId);

        if (!cartDetail) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cartDetail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId; // Extracting user ID from URL parameter
        console.log('User ID from URL parameter:', userId);

        // Fetch all cart details from the database for the given userID
        const cartDetails = await Cart.find({ 'userID._id': userId });
        console.log('Cart details:', cartDetails);

        if (!cartDetails || cartDetails.length === 0) {
            return res.status(404).json({ error: 'Carts not found for this user' });
        }

        res.status(200).json(cartDetails);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// get cart with id user
/*exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId; // Extracting user ID from URL parameter
        console.log('User ID from URL parameter:', userId);

        // Fetch cart details from the database for the given userID
        const cartDetail = await Cart.findOne({ 'userID._id': userId });
        console.log('Cart detail:', cartDetail);

        if (!cartDetail) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cartDetail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
*/


