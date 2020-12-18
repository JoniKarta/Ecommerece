// npm i --save-dev jest
const { test, beforeEach, afterEach, expect } = require('@jest/globals');
const User = require('../model/user');

const userRepository = require('../data-access-layer/user-repo');

beforeEach(async ()=> {
    await userRepository.deleteAll();
});

afterEach(async ()=> {
    await userRepository.deleteAll();
});


test('get all users while the server is up return empty array', async ()=> {
    const users = await userRepository.findAll();
    expect(users).toHaveLength(0);
});

test('get all users while there is one users return array with one user', async ()=> {
    const user = new User('jon@gmail.com', 'a75be2s');
    await userRepository.save(user);
    const users = await userRepository.findAll();
    expect(users).toHaveLength(1);
});

test('create new user return the user the database with proper attributes', async ()=> {

    const user = new User('gal@gmail.com', '34234');
    const userFromDatabase = await userRepository.save(user);
    console.log(userFromDatabase);
    expect(user).toEqual(userFromDatabase);
});


test('delete the first inserted user from database with specific id',async () => {
    // create mock users 
    const user1 = new User('Jonathan@gmail.com', '12345');
    const user2 = new User('Shira@gmail.com', '2323');
    const user3 = new User('David@gmail.com', '3232');
    
    await userRepository.save(user1);
    await userRepository.save(user2);
    await userRepository.save(user3);

    // get all users using findAll
    let users = await userRepository.findAll();
    // extract the id from the user
    const firstUser = users.slice(0, 1).shift();
    // delete by the given id
    await userRepository.deleteById(firstUser.email);
    
    // get all users using find all 
    users = await userRepository.findAll();
    const newFirstUser = users.slice(1,0).shift();

    // check equality of the objects
    expect(firstUser).not.toEqual(newFirstUser);
});

test('update user password', async ()=> {
    // Create mock user
    const user1 = new User('Jonathan@gmail.com', '12345');    
    await userRepository.save(user1);

    // Update the user
    const updateUser = {email: 'Jonathan@gmail.com', password: '11111'};
    await userRepository.update(updateUser.email, updateUser);

    // get the updated user
    const userFromDb =  await userRepository.findById(user1.email);

    expect(userFromDb).toEqual(updateUser);
})
