// we use this to not prevent mapStateToProps beeing called when not necessery
import { createSelector } from 'reselect';

//inputSelector -> doesnt use createSelector
//are selector that only returns a piece of the state
const selectCart = state => state.cart;

//select and get the cartItems from state
export const selectCartItems = createSelector(
    [selectCart], //select the array of cart (state.cart)
    (cart) => cart.cartItems //function which returns the cartItems from state.cart
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    //call selectCartItems and get an array of cartItems that is passed to the next function which reduce
    //reduce and gives us our final result
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
            0
        )
); 

export const selectCartTotal = createSelector(
    [selectCartItems],
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity * cartItem.price,
            0
        )
);