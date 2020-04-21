const express = require('express');
const fs = require('fs');
const port=process.env.PORT || 3000; 
const hbs = require('hbs');
var app = express();
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(err)=>{
        if(err){
            console.log('Unable to append to server log');
        }
    });
    next();
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});
app.get('/', (req,res)=>{
    // res.send('Hello Express!');
    res.send({
        name:'shubham',
        liking:['bike','car']
    });
});
app.listen(port,()=>{
    console.log(`Server is Up on port: ${port}`);
});