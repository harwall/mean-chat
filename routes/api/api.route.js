/*
Imports
*/
    // Node
    const express = require('express');
    const router = express.Router();
    const fetch = require('node-fetch');

    // Outter
    const apiUrl = 'http://localhost:4444/todoes'

    // Inner
    const { createItem, readItem, readItems, updateItem, deleteItem } = require('./api.controller');
    const { checkFields } = require('../../services/request.checker');
    const { sendBodyError, sendFieldsError, sendApiSuccessResponse, sendApiErrorResponse } = require('../../services/server.response');
//

/*
Route definition
*/
    router.get('/todo', (req, res) => {
        // Display todoes
        readItems(apiUrl)
        .then( apiRes =>  sendApiSuccessResponse(res, 'Todo received', apiRes))
        .catch( apiErr => sendApiErrorResponse(res, 'Todo not received', apiErr));
    })

    router.get('/todo/:id', (req, res) => {
        // Check for route param
        if (!req.params || !req.params.id) { sendBodyError(res, 'No param provided') }

        // Display todo
        readItem(apiUrl, req.params.id)
        .then( apiRes =>  sendApiSuccessResponse(res, 'Todo received', apiRes))
        .catch( apiErr => sendApiErrorResponse(res, 'Todo not received', apiErr));
    })

    router.put('/todo/:id', (req, res) => {
        // Check for route param
        if (!req.params || !req.params.id) { sendBodyError(res, 'No param provided') }

        // Check for body data
        if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

        // Check for mandatories
        const { miss, extra, ok } = checkFields(['content', 'isDone', 'user'], req.body);
        
        // Check oppropriated values
        if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

        // Display todo
        updateItem(apiUrl, req.params.id)
        .then( apiRes =>  sendApiSuccessResponse(res, 'Todo updated', apiRes))
        .catch( apiErr => sendApiErrorResponse(res, 'Todo not updated', apiErr));
    })

    router.post('/todo', (req, res) => {
        // Check for body data
        if( typeof req.body === 'undefined' || req.body === null ) sendBodyError( res, 'No body data provided' );

        // Check for mandatories
        const { miss, extra, ok } = checkFields(['content', 'user'], req.body);
        
        // Check oppropriated values
        if( !ok ){ sendFieldsError( res, 'Bad fields provided', miss, extra ) }

        // Add todo
        createItem(apiUrl, req.body)
        .then( apiRes =>  sendApiSuccessResponse(res, 'Todo received', apiRes))
        .catch( apiErr => sendApiErrorResponse(res, 'Todo not received', apiErr));
    })

    router.delete('/todo/:id', (req, res) => {
        // Check for route param
        if (!req.params || !req.params.id) { sendBodyError(res, 'No param provided') }

        // Delete todo
        deleteItem(apiUrl, req.params.id)
        .then( apiRes =>  sendApiSuccessResponse(res, 'Todo received', apiRes))
        .catch( apiErr => sendApiErrorResponse(res, 'Todo not received', apiErr));
    })
//

/*
Export
*/
    module.exports = router;
//