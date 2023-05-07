import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import { ToastContainer } from 'react-toastify';
import AddProduct from './pages/AddProduct';
import Suppliers from './pages/Suppliers';
import ReportBug from './pages/ReportBug';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import ProductDetails from './pages/ProductDetails';
import EditProduct from './pages/EditProduct';



axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    async function loginStatus() {
      const status = await getLoginStatus();
      console.log(JSON.stringify(status.data));
      dispatch(SET_LOGIN(status.data))

    }
    loginStatus();
  }, [dispatch])



  return (
    <BrowserRouter>
    
    <ToastContainer/>

        <Routes>
              
          <Route path='/' element={<Home/>}/>
          <Route path='/inventory' element={<Inventory/>}/>
          <Route path='/addProduct' element={<AddProduct/>}/>
          <Route path='/suppliers' element={<Suppliers/>}/>
          <Route path='/reportBug' element={<ReportBug/>}/>
          <Route path='/product-details/:id' element={<ProductDetails/>}/>
          <Route path='/product-edit/:id' element={<EditProduct/>}/>
        
        </Routes>

    </BrowserRouter>  
  );
}

export default App;
