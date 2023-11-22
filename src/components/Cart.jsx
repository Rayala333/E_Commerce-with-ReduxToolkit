import React, { useEffect } from 'react';
import '../CSS/cart.css'
import { useSelector, useDispatch } from 'react-redux';

import {getCartTotal,removeItem,incrreseItemQuantity,decreaseItemQuantity} from '../redux/cartSlice'

const Cart = () => {
    const { cart,totalQuantity,totalPrice} = useSelector((state) => state.app)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCartTotal())
    },[cart,dispatch])

    // console.log(cart.map((e,i)=>e.quantaty),"quntaty")


    return (
        <>
            {
                cart.length === 0 ? <h1 style={{textAlign:"center",marginTop:"2rem"}}>cart is emty</h1> :
                    <section className="h-100 gradient-custom ">
                        <div className="container py-5">
                            <div className="row d-flex justify-content-center my-4">
                                <div className="col-md-8">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Cart total Items  {totalQuantity}</h5>
                                        </div>
                                        <div className="card-body">
                                            {/* <!-- Single item --> */}
                                            {
                                                cart.map((e, i) => (
                                                    <>
                                                        <div className="row g-2" key={i}>
                                                            <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                                                                {/* <!-- Image --> */}
                                                                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                                    <img src={e.image}
                                                                        className="w-100" alt="Blue Jeans Jacket" />
                                                                    <a href="#!">
                                                                        <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                                                    </a>
                                                                </div>
                                                                {/* <!-- Image --> */}
                                                            </div>

                                                            <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                                                                {/* <!-- Data --> */}
                                                                <p><strong>{e.title}</strong></p>
                                                                <p>Category: {e.category}</p>
                                                                <p>Size: M</p>
                                                                <button type="button" className="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip"
                                                                    title="Remove item" onClick={()=>dispatch(removeItem(e))}>
                                                                        
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                                
                                                                <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                                                                    title="Move to the wish list">
                                                                    <i className="fas fa-heart"></i>
                                                                </button>
                                                                {/* <!-- Data --> */}
                                                            </div>

                                                            <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                                                {/* <!-- Quantity --> */}
                                                                <div className="d-flex mb-4 "  style={{ maxWidth: "300px" }}>
                                                                    <button className="btn btn-primary px-3 me-2" disabled={e.quantity <= 1 ? true : false}
                                                                        onClick={()=>dispatch(decreaseItemQuantity(e))}>
                                                                        <i className="fas fa-minus"></i>
                                                                    </button>
                                                                    

                                                                    <div className="form-outline">
                                                                        <input id="form1" min="0" name="quantity" value={e.quantity}  className="form-control" style={{textAlign:"center"}} onChange={()=>null}/>
                                                                        {/* <label className="form-label" for="form1">{e.quantity}</label> */}
                                                                    </div>

                                                                    <button className="btn btn-primary px-3 ms-2"
                                                                        onClick={()=>dispatch(incrreseItemQuantity(e))}>
                                                                        <i className="fas fa-plus"></i>
                                                                    </button>
                                                                </div>
                                                                {/* <!-- Quantity -->

                <!-- Price --> */}
                                                                <p className="text-start text-md-center">
                                                                    {/* <div>{e.quantity}*{e.price}=</div>
                                                                    <strong>${e.price*e.quantity}</strong> */}
                                                                    <strong>${e.price}</strong>
                                                                </p>
                                                                {/* <!-- Price --> */}
                                                            </div>
                                                        </div>
                                                        <hr className="my-4" />
                                                    </>
                                                ))
                                            }

                                        </div>
                                    </div>
                                    <div className="card mb-4">
                                        <div className="card-body">
                                            <p><strong>Expected shipping delivery</strong></p>
                                            <p className="mb-0">12.10.2020 - 14.10.2020</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card mb-4">
                                        <div className="card-header py-3">
                                            <h5 className="mb-0">Summary</h5>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group list-group-flush">
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                    Total Quantaty
                                                    <span>{totalQuantity}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                    Shipping
                                                    <span>Gratis</span>
                                                </li>
                                                <li
                                                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                    <div>
                                                        <strong>Total amount</strong>
                                                        <strong>
                                                            <p className="mb-0">(including VAT)</p>
                                                        </strong>
                                                    </div>
                                                    <span><strong>${totalPrice}</strong></span>
                                                </li>
                                            </ul>

                                            <button type="button" className="btn btn-primary btn-lg btn-block">
                                                Go to checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }






        </>
    )
}

export default Cart