const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

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

        // Fetch user details from database
        const user = await User.findById(userID);
        if (!user) {
            return res.status(400).json({ error: `User with ID ${userID} not found` });
        }

        // Calculate the total price
        const totalPrice = product.price * quantity;

        // Create cart item with user and product details
        const cartItem = {
            userID: {
                _id: userID,
                username: user.username
            },
            products: [{
                _id: productId,
                productName: product.productName,
                price: product.price
            }],
            quantity,
            total: totalPrice
        };

        // Create the cart item in the database
        const savedCartItem = await Cart.create(cartItem);

        res.status(200).json(savedCartItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getCartDetail = async (req, res) => {
    try {
        const { userID } = req.body;

        // Fetch cart details from the database for the given userID
        const cartDetail = await Cart.findOne({ 'userID._id': userID });

        if (!cartDetail) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.status(200).json(cartDetail);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

