const express = require('express');
const router = express.Router();
const userService = require('../logic/user-service');
const User = require('../model/user');
const signInTemplate = require("../views/admin/signin");
const signUpTemplate = require("../views/admin/signup");
const httpCodes = require("../utils/http-codes");
const {validationResult } = require("express-validator");

//TODO: Fix the issues with express-validator should i use joi instead?


router.get("/signup", async (req, res) => {
    res.send(signUpTemplate({ req }));
});

router.post("/signup",async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(signUpTemplate({req, errors}));
        }
        const user = await userService.createUser(new User(req.body.email, req.body.password));
        req.session.id = user.email;
        res.status(httpCodes.success).send("User registered successfully");
    }catch(err){
        res.status(httpCodes.internalServerError).send(err.message);
    }
});

router.get("/signin", (req, res) => {
    try {
        res.send(signInTemplate({ req }))
    } catch (err) {
        res.status(httpCodes.internalServerError).send(err.message);
    }
});

router.post("/signin",async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(signInTemplate({req, errors}));
        }
        res.send("login successfully");
    } catch (err) {
        res.status(httpCodes.success).send(err.message);
    }
});

router.get("/signout", (req, res) => {
        try {
            req.session.id = null;
            res.send("Signout successfully");
        } catch (err) {
            res.status(httpCodes.internalServerError).send(err.message);
        }
    });

module.exports = router;