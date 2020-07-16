const BaseController = require("./BaseController");
const sql = require("mssql")
const RequestHandler = require("../utils/RequestHandler");
const Joi = require("@hapi/joi");
const User = require("../models/user")
const config = require("../config/db")
const requestHandler = new RequestHandler(null);
const RA_Master_Promotion = require('../db/G7_Report/RA_Master_Product')


const poolOperation = new sql.ConnectionPool(config.legacy_operation);
const poolG7Report = new sql.ConnectionPool(config.G7_Report);

// const poolOperationClose = poolOperation.close();

class UsersController extends BaseController {



    static async getUserById(req, res) {
        await poolOperation.connect();
        await poolG7Report.connect();
        try {
            const UserValidate = Joi.object({
                ID: Joi.number(),
                Name: Joi.string().allow('', null)
            });

            const obj = {
                ID: 1,
                Name: null
            }
            const { error } = Joi.validate(obj, UserValidate);

            if (error) throw new Error(error);

            let user = new User().getById(3);
            console.log('user 1', user)
            user = { ...obj }
            console.log('user 2', user)




            poolOperation.on('error', err => {
                // ... error handler
                console.log('pool error', err);
            });
            poolG7Report.on('error', err => {
                // ... error handler
                console.log('pool error', err);
            });
            console.log('pool')
            const product = await RA_Master_Promotion.GetById(poolG7Report.request(), { id: 1 })

            
            // const result = await poolOperation.request()
            //     .input('ID', sql.Int, 1)
            //     .query(`
            //     SELECT [ID]
            //         ,[AbName]
            //         ,[NameTH]
            //         ,[NameEN]
            //         ,[CreateUser]
            //         ,[CreateDate]
            //         ,[UpdateUser]
            //         ,[UpdateDate]
            //     FROM [legacy_operation].[dbo].[Master_Bank]
            //     WHERE ID = @ID
            // `)
            // const result2 = await poolG7Report.request()
            //     .input('ID', sql.Int, 1)
            //     .query(`
            //     SELECT [ID]
            //         ,[Name]
            //         ,[Code]
            //         ,[Active]
            //         ,[ProjectId]
            //         ,[StartDate]
            //         ,[EndDate]
            //         ,[CreateDate]
            //         ,[CreateBy]
            //         ,[UpdateDate]
            //         ,[UpdateBy]
            //         ,[Remark]
            //         ,[Status]
            //     FROM [G7_Report].[dbo].[RA_Master_Promotion]
            //     WHERE ID = @ID
            // `)


            // if (!result.recordset[0]) return requestHandler.sendSuccess(res, 'data not found !!', false)(null)
            // if (!result2.recordset[0]) return requestHandler.sendSuccess(res, 'RA data not found !!', false)(null)

            return requestHandler.sendSuccess(res, 'success')(product)
        } catch (error) {
            return requestHandler.sendError(req, res, error)
        }
        finally {
            poolOperation.close()
            poolG7Report.close()
        }
    }
}
module.exports = UsersController;