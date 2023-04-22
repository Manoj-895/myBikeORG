const mongoose = require('mongoose');

const details = new mongoose.Schema({
    name: {type : String , required : true},
    email : {type : String , required : true},
    type : {type : String  ,required : true},
    date : {type : Date },
    time : {type : String , required : true},
},{
    collection : "bikeservice",
    timestamps : true
});



module.exports = mongoose.model("details",details);
