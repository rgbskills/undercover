"use client"
import { useReducer, createContext } from 'react';

const initialState = {
  items: []
};

export const CartContext = createContext(initialState);

export const CartProvider = ({children}) => {
  // Reducer Initial State and Actions
  const cartActions = {
    ADD_CART_ITEM: "ADD_CART_ITEM",
    REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
    CLEAR_CART: "CLEAR_CART",
    INCREMENT_CART_ITEM: "INCREMENT_CART_ITEM",
    DECREMENT_CART_ITEM: "DECREMENT_CART_ITEM",
  };

  // Reducer
  const cartReducer = (state, action) => {
    switch (action.type) {
      case cartActions.ADD_CART_ITEM:
        let items = [];
        // if cart item already exists in cart, increment qty
        // else add cart item to cart
        if (state.items.find((aci) => aci.id === action.cartItem.id)) {
          // cart items already added to cart
          items = state.items.map((aci) => aci.id === action.cartItem.id ? { ...aci, qty: aci.qty + 1} : aci);
        } else {
          // cart item not added to cart
          items = [...state.items, {qty: 1, ...action.cartItem}];
        }
        return { ...state, items: items };
      case cartActions.REMOVE_CART_ITEM: {
        const filteredCartItem = state.items.filter((cartItem) => cartItem.id !== action.cartItemId);
        return { ...state, items: filteredCartItem };
      }
      case cartActions.CLEAR_CART: {
        return initialState;
      }
      case cartActions.INCREMENT_CART_ITEM: {
        const items = state.items.map((aci) => aci.id === action.cartItemId ? { ...aci, qty: aci.qty + 1} : aci);
        return { ...state, items: items};
      }
      case cartActions.DECREMENT_CART_ITEM: {
        const items = state.items.map((aci) => aci.id === action.cartItemId ? { ...aci, qty: aci.qty === 1 ? aci.qty : aci.qty - 1} : aci)
        return { ...state, items: items};
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // We create a context value with the state and actions
  const cart = {
    items: state.items || [],
    count: state.items.length,
    total: state.items.reduce((acc, item) => acc + item.price * item.qty, 0),
    addCartItem: (cartItem) => {
      dispatch({ type: cartActions.ADD_CART_ITEM, cartItem });
    },
    removeCartItem: (cartItemId) => {
      dispatch({ type: cartActions.REMOVE_CART_ITEM, cartItemId });
    },
    clearCart: () => {
      dispatch({ type: cartActions.CLEAR_CART });
    },
    incrementCartItem: (cartItemId) => {
      dispatch({ type: cartActions.INCREMENT_CART_ITEM, cartItemId });
    },
    decrementCartItem: (cartItemId) => {
      dispatch({ type: cartActions.DECREMENT_CART_ITEM, cartItemId });
    },
  };



  // We return the context provider with the value
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}