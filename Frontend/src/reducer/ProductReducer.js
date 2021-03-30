const ProductReducer = (state={}, action) => {
    switch (action.type) {
        case "SET_PRODUCTS": //according to category id
            return{
                ...state, products : action.payload
            }

        case "SET_ALL_PRODUCTS": //set all products of all category(for search the product)
            return{
                ...state, allproducts : action.payload
            }

        case "SET_SELLER_PRODUCTS": //set all seller posted products
            return{
                ...state, sellerProducts : action.payload
            }
    
        case "SET_PRODUCT_DETAILS": //set product details
            return{
                ...state, productDetails : action.payload
            }
        case "SET_PRODUCT_DETAILS_EDIT": //set product details after edit 
            return{
                ...state, productDetailsEdit : action.payload
            }

        default:
            return state
    }
}

export default ProductReducer