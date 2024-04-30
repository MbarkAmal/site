const mongoose = require ('mongoose');

const cartSchema = new mongoose.Schema({

    userID:{
        type: String,
    //  required: true,

    },
    products: [{
        _id: {type : mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    productName : {
        type: String , required: true ,
     },
     price: { type: Number, required: true },

     quantity: {
        type: Number,
        default: 1,
      },


    }],

},
{ timestamps: true },
);

module.exports = mongoose.model('cart', cartSchema);
