const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
//const Blog = require('./models/blog');
const { render } = require('ejs');
const blogRoutes =require('./routes/blogRoutes');

//express app
const app = express();
// connect to mongoosDB
const dbURI = 'mongodb+srv://omar:omar1998@project1.jia02.mongodb.net/project1?retryWrites=true&w=majority'
 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((result)=>app.listen(3000))
 .catch((err)=>console.log(err));

//register view engine
app.set('view engine','ejs'); 
//listen for requests

// middleware and static files
app.use(express.static('public'));
//make use it in the request object
app.use(express.urlencoded({extended: true}));
//create a middleWare
app.use(morgan('dev'));
// app.use((req, res, next)=>{
//     console.log('new request made :');
//     console.log('host : ',req.hostname);
//     console.log('path : ',req.path);
//     console.log('method : ',req.method);
//     next();
// });

app.get('/',(req,res)=>{
    // res.send('<p>home page</page>');
    //res.sendFile('./view/index.html',{root:__dirname});
    res.redirect('/blogs');
});
app.get('/about',(req,res)=>{
    // res.send('<p>about page</page>');
    // res.sendFile('./view/about.html',{root:__dirname});
    res.render('about',{title: 'About'});
});
// blog Routes
app.use('/blogs',blogRoutes);

//redirects
// app.get('/about-us',(req, res)=>{
//     res.redirect('/about');
// });
// 404 page
app.use((req,res)=>{
    // res.status(404).sendFile('./view/404.html',{root:__dirname});
    res.status(404).render('404',{title: '404'});
})