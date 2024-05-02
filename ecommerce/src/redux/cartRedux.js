import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const { productId, productName, price, quantity } = action.payload;
      
      const existingProductIndex = state.products.findIndex(product => product.productId === productId);

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update its quantity and total price
        state.products[existingProductIndex].quantity += quantity;
        state.total += price * quantity;
      } else {
        // If the product is not in the cart, add it
        state.products.push({ productId, productName, price,  });
        state.total += price * quantity;
      }

      state.quantity += 1;
    },
  },
});
export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
