const layout = require("../../auth-layout")
const checkErrros = (errors, prop) => {

    try {
        return errors.mapped()[prop].msg;
    }catch(err){

    }
}

module.exports = ({req, errors})=> {
    return layout({content: `
        <div> 
            <form> 
                <label> Product Name </label><br> 
                <input type="text" name="name" placeholder="Product Name"><br>
                <label> Product Price </label><br>  
                <input type="text" name="price" placeholder="Price"><br>
                <input type="file" name="image"><br>
                <button> Create Product </button>
            </form>

        </div>
    `});
}