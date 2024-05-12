import { createContext, useReducer, useContext, Dispatch } from "react";
import { PiChartScatterThin } from "react-icons/pi";
import Cart from "./cart";
import * as React from "react";

export interface Book {
    id:number;
    name:string;
    author:string;
    pages:number;
    price:number;
    year:number;
    image:string;
    count:number;
}

interface CartItem extends Book {
    quantity:number;
    
}

interface CartState {
    cart: CartItem[];
}

type CartAction = 
| {type: "ADD_TO_CART"; payload:Book}
| {type: "REMOVE_FROM_CART"; payload:number}
| {type: "INCREASE_QUANTITY"; payload:number}
| {type: "DECREASE_QUANTITY"; payload:number}

const cartContext = createContext<{state:CartState; dispatch:Dispatch<CartAction>} |
undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_TO_CART": 
            const existingCartItem = state.cart.find(item => item.id === action.payload.id);
            if (existingCartItem) {
                return {
                    ...state,
                    cart: state.cart.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };      
            } else {
                return {
                    ...state, 
                    cart: [...state.cart, { ...action.payload, quantity: 1 }],
                };
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };

        case "INCREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };

        case "DECREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
                ),
            };

        default:
            return state;
    }
};


const CartProvider: React.FC<{children: React.ReactNode}> =({
    children,
}) => {
    const [state, dispatch] = useReducer(cartReducer, {cart:[]});

    return(
        <cartContext.Provider value = {{state, dispatch}}>
            {children}
        </cartContext.Provider>
    )
};



const useCart = () => {
    const context = useContext(cartContext);
    if(!context){
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}



export { CartProvider, useCart }