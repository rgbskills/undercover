"use client"
import { useReducer, createContext } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
  // Reducer Initial State and Actions
  const initialState = {
    products: []
  };
  const productsActions = {
    SET_PRODUCTS: "SET_PRODUCTS",
    ADD_PRODUCT: "ADD_PRODUCT",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    UPDATE_PRODUCT: "UPDATE_PRODUCT",
  };

  // Reducer
  const productsReducer = (state, action) => {
    switch (action.type) {
      case productsActions.SET_PRODUCTS:
        // set products to empty array to avoid duplicates
        let products = [];
        // add products to the array
        products = [...state.products, ...action.products];
        return {products: products };
      case productsActions.ADD_PRODUCT:
        return {products: [...state.products, action.product] };
      case productsActions.DELETE_PRODUCT:
        const filteredProducts = state.products.filter((product) => product.id !== action.productID);
        return {products: filteredProducts };
      case productsActions.UPDATE_PRODUCT: {
        const products = state.products.map((product) => product.id === action.product.id ? { ...product } : product);
        return {products: products};
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(productsReducer, initialState);

  // We create a context value with the state and actions
  const products = {
    products: state.products || [],
    setProducts: (products) => {
      dispatch({ type: productsActions.SET_PRODUCTS, products });
    },
    addProduct: (product) => {
      dispatch({ type: productsActions.ADD_PRODUCT, product });
    },
    deleteProduct: (productID) => {
      dispatch({ type: productsActions.DELETE_PRODUCT, productID });
    },
    updateProduct: (product) => {
      dispatch({ type: productsActions.UPDATE_PRODUCT, product });
    }
  };



  // We return the context provider with the value
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
}