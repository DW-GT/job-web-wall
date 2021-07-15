const express = require('express');
import { RequestHandler, Request, Response, NextFunction } from 'express-serve-static-core';
const mysql = require('mysql2');
const { getAllOffers, getSpecificOffers, getOfferTypes,getOffer} = require('../utils/applicationApiRequests');
const { deleteOffer, addOffer, editOffer} = require('../utils/adminApiRequests');
const { checkLoginData, generateLoginToken, checkLoginToken, logOut} = require('../utils/loginSystem');
import fileUpload = require('express-fileupload');
import { uploadHandler } from '../utils/adminApiRequests';

const {
    OK,
    CREATED,
    NO_CONTENT,
    BAD_REQUEST,
    NOT_FOUND,
} = require('http-status-codes');





// create router
const router = express.Router();


router.get('/getAllOffers', async (req:Request, res:Response) => {
    let response = await getAllOffers();
    res.status(OK).send(response);
});

router.get('/getSpecificOffers/:typeID', async (req:Request, res:Response) => {
    let response = await getSpecificOffers(Number(req.params.typeID));
    res.status(OK).send(response);
});

router.get('/getOffer/:ID', async (req:Request, res:Response) => {
    let response = await getOffer(Number(req.params.ID));
    if(response){
    res.status(OK).send(response[0]);
    }
});

router.get('/getOfferTypes', async (req:Request, res:Response) => {
    let response = await getOfferTypes();
    res.status(OK).send(response);
});

router.post('/getLoginToken', async(req:Request, res:Response) =>  {
    const email = req.body.email;
    const password = req.body.password;

    let adminId = await checkLoginData(email, password);
    if(adminId && adminId[0] && adminId[0].admin_id){
        let tokenData = await generateLoginToken(adminId[0].admin_id);
        res.status(OK).send(tokenData);
    }else{
        res.status(401).send("Login data not ok");
    }
});

router.delete('/logOut',async(req:Request, res:Response) =>{
    if(checkLoginToken(req.body.admin_id, req.body.token)){
        await logOut(req.body.admin_id);
        res.status(OK).send("OK");
    }else{
        res.status(401).send("You are Unauthorized");
    }    
});

router.delete('/deleteOffer',async(req:Request, res:Response) =>{
    if(checkLoginToken(req.body.admin_id, req.body.token)){
        await deleteOffer(req.body.applicationid);
        res.status(OK).send("OK");
    }else{
        res.status(401).send("You are Unauthorized");
    }
});

router.post('/addOffer',async(req:Request, res:Response) =>{
    if(checkLoginToken(req.body.admin_id, req.body.token)){
        let id  = await addOffer(req.body.application,req);        
        res.status(OK).send(""+id);
    }else{
        res.status(401).send("You are Unauthorized");
    }});

router.put('/editOffer',async(req:Request, res:Response) =>{
        if(checkLoginToken(req.body.admin_id, req.body.token)){
            await editOffer(req.body.application,req);
            res.status(OK).send("OK");
        }else{
            res.status(401).send("You are Unauthorized");
    }});

router.post('/upload', (req:Request, res:Response) => {uploadHandler(req,res)});

// export router
module.exports = router;
