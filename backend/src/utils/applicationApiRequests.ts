const mysql = require('mysql2');
require('dotenv').config();
import { Application } from '../types/application';
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
connection.connect();

async function getAllOffers() {
    //@ts-ignore
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `applications` order by creation_date DESC',
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });
}

async function getSpecificOffers(typeID:number) {
    //@ts-ignore
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `applications` where applicationtype_id = ? order by creation_date DESC',[typeID],
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });
}

async function getOffer(ID:number) {
    //@ts-ignore
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `applications` where application_id = ?',[ID],
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });
}

async function getOfferTypes() {
    //@ts-ignore
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT * FROM `application_types`',
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });
}



module.exports.getAllOffers = getAllOffers;
module.exports.getSpecificOffers = getSpecificOffers;
module.exports.getOfferTypes = getOfferTypes;
module.exports.getOffer = getOffer;



