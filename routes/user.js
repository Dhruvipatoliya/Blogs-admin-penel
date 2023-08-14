const express=require('express');
const routes=express.Router();
const controller=require('../controller/usercontroller');
const upload=require('../cloud/multer');


routes.get('/',controller.register);
routes.post('/datafrom',controller.registerdata);
routes.get('/login',controller.login);
routes.post('/logindata',controller.logindata);
routes.get('/home',controller.home);
routes.post('/dataenter',upload.single('img'),controller.homedetails);
routes.get('/blogs',controller.blogs);
routes.get('/delete/:id',controller.deletes);
routes.get('/update/:id',controller.updatepage);
routes.post('/update/:id',controller.update);



module.exports=routes;