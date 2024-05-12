import {AiFillCloseCircle} from 'react-icons/ai'
import './cart.css'
import { useCart } from './cartContext';

interface cartProps {
    closeCart: () => void;
}

const Cart:React.FC<cartProps>  = ({closeCart}) => {

    const {state, dispatch} = useCart();

    const removeFromCart = (id: number) => {
        dispatch({type: "REMOVE_FROM_CART", payload: id});
    }

    const increaseQuantity = (id:number) => {
        dispatch({type:"INCREASE_QUANTITY", payload: id})
    }

    const decreaseQuantity = (id: number) => {
        dispatch({type:"DECREASE_QUANTITY", payload: id});
    }
    return (
        <div className="cart">
            <div className="closeIcon">
                <AiFillCloseCircle onClick={closeCart} />
            </div>

            <div className="cartItems">
                <h2>Your Cart</h2>
                {state.cart.length === 0 ? (
                    <p>Your Cart Is Empty</p>
                ) : (
                    <>
                    {state.cart.map((item) => (
                        <div key={item.id}>
                        <div className="bookSelected">
                            <div className="imageArea">
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                            </div>
                            <div className="buttons">
                                <div className="increaseDecrease">
                                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                                </div>
                                <div className="remove">
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                                <span>{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    ))}
                    </>
                )
            }
            </div>
            <div className="totalPrice">
                <h2 className="total">
                    Total: <p>${state.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                </h2>
            </div>
        </div>
    )
}

export default Cart