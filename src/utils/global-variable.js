import sql from 'mssql';
import _ from 'lodash';
// import * as helper from 'icon-utility';
// import jwt from './utils/jwt';
import axios from 'axios';
import moment from 'moment';

// sql pool
let _pool = null;

// configs
let config = {
    URL_SAP_API: '',
    URL_SAP_CM_API: '',
    UPLOAD_PATH: '',
}

function createRequest(trans) {
    if (trans == null) {
        return _pool.request();
    } else {
        return new sql.Request(trans);
    }
}
function setPool(pool){
    _pool = pool;
}

function setConfig() {
    config.URL_SAP_API = process.env.URL_SAP_API;
    config.URL_SAP_CM_API = process.env.URL_SAP_CM_API;
    config.UPLOAD_PATH = process.env.UPLOAD_PATH;
}

export {
    _pool,
    sql,
    _,
    // helper,
    // jwt,
    axios,
    moment,
    setPool,
    createRequest,
    setConfig,
    config
}