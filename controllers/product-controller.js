
const express = require("express");

const app = require("../app");

const router = express.Router();

const bodyParser = require('body-parser');

router.get("/", (req, res) => {
    res.sendFile(app.path + '/index.html');
});

router.post("/", (req, res)=> {
    console.log(req.body.email, req.body.password, req.body.confirm);
    res.status(200).send("User registered successfully");
})

// const bodyParser = () => {
//     req.on("data", data=> {
//         const parsed = data.toString('utf8').split('&');
//         const obj = {};
//         for(let pair of parsed){
//             const [key,value] = pair.split('=');
//             obj[key] = value;
//         }
//         console.log(obj);
//     });
// }

module.exports = router;