const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    email: {type : String , required : true ,unique: true } ,
    password :{type : String , required : true},
    mobile : {type : Number , required : true }
},{
    collection : "customer",
    timestamps : true
});

module.exports = mongoose.model("customer",customer);