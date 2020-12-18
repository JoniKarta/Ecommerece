
const express = require("express");

const app = require("../app");

const router = express.Router();

const bodyParser = require('body-parser');


router.post("/", (req, res)=> {
    res.status(200).send("Product saved to the system");
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