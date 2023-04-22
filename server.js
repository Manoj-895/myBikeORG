var express = require('express');  
const  mongoose = require('mongoose');
const app = express(); 
const cors = require('cors');
const cookieparser = require('cookie-parser');
const path = require('path');

require('dotenv').config();


const URL = process.env.DBURL; 

const PORT = process.env.PORT || 5000;

app.use(cors({  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: ['http://localhost:3000']}));  

app.use(cookieparser());
app.use(express.json());    // data sending and taking   imp  json() imp
app.use(express.urlencoded({extended:true}));  //  for data imp if not there will ger undifined object

if(process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname,'/frontbike/build')));

 app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'frontbike','build','index.html'));
 });

}
else{
  app.get('/',(req,res)=>{
    res.send("APi running");
  });
}

 

mongoose.Promise = global.Promise;
mongoose.connect(URL,{useNewUrlParser : true}).then(res=>{
  console.log("mongodb connected");
}).catch(err=>{
     console.log(err.message);
});

app.use("/",require("./router/router"));

app.listen(PORT, ()=>{
  console.log("server up")
});                                          // server onnn