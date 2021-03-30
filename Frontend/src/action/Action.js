export const getCategory=()=>{

    const output = fetch("https://swipeshopship.herokuapp.com/product_category",{
        method:"GET",
    }).then(data=>data.json())

    return{
        type:'SET_CATEGORY',
        payload:output
    }
}

export const getAllProducts=()=>{

    const output = fetch("https://swipeshopship.herokuapp.com/products/all_product",{
        method:"GET",
    })
    .then(data=>data.json())
    
    return{
        type:'SET_ALL_PRODUCTS',
        payload:output
    }
}


//get products according to seller id

export const getSellerProducts=(seller_id)=>{
    const output = fetch("https://swipeshopship.herokuapp.com/products/selected_seller",{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'x-access-token':localStorage.getItem('loginToken')
        },
        body:JSON.stringify({seller_id:seller_id})
    }).then(data=>data.json())
    
    return {
        type:'SET_SELLER_PRODUCTS',
        payload: output
    }
}


//get products with respect to category
export const getProducts=(id)=>{

    const output = fetch("https://swipeshopship.herokuapp.com/products/selected_category",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({category_id:id})
    })
    .then(data=>data.json())
    
    return{
        type:'SET_PRODUCTS',
        payload:output
    }
}

export const getProductDetails = (id) =>{
    
    const output = fetch('https://swipeshopship.herokuapp.com/products/details',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({_id:id})
    })
    .then(data=>data.json())

    return{
        type:'SET_PRODUCT_DETAILS',
        payload:output
    }
}

export const getProductDetailsEdit = (id) =>{
    
    const output = fetch('https://swipeshopship.herokuapp.com/products/details',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({_id:id})
    })
    .then(data=>data.json())

    return{
        type:'SET_PRODUCT_DETAILS_EDIT',
        payload:output
    }
}

export const addToCart = (productData) => {
    return{
        type:'ADD_TO_CART',
        payload:productData
    }
}

export const removeFromCart = (productData) => {
    return{
        type:'REMOVE_FROM_CART',
        payload:productData
    }
}

export const emptyCart = () => {
    return{
        type:'EMPTY_CART',
        payload:[]
    }
}


export const getProfile = () => {
    const aToken = localStorage.getItem('loginToken')
    const output = fetch('https://swipeshopship.herokuapp.com/profile',{
        method:"GET",
        headers:{
            'x-access-token': aToken
        }
    })
    .then(data=>data.json())

    return{
        type:'SET_PROFILE',
        payload:output
    }
}

export const removeProfile=()=>{
    return{
        type:'SET_PROFILE',
        payload:null
    }
}


export const getWishlist = () => {
    const aToken = localStorage.getItem('loginToken')
    const output = fetch('https://swipeshopship.herokuapp.com/wishlist',{
        method:"GET",
        headers:{
            'x-access-token': aToken
        }
    })
    .then(data=>data.json())

    return{
        type:'SET_WISHLIST',
        payload:output
    }
}

export const addToWishlist=(productId)=>{
    const aToken = localStorage.getItem('loginToken')
    const output = fetch('https://swipeshopship.herokuapp.com/wishlist/add_product',{
        method:"PUT",
        headers:{
            'COntent-Type':'application/json',
            'x-access-token': aToken
        },
        body:JSON.stringify({product_id:productId})
    })
    .then(data=>data.json())

    return{
        type:'GET_RESPONSE',
        payload:output
    }
}

export const removeFromWishlist=(productId)=>{
    const aToken = localStorage.getItem('loginToken')
    const output = fetch('https://swipeshopship.herokuapp.com/wishlist/remove_product',{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'x-access-token': aToken
        },
        body:JSON.stringify({product_id:productId})
    })
    .then(data=>data.json())

    return{
        type:'GET_RESPONSE',
        payload:output
    }
}
