const mongoose = require('mongoose');
const customerschema = new mongoose.Schema({
    title: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    text: {
        type: String
    },
    img:{
        type:String      
    },
    img_id:{
        type:String
    }
    
});

module.exports = mongoose.model('customer', customerschema);