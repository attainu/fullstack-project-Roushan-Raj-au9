const initialState = {
    cartProducts:[]
}

const AddToCartReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':

            return {
                ...state,
                cartProducts:[...state.cartProducts, action.payload]
            }
            
        case 'REMOVE_FROM_CART':

            return {
                ...state, 
                cartProducts:state.cartProducts.filter(items=>{
                    return items._id !== action.payload
                })
            }

        case 'EMPTY_CART':

            return {
                cartProducts:action.payload
            }

        default:
            return state
    }
}

export default AddToCartReducer;