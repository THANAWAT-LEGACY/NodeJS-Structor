const BaseController = require("./BaseController");
const sql = require("mssql")
const RequestHandler = require("../utils/RequestHandler");
const Joi = require("@hapi/joi");
const User = require("../models/user")
const config = require("../config/db");

const RA_Master_Product = require("../db/G7_Report/RA_Master_Product");
const requestHandler = new RequestHandler(null);


const poolOperation = new sql.ConnectionPool(config.legacy_operation);
const poolG7Report = new sql.ConnectionPool(config.G7_Report);

// const poolOperationClose = poolOperation.close();

class UsersController extends BaseController {



    static async getUserById(req, res) {
        // await poolOperation.connect();
        await poolG7Report.connect();
        try {
            // const UserValidate = Joi.object({
            //     ID: Joi.number(),
            //     Name: Joi.string().allow('', null)
            // });

            // const obj = {
            //     ID: 1,
            //     Name: null
            // }
            // const { error } = Joi.validate(obj, UserValidate);

            // if (error) throw new Error(error);

            // let user = new User().getById(3);
            // console.log('user 1', user)
            // user = { ...obj }
            // console.log('user 2', user)




            // poolOperation.on('error', err => {
            //     // ... error handler
            //     console.log('pool error', err);
            // });
            poolG7Report.on('error', err => {
                // ... error handler
                console.log('pool error', err);
            });
            let product = {};
            // let product = await RA_Master_Product.GetById(poolG7Report.request(), { id: 1 });

            

            // console.log('id',product.ID)
            // console.log('aaa',product.aaa)

            return requestHandler.sendSuccess(res, 'success')(product)
        } catch (error) {
            return requestHandler.sendError(req, res, error)
        }
        finally {
            // poolOperation.close()
            poolG7Report.close()
        }
    }
}
module.exports = UsersController;