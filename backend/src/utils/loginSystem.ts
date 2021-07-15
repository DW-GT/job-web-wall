const mysql = require('mysql2');
require('dotenv').config();
import { nanoid } from 'nanoid';
import { Application } from '../types/application';
import { LoginTokenObject } from '../types/loginSystem';
let loginTokens: LoginTokenObject[] = [];
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
connection.connect();
//@ts-ignore
async function initialize():Promise<>{
    return new Promise((resolve, reject)=>{
    connection.query(
        'SELECT admin_id, token, expire_date FROM `login_tokens`',[],
        //@ts-ignore
        function (error, results, fields) {
            console.log(results);
            //@ts-ignore
            results?.forEach(loginTokenObject => {
                loginTokens.push({
                    admin_id: loginTokenObject.admin_id,
                    login_token: loginTokenObject.token,
                    expire_date: loginTokenObject.expire_date
                });
            });
            resolve(results);
        }
    )
    });
};

const TWO_DAYS_IN_MILLISCONDS = 172800000;
setInterval(async ()=>{
    await deleteOldTokens();
    loginTokens.filter(loginTokenObject => new Date(loginTokenObject.expire_date)>=new Date());
},TWO_DAYS_IN_MILLISCONDS);

//@ts-ignore
async function deleteOldTokens(){
    return new Promise((resolve, reject)=>{
    connection.query(
        'DELETE FROM `login_tokens` WHERE expire_date<?',[new Date().toJSON().slice(0,10)],
        //@ts-ignore
        function (error, results, fields) {
            resolve("Ok");
        }
    )
    });
};
(async () => {
    await deleteOldTokens();
    await initialize();
})();

function checkLoginToken(id: number, loginToken:String): boolean{
    return !!loginTokens.find(loginData => loginData.admin_id == id && loginData.login_token == loginToken && new Date(loginData.expire_date)>=new Date());
}

async function checkLoginData(email: string, password: string): Promise<number>{
    return new Promise(
        (resolve,reject) =>{
            connection.query(
                'SELECT admin_id FROM `admins` WHERE email=? AND password=?',[email, password],
                //@ts-ignore
                function (error, results, fields) {
                    resolve(results);
                }
            );
    });
}

async function generateLoginToken(id: number): Promise<LoginTokenObject>{
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const token: string = nanoid();    
    const loginTokenData: LoginTokenObject = {
        admin_id: id,
        login_token: token,
        expire_date: tomorrow.toJSON().slice(0,10)
    }

    loginTokens.push(loginTokenData);
    return new Promise(
        (resolve,reject) =>{
            connection.query('INSERT INTO `login_tokens` (admin_id,token,expire_date) VALUES (?,?,?)',
                [loginTokenData.admin_id, loginTokenData.login_token, loginTokenData.expire_date],
                //@ts-ignore
                function(error,results,fields){resolve(loginTokenData)})
            }
    );
}

async function logOut(id: number){
    loginTokens.filter(loginTokenData => loginTokenData.admin_id == id);
    return new Promise(
        (resolve,reject) =>{
            connection.query('DELETE FROM `login_tokens` WHERE admin_id=?',
                [id],
                //@ts-ignore
                function(error,results,fields){
                    resolve("Ok");
                })
            }
    );
}

module.exports.checkLoginToken = checkLoginToken;
module.exports.checkLoginData = checkLoginData;
module.exports.logOut = logOut;
module.exports.generateLoginToken = generateLoginToken;
