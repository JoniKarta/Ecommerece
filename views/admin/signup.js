
const layout = require("../auth-layout");

module.exports = ({req}) => {
    return layout({content: `
        <div>
            ${req.session.id} 
            <form method="POST"> 
                <input type="text" placeholder="email" name="email">
                <input type="password" placeholder="password" name="password">
                <input type="password" placeholder="confirm password" name="confirm">
                <button> Sign Up </button>
            </form>
        </div>
    
    `})
}