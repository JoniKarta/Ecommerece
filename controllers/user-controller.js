

const express = require('express');
const router = express.Router();
const userService = require('../logic/user-service');
const User = require('../model/user');
const signInTemplate = require("../views/admin/signin");
const signUpTemplate = require("../views/admin/signup");
const { validationResult } = require("express-validator");
const {validateEmail, validatePassword, validateConfirmPassword} = require('../model/validators/user-validator');

router.get("/signup", async (req, res) => {
    res.send(signUpTemplate({ req }));
});

router.post("/signup", [validateEmail , validatePassword, validateConfirmPassword], async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if(!errors.isEmpty()){
        return res.send(signUpTemplate({req, errors}));
    }
    try {
        const user = await userService.createUser(new User(req.body.email, req.body.password));

        req.session.id = user.email;
        res.status(200).send("User registered successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get("/signin", (req, res) => {
    try {
        res.send(signInTemplate({ req }))
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/signin", async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userService.getSpecificUser(email);
        if (!user) {
            return res.status(404).send("user not found");
        }
        const hasMatch = await userService.compareHash(password, user.password);
        if (!hasMatch) {
            return res.status(400).send("Password don't match");
        }
        res.send("login successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post("/signout", (req, res) => {
    try {
        req.session.id = null;
        res.send("Signout successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;