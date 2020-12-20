const fs = require('fs');
const Repository = require('./repository');

class UserRepository extends Repository{
    
    constructor(fileName){
        super(fileName);
    }
}

module.exports = new UserRepository('users.json');

