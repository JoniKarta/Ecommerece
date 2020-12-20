

const express = require('express');
const router = express.Router();
const newProductTemplate = require('../views/admin/product/new-product');


router.get("/new", (req, res)=> {
    res.send(newProductTemplate({req}));
});

router.get("/", async (req, res)=> {
    return "to be continue..."
});


module.exports = router;
