import express from 'express';
import compression from 'compression'; // ช่วยในการลดขนาดของ request/response body ด้วย gzip
import bodyParser from 'body-parser'; //ตัวนี้ไว้ทำให้เว็บเราอ่านและส่งค่าของ Body ไปให้ Express 
import morgan from 'morgan';
import env from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';


import { sql, setPool, setConfig } from './src/utils/global-variable';

// routes
import routes from './src/routes';

const app = express();

// load env
env.config();

// middleware
app.use(compression());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors({
    origin: '*',
    methods: 'GET,POST'
}));
app.use(helmet({
    noCache: true
}));

// config database
const configSql = {
    server: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        rowCollectionOnDone: true
    }
}
const host = process.env.HOST;
const port = parseInt(process.env.PORT) || 3000;

// global variables
global._rootPath = __dirname;

// set jwt keys
// jwt.setKeyFromPath((__dirname == '/' ? '' : __dirname) + '/keys');

// create pool
try {
    const _pool = new sql.ConnectionPool(configSql, (err) => {

        if (err) {
            throw err;
        }
        else {
            _pool.on('error', err => {
                console.log('pool error', err);
            });

            // 1. set pool
            setPool(_pool);

            // 2. default page : return text/html (api helper page)
            app.get('/', (req, res) => sendStatus(200));

            // 3. set app config
            // setConfig();

            // 4. routes
            app.use(routes);

            // 5. start server
            app.listen(port, () => {
                console.log(`Service started at Port : ${port}`);
            });

        }
    });
} catch (err) {
    console.log('connect pool error', err);
}

