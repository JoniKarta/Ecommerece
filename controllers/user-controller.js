

const express = require('express');
const router = express.Router();
const app = require('../app');
const userService = require('../logic/user-service');
const User = require('../model/user');

router.get("/", async (req, res)=> {
    res.sendFile(app.path + '/index.html');
});

router.post("/", async (req, res)=> {
    try{
        const user = await userService.createUser(new User(req.body.email, req.body.password));
        if (!user){
            res.status(404).send('User already exists in the system');
            return;
        }
        res.status(200).send("User registered successfully");
    }catch(err){
        res.status(500).send(err.message);
    }
});


module.exports = router;