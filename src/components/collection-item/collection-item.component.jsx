import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (
        <div className='collection-item'>
            <div className='image' 
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{ name }</span>
                <span className='price'>{ price }</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted> 
                Add to Cart 
            </CustomButton>
        </div>
    )
};

//when we call this function, it'll receive the item as a property, passing to addItem action creator,
//which return an object where the type is equal addItem and the payload is equal to item that passed in,
//and then we'll dispatch this object into our store
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

//null is when we dont take any map states, props.
export default connect(null, mapDispatchToProps)(CollectionItem);