const dao = require('../data-access-layer/user-repo');


async function createUser(user){

    // check if the user already exists in the system
    const checkUser = await dao.findById(user.email);
    if(checkUser){
        return null;
    }
    // check that the email is valid

    // check password and confirmation

    // save the user in the system
    return await dao.save(user);
}

module.exports = {
    createUser
}