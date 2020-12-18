// npm i --save-dev jest
const { test, beforeEach, afterEach, expect } = require('@jest/globals');
const productRepo = require('../data-access-layer/product-repo');

beforeEach(async ()=> {
    await productRepo.deleteAll();
});

afterEach(async () => {
    await productRepo.deleteAll();
});

test('get all messages when the database is empty', async () => {
    const prodcuts = await productRepo.findAll();
    expect(prodcuts).toHaveLength(0);    
});