import {combineReducers} from 'redux'
import ProductCategory from "./CategoryReducer"
import Products from './ProductReducer'
import Profile from './ProfileReducer'
import AddToCart from './AddToCartReducer'
import Company from './CompanyReducer'

const MainReducer = combineReducers({

    ProductCategory,
    Products,
    Profile,
    AddToCart,
    Company,

    
})

export default MainReducer