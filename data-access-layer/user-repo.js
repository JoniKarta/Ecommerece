const fs = require('fs');

class UserRepository {

    constructor(filename){
        if(!filename){
            throw new Error("You need to specify filename");
        }
        this.filename = filename;
        try{
            fs.accessSync(this.filename);
        }catch(err){
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async findAll() {
      return JSON.parse(await fs.promises.readFile(this.filename, {encoding: 'utf8'}));
    }

    async findOneByFilter(filters){
        const users = await this.findAll();
        let found = true;
        for(const user of users){
            found = true;   
            for(const key in filters){
                if(user[key] !== filters[key]){
                    found = false;
                }  
            }
            if(found){
                return user;
            }
        }
    }
    
    async findById(email){
        const users = await this.findAll();
        const user = users.find(user => user.email === email); 
        return user;   
    }


    async save(user){
        const users = await this.findAll();
        users.push(user);
        await fs.promises.writeFile(this.filename, JSON.stringify(users, null, 2));
        const updatedUsers = await this.findAll();
        return updatedUsers.slice(0,1).shift();
    }

    async update(email, user){
        let users = await this.findAll();
        let updateUser = users.find(user=> user.email === email);

        let dirty = false;
        if(user.password){
            updateUser.password = user.password;
            dirty = true;
        }
        if(dirty){
            await fs.promises.writeFile(this.filename, JSON.stringify(users,null, 2));
        }
    }

    async deleteById(id){
        const users = await this.findAll();
        const updateUsersList = users.filter(user => user.id !== id);
        await fs.promises.writeFile(this.filename, JSON.stringify(updateUsersList, null, 2));
    }

    async deleteAll() {
        await fs.promises.writeFile(this.filename, '[]');
    }

}

module.exports = new UserRepository('users.json');