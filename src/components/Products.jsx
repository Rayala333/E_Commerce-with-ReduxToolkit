import React, { useEffect} from 'react';
import {MDBCard,MDBCardBody,MDBCardFooter,MDBCardTitle,MDBCardText,MDBCardImage,MDBBtn,MDBRipple} from 'mdb-react-ui-kit';

import { useSelector ,useDispatch} from 'react-redux';

import {cartProducts,addtoCart} from '../redux/cartSlice'




const Products = () => {

        const { items,loading,searchData} = useSelector((state)=>state.app)

        console.log(searchData,"cart")
    
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(cartProducts())
    },[dispatch])
    console.log(items,"item")

    const newProduct =  items.filter((ele, i) => {
        if (searchData.length === 0) {
          return ele; // Include all elements when searchData is empty
        } else {
          
          return ele.category.toLowerCase().includes(searchData.toLowerCase())
        }
      });

    //   console.log(newProduct,"newProduct") 

    // const addtoCart = (e)=>{
    //         // console.log(e.id)
    //         dispatch(addtoCart(e))
    // }
  return (
    <>
        {
            loading? <h1 style={{textAlign:"center", marginTop:"4rem"}}>Loading...</h1>:

            <div className='container'>
                {
                    items && newProduct.map((e,i)=>(
                        <MDBCard className='cart m-3 ' key={i}>
                            <MDBRipple rippleColor='light'  className='bg-image hover-overlay img_cart'>
                                <MDBCardImage src={e.image} fluid alt='...' className='img'  />
                                {/* <a>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                </a> */}
                            </MDBRipple>
                            <MDBCardBody className='cartbody'>
                                <MDBCardTitle>{e.category}</MDBCardTitle>
                                <MDBCardText>
                                    {e.title}
                                </MDBCardText>
                            </MDBCardBody>
                            <MDBCardFooter className='d-flex justify-content-between'>
                                    <MDBBtn onClick={()=>dispatch(addtoCart(e))}>Add_Cart</MDBBtn>
                                    <MDBBtn href='#'>Buy</MDBBtn>
                            </MDBCardFooter>
                                
                            
                        </MDBCard>
    
                        ))
                }
                
            </div>

        }
    </>
    
  )
}

export default Products