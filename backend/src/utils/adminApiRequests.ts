const mysql = require('mysql2');
import fileUpload = require('express-fileupload');
import { RequestHandler, Request, Response, NextFunction } from 'express-serve-static-core';
require('dotenv').config();
import { Application } from '../types/application';
import * as fs from 'fs';
import path from 'path';
var gm = require('gm');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

type UploadedFile = fileUpload.UploadedFile;

function createThumbnail (file: String){

    // file.pdf[0]
    let pdfFirstPage = file + "[0]";
    // The name of your pdf
    gm(pdfFirstPage)
        .setFormat("jpg")
        .resize(200) // Resize to fixed 200px width, maintaining aspect ratio
        .quality(75) // Quality from 0 to 100
        .write(file + ".jpg", function(error: any){
            // Callback function executed when finished
            if (!error) {
                console.log("Finished saving JPG");
            } else {
                console.log("There was an error!", error);
            }
    });
}


function isSingleFile(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return typeof file === 'object' && (file as UploadedFile).name !== undefined;
}

function isFileArray(file: UploadedFile | UploadedFile[]): file is UploadedFile[] {
    return Array.isArray(file);
}

connection.connect();



export function uploadHandler (req: Request,res: Response) {
    console.log(req.body);
    
    
    if (typeof req.files === 'object') {
        const fileField = req.files.file;
        if (isSingleFile(fileField)) {  
            if(fs.existsSync(path.join('./build/uploads/'+req.body.id+".pdf"))){
                console.log("file exists");
                fs.unlink(path.join("./build/uploads/"+req.body.id+".pdf"),(error) =>{
                    if(error){
                        console.log("error has occured while deleting");
                    }
                    console.log("File deleted");
                });
            }

            let pdfFile = './build/uploads/'+req.body.id+".pdf"; 
            fileField.mv(pdfFile, err => {
                if (err) {
                    console.log(err);
                    console.log('Error while copying file to target location');
                    res.status(500).send("Error while copying file to target location");
                }else {
                    createThumbnail(pdfFile);
                    connection.query(
                        'Update `applications` set pdf_src = ? where application_id = ?',
                        ["/static/"+req.body.id+".pdf",req.body.id],
                        //@ts-ignore
                        function (error, results, fields) {
                            if(error){
                                console.log("Error");
                            }else{
                                res.status(200).send("OK");
                                console.log("should have worked");
                            }
                        }
                    );
                }
            });
        }
    }

};


async function deleteOffer(offerId: number) {
    return new Promise((resolve, reject) => {
        // todo select for pdf-file-name
        // todo also delete .pdf.jpg File
        fs.unlink(path.join('./build/uploads/'+offerId+".pdf"),(error) =>{
            if(error){
                console.log("error has occured while deleting");
            }
            console.log("File " +  offerId + " deleted");
        });
        connection.query(
            'DELETE FROM `applications` where application_id = ?',
            [offerId],
            //@ts-ignore
            function (error, results, fields) {
                resolve('Ok');
            }
        );
    });
}


async function addOffer(newOffer: Application) {

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO `applications` (name,description,company_name,email,telefon,pdf_src,creation_date,lastupdate_date,applicationtype_id,expire_date) VALUES(?,?,?,?,?,?,?,?,?,?)',
            [
                newOffer.name,
                newOffer.description,
                newOffer.company_name,
                newOffer.email,
                newOffer.telefon,
                " ",
                newOffer.creation_date.substring(0,10),
                newOffer.lastupdate_date.substring(0,10),
                newOffer.applicationtype,
                newOffer.expire_date?.substring(0,10),
            ],
            //@ts-ignore
            function (error, results, fields) {
                console.log(error);
                console.log(results);
                
                resolve(results.insertId);
            }
        );
    });
}

async function editOffer(offer: Application,req: Request) {
    return new Promise((resolve, reject) => {
        
        connection.query(
            'UPDATE `applications` SET name = ?,description  = ?,company_name = ?,email = ?,telefon = ?,pdf_src = ?,creation_date = ?,lastupdate_date = ?,applicationtype_id = ?,expire_date = ? WHERE application_id = ?',
            [
                offer.name,
                offer.description,
                offer.company_name,
                offer.email,
                offer.telefon,
                "/static/"+offer.application_id+".pdf",
                offer.creation_date.substring(0,10),
                offer.lastupdate_date.substring(0,10),
                offer.applicationtype,
                offer.expire_date?.substring(0,10),
                offer.application_id,
            ],
            //@ts-ignore
            function (error, results, fields) {
                resolve('Ok');
            }
        );
    });
}

module.exports.deleteOffer = deleteOffer;
module.exports.addOffer = addOffer;
module.exports.editOffer = editOffer;
