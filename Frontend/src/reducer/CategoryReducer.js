const CategoryReducer = (state={}, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return{
                ...state, categories : action.payload
            }
    
        default:
            return state
    }
}
export default CategoryReducer;