

const express = require('express');
const router = express.Router();
const app = require('../app');
const userService = require('../logic/user-service');
const User = require('../model/user');
const signInTemplate = require("../views/admin/signin");
const signUpTemplate = require("../views/admin/signup");

router.get("/signup", async (req, res)=> {
    res.send(signUpTemplate({req}));
});

router.post("/signup", async (req, res)=> {
    try{
        const user = await userService.createUser(new User(req.body.email, req.body.password));
        if(req.body.confirm !== req.body.password) {
           return res.status(400).send("Password must be match!");
        }
        if (!user){
            return res.status(404).send('User already exists in the system');
        }
        req.session.id = user.email;
        res.status(200).send("User registered successfully");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get("/signin", (req, res)=> {
    try{
        res.send(signInTemplate({req}));
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.post("/signin",async  (req, res)=> {
    try{

        const {email , password} = req.body;
        const user = await userService.getSpecificUser(email);
        if(!user){
            return res.status(404).send("user not found");
        }
        const hasMatch = await userService.compareHash(password, user.password); 
        if(!hasMatch){
            return res.status(400).send("Password don't match");
        }
        res.send("login successfully");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.post("/signout",(req, res)=> {
    try{
        req.session.id = null;
        res.send("Signout successfully");
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;