const { log } = require('console');
const express = require('express')
const path = require('path');

const port = 8000;

const app = express();

require('./config/db')

app.use(express.urlencoded());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,'assets')));

app.get('/',(req,res)=>[
    res.redirect('/user/login')
]);

app.use('/user',require('./routes/user'));

app.use((req,res)=>{
    res.render('err');
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log('server is running', port);
})
