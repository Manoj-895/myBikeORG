const jwt = require('jsonwebtoken');



const auth = (req,res,next)=> {

    try {

        const token = req.body.token;
        console.log(token)


        if(!token){
            return res.status(400).json({ msg : "Invalid Authontication"});
        };

        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            console.log(token);
            if(err)
            return res.status(400).json({msg : err.message});

            req.user = user;
            console.log(user);
            next();
        });
        console.log("Authentication done");

    }catch(err){
        return res.status (500).json({msg : err.message})
    }
};



module.exports = auth;
