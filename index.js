const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 5000;
app.get('/:name/:samur',(req ,res) => {  
    res.send(JSON.stringify(req.params)+ JSON.stringify(req.query));
  });


// get new token and show it for user 
app.get('/login', (req ,res) => { 
    
    user = {
        name : 'roman'  
    }
    jwt.sign({user},'secret' ,{expiresIn : '30s'},(err,token) => { 
        console.log('token was set :)')
        res.cookie('token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
    })
});

app.get('/', verifyToken, (req ,res) => { 
console.log('login to / ')
    jwt.verify(req.token , 'secret' , (err ,authData) => {
if (err){
    res.sendStatus(503)
}
else{
    res.json({name : "roman" ,age :12 , authdata : authData})
}
    });
});

// must use the authorization Bearer TOKEN 
// this is handler for url  - takes the header of authorization -> split the token :)
// and put the token on the -> req.token
function verifyToken(req ,res ,next){

    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){

        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token =bearerToken
        console.log("token ::" , bearerToken)
        next();
    }
    else{
        res.sendStatus(403)
    }
}

app.listen(5000)