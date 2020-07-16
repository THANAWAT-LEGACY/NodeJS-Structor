const RA_Master_Product = require("../../models/G7_Report/RA_Master_Product");
const sql = require("mssql");


const GetById = async (request, obj) => {

    try {
        const {
            id
        } = obj;
        let data = null;

        const query = await request
            .input('ID', sql.Int, id)
            .query(`
                    SELECT * FROM [dbo].[RA_Master_Product]
                    WHERE [ID] = @ID
                `)
        if (query.recordset[0]) {
            data = query.recordset[0]
        }
        return data;

    } catch (error) {

    }
}
module.exports = {
    GetById
}