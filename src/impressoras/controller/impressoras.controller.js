const impressorasService = require('../service/impressoras.service');
const { end } = require('../../utils/request.service');
const FEEDBACK = require('../../utils/feedback.service').getFeedbacks();
const idservice = require('../../utils/id.service');

module.exports = {
    async ReturnAllPrinters (req, res) {

        
        const response = await impressorasService.ReturnAllPrinters(req);

        if (response.error) {
            return res.status(500).json({ error: response.error, message: FEEDBACK.ERROR });
        }

        return res.status(200).json({ data: response.data, meta: { message: "retornado com sucesso", feedback: FEEDBACK.SUCCESS } });

    },
}