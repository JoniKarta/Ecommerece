

const animals = ['dog', 'fish', 'cat', 'lion', 'elephant', 'sharp', 'bear', 'mouse'];
// get the first element 
// console.log(animals.slice(0, 1).shift());
// console.log(animals.slice(0, 1).pop());
// console.log(animals.slice(0,1)[0]);

// // get the last element 
// console.log(animals.pop());

// // get element by index
// console.log(animals[5]);

// console.log("--------------- slice ----------------- ")
// console.log(animals.slice(1, 3));
// //[ 'fish', 'cat' ]
// console.log(animals); // return the original array

// console.log("--------------- splice ----------------- ")
// // --> specify length
// //console.log(animals.splice(1, 3));
// console.log(animals.splice(1))
// //[ 'fish', 'cat', 'lion' ]
// console.log(animals); // return the array without the element listed above


// const obj = { email: 'Jonathan@gmail.com', password: '123456', confirm: '123456' };

// const errors = [
//     {
//         value: 'lkfkldajfkldsa',
//         msg: "Password don't match"
//     },
//     {
//         value: 'fdsalfkdsajlkfdsa',
//         msg: "Email must be valid"
//     },
//     {
//         value: 'fkldsajflkdsptrewipo',
//         msg: "Password must be between 2 to 5 characters"
//     }
// ]
// console.log("--------- errors -------------------")
// const checkError = (errors)=> {

//   console.log(errors.mapped()[0])
// }
// // const checkErrors = (errors, prop)=> {
// //     try{
// //         return errors.mapped()[prop].msg;
// //     }catch(err){
// //         return '';
// //     }
    
// // }
// checkError(errors);



console.log(animals); 
animals.push('something');
console.log(animals)
const val = animals.filter(e => e === 'dog');
console.log(val.pop())