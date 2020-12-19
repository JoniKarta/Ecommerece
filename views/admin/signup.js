
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
        <div>
            ${req.session.id} 
            <form method="POST"> 
                <input type="text" placeholder="email" name="email">
                ${checkErrors(errors, 'email')}
                <input type="password" placeholder="password" name="password">
                ${checkErrors(errors, 'password')}
                <input type="password" placeholder="confirm password" name="confirm">
                ${checkErrors(errors, 'confirm')}
                <button> Sign Up </button>
            </form>
        </div>
    
    `})
}