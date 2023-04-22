const details = require('../model/bikerModel');
const customer = require('../model/customer');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const path = require('path');
var validator = require("email-validator");
 



const courseCtrl = {
  register: async (req, res) => {
    const { email, password, mobile } = req.body;
    let existing = await customer.findOne({ email })
    if (existing) {
      console.log("present");
      return res.send("exist");
    }
    if(validator.validate(`${email}`)=== false || password.length < 5){
       return res.send("wrong");
    }
    console.log(req.body.password)
    const passwordHash = await bcrypt.hash(password, 10);
    const data = customer({
      email: req.body.email,
      password: passwordHash,
      mobile: req.body.mobile
    });
    data.save();
    console.log("logged in ");
    res.redirect('/')
  },

  create: async (req, res) => {

    const data = details({
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      date: req.body.date,
      time: req.body.time,
    });
    // res.json(data);
    console.log(data);
    await data.save();
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'orgmybike@gmail.com',
        pass: 'hapitruvozvnpbwu'
      }
    });
    transporter.use('compile', hbs({
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "view"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "view"),
        extName: ".handlebars",
    }));

    var mailOptions = {
      from: 'orgmybike@gmail.com',
      to: `${req.body.email}`,
      subject: 'Bike Services details',
      template: 'index',
      context: {
        name: req.body.name,
        type: req.body.type,
        date: req.body.date,
        time: req.body.time

      },
      // text: `Thanks for Booking our services \n please know your booking details \n Name : ${req.body.name} \n  Type : ${req.body.type} \n Date : ${req.body.date}
      // Time : ${req.body.time}  \n please Do visit on time for better experience \n \n \n Thank You \n Regards MyBike.Org`,

    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    console.log("added sucessfully");
    res.redirect('/')




  },
  slot: async (req, res) => {
    let x = req.body.date1
    console.log(x);
    let pre = await details.find({ date: x });
    console.log(pre)
    if (pre.length == 0) {
      res.send({ y: 3 });
    }
    else if (pre.length == 1) {
      let a = pre[0].time;
      res.send({ y: 1, a: a });
    }
    else if (pre.length == 2) {
      let a = pre[0].time;
      let b = pre[1].time;
      res.send({ y: 2, a: a, b: b });
    }
    else {
      res.send({ y: 4 });
    }
  },
  reqToken: async (req, res) => {
    try {
      const reqToken = await req.cookies.refreshToken;

      if (!reqToken){
        return res.status(400).json({ msg: "secession expired need to login " });
      }
        

      jwt.verify(reqToken, process.env.REQUEST_TOKEN_SECRET, (err, user) => {
        if (err){
          return res.status(400).json({ msg: "need to login " });
        }
      else{
        const accessToken = createAccessToken({ mail: user.mail });
       return  res.send({ accessToken });
      }
      });


    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      let email = req.user.mail;
      let user = await customer.findOne({ email });
      if (!user)
        return res.status(400).json({ msg: "User does not exist" });
      res.send({ mail: user.email });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  bookinginfo: async (req, res) => {
    try {
      const email = req.body.email;

      let data = await details.find({ email });
      res.send({data});

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  delbooking: async (req, res) => {
    const id = req.body.id;
    console.log(id)
    try {
      let user = await details.deleteOne({_id : id});
      console.log(user)
      res.status(200).json({msg : "sucess"});
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      await res.clearCookie('refreshToken', { path: '/reqToken' });
      console.log(" logged out")
      return res.json({ msg: "logedout" });

    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    let existing = await customer.findOne({ email });
    if (existing) {
      const isMatch = await bcrypt.compare(password, existing.password);
      if (isMatch) {
        console.log("present")
        const accessToken = createAccessToken({ mail: existing.email });
        const requestToken = CreateRequestToken({ mail: existing.email });

        await res.cookie('refreshToken', requestToken, {
          httpOnly: true,
          path: '/reqToken',
          maxAge: 1*24*60*60*1000,
          secure: false,
        });
        console.log("cookie set");
        res.json({ accessToken });

      }
      else {
        res.send("no");
      }
    }
    else {
      res.send("no");
    }
  }
};
const createAccessToken = (user) => {
  // return jwt.sign(user,require('../db').accessToken,{expiresIn : '1d'});
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });


};
const CreateRequestToken = (user) => {
  return jwt.sign(user, process.env.REQUEST_TOKEN_SECRET, { expiresIn: '2d' });
  //  return jwt.sign(user,require('../db').reqToken,{expiresIn : '2d'});
};

module.exports = courseCtrl;