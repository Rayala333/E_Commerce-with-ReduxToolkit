import React, { useEffect, useState } from 'react';
import {MDBContainer,MDBNavbar,MDBNavbarBrand,MDBBtn,MDBIcon,MDBBadge,} from 'mdb-react-ui-kit';
import {searchProduct} from '../redux/cartSlice'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [search,setSearch] = useState('')

    const { cart } = useSelector((state) => state.app)

    const dispatch = useDispatch()

    // console.log(search,"search")
    useEffect(()=>{
        dispatch(searchProduct(search))
    },[dispatch, search])
  return (
    <MDBNavbar expand='lg' light bgColor='light' className='sticky-top'>
      <MDBContainer fluid >
          <Link to="/"><MDBNavbarBrand href='#'>Royal_Shoping</MDBNavbarBrand></Link>
        
          <form className='d-flex justify-content-around'>
            <input type='search' className='form-control' placeholder='Type query' 
                aria-label='Search' onChange={(e)=>setSearch(e.target.value)} />
          </form>

            <Link to='/cart'>
          <MDBBtn size='lg' floating style={{ backgroundColor: '#ac2bac' }} href='#'>
                <MDBIcon fas icon="shopping-basket" size='2x' />
                <MDBBadge color='danger' notification pill className='position-absolute  top-50  start-75 translate-middle  bg-danger border border-light rounded-circle'>
                         {cart.length}
                </MDBBadge>
          </MDBBtn></Link>
       
      </MDBContainer>
    </MDBNavbar>
  )
}

export default Navbar