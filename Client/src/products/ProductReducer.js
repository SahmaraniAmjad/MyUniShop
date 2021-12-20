import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filters: {
    name: "",
    category: null,
    priceMin: null,
    priceMax: null,
  },
  categories: [],
  currentProduct: [],
  empty: false,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      if (action && action.payload) {
        state.products = action.payload;
      }
    },
    setFilters: (state, action) => {
      if (action && action.payload) {
        state.filters = action.payload;
      }
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentProduct: (state, action) => {
      if (action.payload) {
        state.currentProduct = action.payload;
      }
    },
    setCategories: (state, action) => {
      if (action && action.payload) {
        state.categories = action.payload;
      }
    },
    addProduct: (state, action) => {
      if (action && action.payload) {
        state.products.push(action.payload);
      }
    },
    updateProduct: (state, action) => {
      if (action.payload) {
        state.products = state.products.filter(
          (p) => p.id !== action.payload.id
        );
        state.products.push(action.payload);
      }
    },
    setEmpty: (state, action) => {
      state.empty = action.payload;
    },
  },
});

const { actions, reducer } = ProductSlice;

export const {
  setProducts,
  setFilters,
  resetFilters,
  setCategories,
  setCurrentProduct,
  addProduct,
  updateProduct,
  setEmpty,
} = actions;

export default reducer;
