const express = require('express');
const customer = require('../model/customermodel')
const user =require('../model/usermodel')
const cloudinary=require('../cloud/cloudinary');

module.exports.register = (req, res) => {

    try {
        res.render('register');
    } catch (error) {
        console.log(err);
    }

}
module.exports.registerdata = async (req, res) => {

    try {
        console.log(req.body);
        var name = req.body.name
        var email = req.body.email
        var password = req.body.password
        
        var finds=await user.findOne({email});
        if(finds == null){
            var admindata = await user.create({
                name,
                email,
                password
            });
            res.redirect('/user/login');
        }else{
            res.redirect('back');
            console.log("email already exist");
        }
    } catch (err) {
        console.log(err);
    }

}



exports.login=async(req,res)=>{
    res.render('login');
}


exports.logindata=async(req,res)=>{

    var email=req.body.email
    var password=req.body.password
    var data= await user.findOne({email});
    if(data== null){
        console.log("please register or enter valid email");
        res.redirect('back')

    }
    else{
      if(data.password == password){
        res.redirect('/user/home');
        console.log("login successfully");
      }
      else{
        res.redirect('back');
        console.log("enter valid password");
      }
    }


}

exports.home = async (req, res) => {
    try {
        var obj = await user.find({});
        res.render('home', {
            obj
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.homedetails = async (req, res) => {

    try {
        console.log(req.file,"hhhhhh");
        var data=await cloudinary.uploader.upload(req.file.path,{folder:'sos'})

        console.log(data,"ggg");

        console.log(req.body);
        var title = req.body.title
        var name = req.body.name
        var date = req.body.date
        var text = req.body.text
        var img=data.secure_url
        var img_id=data.public_id
        var cd = await customer.create({
            title,
            name,
            date,
            text,
            img,
            img_id
        });

        res.redirect('/user/blogs');
    } catch (err) {
        console.log(err);
    }

}
module.exports.blogs =async (req, res) => {

    try {
        var search = '';
        if(req.query.search){
            search = req.query.search;
        }
        var cus = await customer.find({
            $or:[
                {name:{$regex:'.*'+search+'.*'}}
            ]
        });
        res.render('blogs',{
            cus
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports.deletes=async(req,res)=>{

    console.log(req.params)

    var cd=await customer.findByIdAndDelete(req.params.id)
    if(cd) {
        console.log('data deleted successfully')
        res.redirect('back');
    } else{
        console.log('data not deleted')
    }
}


module.exports.updatepage=async(req,res)=>{

    
    console.log(req.params);
    var data=await customer.find({_id:req.params.id});
    var sos=data[0]
    res.render('update',{sos});

}

module.exports.update=async(req,res)=>{

        console.log(req.body);

    var update=await customer.findByIdAndUpdate(req.params.id,req.body);
    if(update) {
        console.log("data updated successfully");
        res.redirect('/user/blogs');
    }
    else{
        console.log('data not updated')
    }


}