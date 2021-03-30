const ProfileReducer = (state={}, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return{
                ...state, profileData:action.payload
            }
        
        case 'SET_WISHLIST':
            return{
                ...state, wishlistProducts:action.payload
            }
        
        default:
            return state
    }
}

export default ProfileReducer;