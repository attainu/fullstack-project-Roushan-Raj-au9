
const CompanyReducer = (state={}, action)=>{
    switch (action.type) {

        case 'SET_BUYERS':
            return{
                ...state,   buyers : action.payload
            }

        case 'SET_SELLERS':
            return{
                ...state, sellers : action.payload
            }

        case 'SET_VERIFIED_PRODUCTS':
            return{
                ...state, vProduct : action.payload
            }
        case 'SET_NOT_VERIFIED_PRODUCTS':
            return{
                ...state, nvProduct : action.payload
            }
    
        default:
            return state
    }
}

export default CompanyReducer