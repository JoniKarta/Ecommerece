
const express = require("express");

const server = express();
const prooductRepo = require("./data-access-layer/product-repo");

const productController = require("./controllers/product-controller.js");

const bodyParser = require('body-parser');

server.use(bodyParser.urlencoded({extended: true}));

server.use("/api/products", productController);

server.use("*", (request, response)=> {
    response.status(404).send("The route: " + request.route + " dosen't exists");
});

server.listen(3000, ()=> {
    console.log("The server is up and running");
});

exports.path = __dirname;