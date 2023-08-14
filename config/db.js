const mongoose =require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://127.0.0.1/SOS');

db.once('open',(err)=>{
    if(err){
        console.log('db not connected');
    }
    console.log('db connected');
});

module.exports = db; 