const fs = require('fs');

module.exports = class Repository {

    constructor(fileName){
        if(!fileName) throw new Error('you must provide a filename');
        this.fileName = fileName;
        try{
            fs.accessSync(this.fileName);
        }catch(err){
            fs.writeFileSync(this.fileName, '[]');
        }
    }

    async findAll() {
        return JSON.parse(await fs.promises.readFile(this.fileName, {encoding: 'utf8'}));
    }

    async findById(field, id){
        const elements = await this.findAll();
        return elements.filter(e => e[field] === id).pop();
    }

    async findByFilter(filters){
        const elements = await this.findAll();
        for(const element of elements){
            let found = true;
            for(const key in filters){
                if(element[key] !== filters[key]){
                    found = false;
                }
                if(found){
                    return element;
                }
            }
        }
    }

    async save(element){
        let elements = await this.findAll();
        elements.push(element);
        await fs.promises.writeFile(this.fileName, JSON.stringify(elements, null, 2)) 
        elements = await this.findAll();
        return elements.pop();
    }


    async update(field , id, updatedElement){
        let elements = await this.findAll(); 
        let existing = elements.filter(e => e[field] === id).pop();
        if(!existing) return;
        let dirty = false;
        for(const key in updatedElement){
            if(updatedElement[key]){
                existing[key] = updatedElement[key];
                dirty = true;
            }
            if(dirty){
                await fs.promises.writeFile(this.fileName, JSON.stringify(elements, null, 2));
            }
        } 
    }
    
    async deleteById(field, id){
        let elements = await this.findAll();
        let newElements = elements.filter(e => e[field] !== id);
        await fs.promises.writeFile(this.fileName, JSON.stringify(newElements, null, 2));
    }

    async deleteAll() {
         await fs.promises.writeFile(this.fileName, '[]');
    }
}

