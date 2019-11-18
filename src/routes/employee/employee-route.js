import express from 'express';
import { createRequest, _pool, sql } from '../../utils/global-variable';

const app = express();

// get
app.get('/', async (req, res) => {


    try {
        const result = await _pool.request()
            .query(`SELECT * FROM Employee`);

        res.send({
            status: true,
            message: "success",
            data: result.recordsets[0]
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message.toString()
        });
    }
});

// action 
app.post('/add', async (req, res) => {

    let trans = null;
    const { FirstName, LastName, Age, Mobile, Email, Company, Department, Position, Address } = req.body;

    try {
        trans = new sql.Transaction(_pool);
        await trans.begin();

        await createRequest(trans)
            .input('FirstName', sql.NVarChar, FirstName)
            .input('LastName', sql.NVarChar, LastName)
            .input('Age', sql.Int, Age)
            .input('Mobile', sql.NVarChar, Mobile)
            .input('Email', sql.NVarChar, Email)
            .input('Company', sql.NVarChar, Company)
            .input('Department', sql.NVarChar, Department)
            .input('Position', sql.NVarChar, Position)
            .input('Address', sql.NVarChar, Address)
            .query(`
            INSERT INTO Employee
            (FirstName, LastName, Age, Mobile, Email, Company, Department, Position, Address)
            VALUES
            (@FirstName, @LastName, @Age, @Mobile, @Email, @Company, @Department, @Position, @Address)
        `)

        await trans.commit();
        res.send({
            status: true,
            message: "success",
            data: null
        });

    } catch (error) {
        if (trans) await trans.rollback();

        res.status(500).json({
            status: 500,
            message: error.message.toString()
        });
    }
});

export default app;