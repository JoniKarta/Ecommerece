const Repository = require('./repository');

class ProductRepository extends Repository{

    constructor(fileName){
        super(fileName);
    }
}

module.exports = new ProductRepository('products.json');