// const RA_Master_Product = require("../../models/G7_Report/RA_Master_Product");
const sql = require("mssql")

// class Model {
//     constructor() {
//         this.ID = null,
//             this.SKU = null,
//             this.SKUGroupId = null,
//             this.ProjectId = null,
//             this.CreateDate = null,
//             this.CreateBy = null,
//             this.UpdateDate = null,
//             this.UpdateBy = null,
//             this.Status = null
//     }

// }

// class RA_Master_Product {

//     static async Insert(request, obj) {

//     }

//     static async  GetById  (request, obj) {

//         try {
//             const {
//                 id
//             } = obj;
//             let data = null;
    
//             const query = await request
//                 .input('ID', sql.Int, id)
//                 .query(`
//                         SELECT * FROM [dbo].[RA_Master_Product]
//                         WHERE [ID] = @ID
//                     `)
//             if (query.recordset[0]) {
//                 data = query.recordset[0]
//             }
//             return data;
    
//         } catch (error) {
    
//         }
//     }

// }
// module.exports = RA_Master_Product;

// const Insert = async (request, obj) => {
//     try {
//         // let data = new RA_Master_Product();
//        let data = obj;


//         return data;
//     } catch (error) {

//     }

// }

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
    // Insert,
    GetById
}