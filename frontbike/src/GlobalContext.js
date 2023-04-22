import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import UserApi from './api/userApi';

export const GlobalContext = createContext();

function DataProvider(props) {
    const [token , settoken] = useState((false));
    // const [cotoken , setcotoken] = useState([]);
    // if(Cookies.refereshToken){
    //     console.log("yes token");
    //     setcotoken(Cookies.refereshToken);
    // }
    

    useEffect(()=>{
          let refereshToken = async ()=>{
            let res = await axios.post('/reqToken',{
              headers: {
                'Content-Type': "application/json"
              }
      
            });
            console.log("token =", res.data.accessToken);
            settoken(res.data.accessToken);
            // setTimeout(()=>{
            //   refereshToken()
            // },60*1000);
          }
          refereshToken();
    },[token]);
    const data = { 
      
      userApi : UserApi(token)
    };

  return (
    <GlobalContext.Provider value={data}>
        {props.children}
    </GlobalContext.Provider>
  )
}

export default DataProvider;