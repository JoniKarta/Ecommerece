const dao = require('../data-access-layer/user-repo');
const crypto = require('crypto');
const util = require('util');
const userRepo = require('../data-access-layer/user-repo');
const scrypt = util.promisify(crypto.scrypt);


async function createUser(user){
    const checkUser = await dao.findById(user.email);
    if(checkUser) return null;
    const sult = crypto.randomBytes(8).toString('hex');
    const hashed = await scrypt(user.password, sult, 64);
    user.password = `${hashed.toString('hex')}.${sult}`;
    return await dao.save(user);
}

async function getSpecificUser(email){
    const user = await userRepo.findById(email);
    return user;
}

async function compareHash(supplied, stored){
    let [hashed, sult] = stored.split('.');
    let hashedSupplied = await scrypt(supplied, sult, 64);
    return hashedSupplied.toString('hex') === hashed;
}

module.exports = {
    createUser,
    getSpecificUser,
    compareHash
}