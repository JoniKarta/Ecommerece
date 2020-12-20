
const layout = require("../auth-layout");

const checkErrors = (errors, prop)=> {
    try{
        return errors.mapped()[prop].msg;
    }catch(err){
        return '';
    }
    
}
module.exports = ({req, errors}) => {
    return layout({content: `
        <div class="signup-container">
            <form method="POST"> 
                <h1> Sign Up </h1>
                <label> Email </label><br>
                <input name="email" type="text" placeholder="email" ><br>
                ${checkErrors(errors, 'email')}
                <label> Password </label><br>
                <input name="password" type="password" placeholder="password"><br>
                ${checkErrors(errors, 'password')}
                <label> Confirm Password </label><br>
                <input name="confirmPassword" type="password" placeholder="confirm password" ><br>
                ${checkErrors(errors, 'confirmPassword')}
                <button> Sign Up </button>
            </form>
        </div>
    
    `})
}