

const layout = require("../auth-layout");

module.exports = ({req})=>{

    return layout({content: `
        <div> 
            <form method="POST">
            <input type="text" placeholder="email" name="email">
            <input type="password" placeholder="password" name="password">
            <button> Sign In </button>
            </form>
        </div>
    `
})};