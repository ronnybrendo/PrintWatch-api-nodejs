const GetCopias = require('../service/copias.service');
const FEEDBACK = require('../../utils/feedback.service').getFeedbacks();
const { end } = require('../../utils/request.service');

module.exports = {
    async ReturnAllValueOfPages(req, res) {
        const response = await GetCopias.getAllValueOfPages(req);

        if (response.error) {
            return res.status(500).json({ error: response.error, message: FEEDBACK.ERROR });
        }

        return res.status(200).json({ data: response.data, meta: { feedback: FEEDBACK.SUCCESS } });
    }
}