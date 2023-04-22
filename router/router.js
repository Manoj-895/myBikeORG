const route = require("express").Router();
const courseCtrl = require("../controller/control");
const auth = require('../middelware/auth')


route.post('/slot',courseCtrl.slot);


route.post('/service',courseCtrl.create);
route.post('/register',courseCtrl.register);
route.post('/login',courseCtrl.login);

route.post('/reqToken',courseCtrl.reqToken);
route.post('/userinfo',auth,courseCtrl.getUser);
route.post('/logout',courseCtrl.logout);

route.post('/bookinginfo',courseCtrl.bookinginfo);

route.post('/delbooking',courseCtrl.delbooking);





module.exports = route;