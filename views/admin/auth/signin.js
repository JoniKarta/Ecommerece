

const layout = require("../../auth-layout");
const checkErrors = (errors, prop)=> {

    try{
        return errors.mapped()[prop].msg;
    }catch(err){
        return '';
    }
}
module.exports = ({req, errors})=>{

    return layout({content: `
        <div> 
            <form method="POST">
            <label> Email </label>
            <input type="text" placeholder="email" name="email"><br>
            ${checkErrors(errors, 'email')}
            <label> Password </label>
            <input type="password" placeholder="password" name="password"><br>
            ${checkErrors(errors, 'password')}
            <button> Sign In </button>
            </form>
        </div>
    `
})};