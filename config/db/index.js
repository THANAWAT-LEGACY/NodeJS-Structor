// config database
const legacy_operation = {
    server: process.env.DB_HOST || '119.110.228.28',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'P@ssw0rdLe9@cy',
    database: process.env.DB_NAME || 'legacy_operation',
    options: {
        encrypt: false,
        rowCollectionOnDone: true,
        useUTC: false,
        enableArithAbort: true
    }
};
const G7_Report = {
    server: process.env.DB_HOST || '119.110.228.28',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD || 'P@ssw0rdLe9@cy',
    database: process.env.DB_NAME || 'G7_Report',
    options: {
        encrypt: false,
        rowCollectionOnDone: true,
        useUTC: false,
        enableArithAbort: true
    }
};

module.exports = {
    legacy_operation,
    G7_Report
}