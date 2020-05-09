// we use this to not prevent mapStateToProps beeing called when not necessery
import { createSelector } from 'reselect';

//inputSelector -> doesnt use createSelector
//are selector that only returns a piece of the state
const selectCart = state => state.cart;

//select and get the cartItems from state
export const selectCartItems = createSelector(
    [selectCart], //select the array of cart (state.cart)
    (cart) => cart.cartItems //function that return the value we want
);

export const selectCartItemsCount = createSelector(
    //call selectCartItems and get an array of cartItems
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
            0
        )
); 