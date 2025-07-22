const method = require("express").Router();
const impressaoController = require('../controller/impressao.controller');
const { init, end } = require('../../utils/request.service');

method.post('/central/receptprintreq', init, impressaoController.ReceptPrintReq);
method.post('/central/verifyimpression', init, impressaoController.verifyImpression);

module.exports = method;