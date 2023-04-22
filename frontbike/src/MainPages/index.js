import React from 'react';
import  {BrowserRouter , Routes , Route} from 'react-router-dom';
import Example from './Home';
import Service from './service';
import Booking from './booking';
import Pnf from './Pnf';


// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css';

function MainPages() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path={'/'} element={<Example/>}/>
        <Route path={'/service'} element={<Service/>}/>
        <Route path={'/bookinginfo'} element={<Booking/>}/>
        <Route path={'/*'} element={<Pnf/>}/>


    </Routes>
    </BrowserRouter>
  )
}

export default MainPages;