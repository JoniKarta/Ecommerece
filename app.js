
const express = require("express");
const server = express();
const productController = require("./controllers/product-controller.js");
const userController = require('./controllers/user-controller')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');


server.use(express.static('public'));
server.use(bodyParser.urlencoded({extended: true}));

const newLocal = 'fdklsa312';
server.use(cookieSession({
    keys: [newLocal]
}));

server.use("/api/users", userController);

//server.use("/api/products", productController);

server.use("*", (request, response)=> {
    response.status(404).send("The route: " + request.route + " dosen't exists");
});

server.listen(3000, ()=> {
    console.log("The server is up and running");
});

// exports.path = __dirname;