const GetColors = require('../service/color.service');
const FEEDBACK = require('../../utils/feedback.service').getFeedbacks();
const { end } = require('../../utils/request.service');

module.exports = {
    async ReturnMustUsedColors (req, res) {
        const response = await GetColors.getMostUsedColors(req);

        if (response.error) {
            return res.status(500).json({ error: response.error, message: FEEDBACK.ERROR });
        }

        return res.status(200).json({ data: response.data, meta: { feedback: FEEDBACK.SUCCESS } });
    },
    async ReturnMustUsedColorsBySector (req, res) {
        const response = await GetColors.getMostUsedColorsBySector(req);

        if (response.error) {
            return res.status(500).json({ error: response.error, message: FEEDBACK.ERROR });
        }

        return res.status(200).json({ data: response.data, meta: { feedback: FEEDBACK.SUCCESS } });
    },
    async ReturnMustUsedColorsByUser (req, res) {
        const response = await GetColors.getMustUsedColorsByUser(req);

        if (response.error) {
            return res.status(500).json({ error: response.error, message: FEEDBACK.ERROR });
        }

        return res.status(200).json({ data: response.data, meta: { feedback: FEEDBACK.SUCCESS } });
    }
}