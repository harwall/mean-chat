const fetch = require('node-fetch');
/*
CRUD functions
*/
    // Create item
    const createItem = (apiUrl, bodyParams) => {
        return new Promise( (resolve, reject) => {
            fetch( apiUrl, {
                method: "POST",
                body: { content: bodyParams.content, user: bodyParams.user, isDone: false }
            })
            .then( todo =>  resolve(todo) )
            .catch( error => reject(error) )
        })
    }

    // Read item
    const readItem = (apiUrl, _id) => {
        return new Promise( (resolve, reject) => {
            fetch( `${apiUrl}?id=${_id}`)
            .then( todo =>  todo.json())
            .then( todoJson =>  resolve(todoJson))
            .catch( error => reject(error))
        });
    };

    // Read item
    const readItems = apiUrl => {
        return new Promise( (resolve, reject) => {
            fetch( apiUrl)
            .then( todo =>  todo.json())
            .then( todoJson =>  resolve(todoJson))
            .catch( error => reject(error))
        });
    };

    // Update item
    const updateItem = (apiUrl, _id, bodyParams) => {
        return new Promise( (resolve, reject) => {
            fetch( `${apiUrl}/${_id}`, {
                method: "PUT",
                body: { isDone: bodyParams.user }
            })
            .then( todo =>  resolve(todo) )
            .catch( error => reject(error) )
        })
    }

    // Delete item
    const deleteItem = (apiUrl, _id) => {
        return new Promise( (resolve, reject) => {
            fetch( `${apiUrl}/${_id}`, {
                method: "DELETE",
            })
            .then( todo =>  resolve(todo) )
            .catch( error => reject(error) )
        })
    }
//



// Export de la class
module.exports = {
    createItem,
    readItem,
    readItems,
    updateItem,
    deleteItem
};