import { useEffect, useState } from "react";
import axios from "axios";


export default function UserApi(token){

     const [islogged, setlogged] = useState(false);

     const [user , setuser]= useState({
      email: ""
     });

     useEffect(()=>{
        console.log("in userApi")
          if(token){
            console.log("in if userApi")
            const getUser = async()=>{
                try {
                    const data = await axios.post('/userinfo',{token});
                    const x = data.data.mail
                    setlogged(true);
                    setuser({...user,["email"]:x})
                } catch (e) {
                    console.log(e);
                }
            }
            getUser();
          }
     },[token]);

     return{
        islogged : [islogged, setlogged],
        user : [user,setuser]
     }
     
}