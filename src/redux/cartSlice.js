import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

const initialState = {
    loading:false,
    items:[],
    error:null,
    searchData:"",
    cart:[],
    totalQuantity: 0,
    totalPrice:0
}

export const cartProducts = createAsyncThunk("cartProducts", async(rejectWithValue)=>{
    const response = await axios.get('http://localhost:3005/products') ;
    try{
        const result = await response.data
        return result
    }catch(error){
            return rejectWithValue(error)
    }
})

export const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers :{
        searchProduct : (state,action)=>{
                state.searchData = action.payload
                console.log(action.payload,"action_1")
        },
        addtoCart : (state,action)=>{
            let find = state.cart.findIndex((item)=>item.id===action.payload.id)
            if(find>=0){
                state.cart[find].quantity+=1
            }else{
                state.cart.push(action.payload)
            }
            console.log(find,"find")
                
                // console.log(action.payload.id,"cart_Action")
        },
        getCartTotal : (state)=>{
            let {totalQuantity,totalPrice} = state.cart.reduce((cartTotal,cartItem)=>{
                                const {price,quantity} = cartItem
                                const itemTotal = price*quantity
                                cartTotal.totalPrice +=itemTotal
                                cartTotal.totalQuantity += quantity
                                return cartTotal  
            },
            {
                totalPrice:0,
                totalQuantity:0
            }
            );
            // state.totalPrice = parseInt(totalPrice.toFixed(2))
            state.totalPrice = totalPrice
            state.totalQuantity = totalQuantity
        },
        removeItem : (state,action)=>{
                state.cart = state.cart.filter((item)=>item.id!==action.payload.id)
        },
        incrreseItemQuantity : (state,action)=>{
                state.cart = state.cart.map((item)=>{
                    if(item.id===action.payload.id){
                      return {...item,quantity:item.quantity+1}
                    }
                    return item
                })
        },
        decreaseItemQuantity : (state,action)=>{
            state.cart = state.cart.map((item)=>{
                if(item.id===action.payload.id){
                  return {...item,quantity:item.quantity-1}
                }
                return item
            })
    }
    },
    extraReducers:(builder)=>{
        //show_Products
        builder.addCase(cartProducts.pending,(state,action)=>{
            state.loading=true
        });
        builder.addCase(cartProducts.fulfilled,(state,action)=>{
            state.loading=false;
            // console.log(action.payload,"payload")
            state.items = action.payload
        });
        builder.addCase(cartProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error = action.payload
        });

    }
})

export default cartSlice.reducer

export const {searchProduct,addtoCart,getCartTotal,removeItem,incrreseItemQuantity,decreaseItemQuantity} = cartSlice.actions;