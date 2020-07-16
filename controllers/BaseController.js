
class BaseController {
    constructor() {

    }

    static async getById(req, modelName) {

        return {
            id: 1,
            name: 'test'
        };
    }


}
module.exports = BaseController;
