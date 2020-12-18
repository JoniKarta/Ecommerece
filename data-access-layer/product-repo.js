
const fs = require("fs");
const crypto = require('crypto');

class ProductRepository {

    constructor(filename) {
        if(!filename){
            throw new Error("You need to specify file name");
        }

        this.filename = filename;
        try{
            fs.accessSync(this.filename);
            console.log("file already exists")
        }catch(err){
            fs.writeFileSync(this.filename, "[]");
        }
    }

    async findAll() {
        const content = await fs.promises.readFile(this.filename, {encoding: 'utf8'});
        const products = JSON.parse(content);
        return products;
    }

    async findOneByFilter(filters){
        const products = await this.findAll();
        for(const product of products){
            let found = true;
            
            for(const key in filters){
                if(product[key] !== filters[key]){
                    found = false;
                }
            }
            if(found){
                return product;
            }
        }
    }
    
    async findById(id){
        const products = await findAll();
        const product = products.filter(product => product.id === id);
        return product;
    }


    async save(product){ 
        product.id = this.generetedId();
        const products = await this.findAll();
        products.push(product);
        await fs.promises.writeFile(this.filename, JSON.stringify(products, null, 2));
    }

    async update(id, product){
        const products = await this.findAll();
        const productFromDb = products.find(prod => prod.id === id);
        if(!productFromDb) return null;
        let dirty = false;
        console.log(productFromDb)
        if(product.name){
            productFromDb.name = product.name;
            dirty = true;
        }
        
        if(product.price){
            productFromDb.price = product.price;
            dirty = true;
        }

        if(product.stock){
            productFromDb.stock = product.stock;
            dirty = true;
        }
        
        if(dirty){
            await fs.promises.writeFile(this.filename, JSON.stringify(products,null, 2));
        }
        return productFromDb;
    }

    async deleteById(id){
        const products = await this.findAll();
        const deltedProductArray = products.filter(prod => prod.id !== id);
        await fs.promises.writeFile(this.filename,JSON.stringify(deltedProductArray), null, 2);
    }

    async deleteAll() {
        await fs.promises.writeFile(this.filename, '[]');
    }

    generetedId(){
        return crypto.randomBytes(4).toString('hex');        
    }
}


module.exports = new ProductRepository('products.json')
