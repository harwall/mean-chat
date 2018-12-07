/*
Imports
*/
    const express = require('express');
    const authRouter = express.Router({ mergeParams: true });
    const { register, login } = require('./auth.controller');

    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
    const { checkFields } = require('../../services/request.checker.js');
//

/*
Routes definition
*/
    class AuthRouterClass {
        routes(){
            // HATEOAS
            authRouter.get('/', (req, res) => {
                res.json('HATEOAS for auth');
            });
            
            // Register
            authRouter.post('/register', (req, res) => {
                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                // Check for mandatories
                const { miss, extra, ok } = checkFields(["first_name", "last_name", "email", "password"], req.body);
                
                // Check oppropriated values
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
                else{
                    // Use controller function
                    register(req.body)
                    .then( apiRes =>  sendApiSuccessResponse(res, 'Todo updated', apiRes))
                    .catch( apiErr => sendApiErrorResponse(res, 'Todo not updated', apiErr));
                }

                
            });

            // Login
            authRouter.post('/login', (req, res) => {
                // Check for body data
                if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

                // Check for mandatories
                const { miss, extra, ok } = checkFields(["email", "password"], req.body);
                
                // Check oppropriated values
                if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }
                else{
                    // Use controller function
                    login(req.body)
                    .then( apiRes =>  sendApiSuccessResponse(res, 'Todo updated', apiRes))
                    .catch( apiErr => sendApiErrorResponse(res, 'Todo not updated', apiErr));
                }

                
            });
        };

        init(){
            this.routes();
            return authRouter;
        }
    }
//

/*
Export
*/
    module.exports = AuthRouterClass;
//