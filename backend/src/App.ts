import express, { Request, Response } from 'express';
import cors from 'cors';

const fileUpload = require('express-fileupload');

const app = express();
const port = 4000;
const applicationRouter = require('./routes/application');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/static', express.static(__dirname + '/uploads'));
console.log(__dirname);


app.use(fileUpload());
app.use('/api/application', applicationRouter);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
});


app.listen(port, () => {
    console.log(`Server Started at Port ${port}`);
});
