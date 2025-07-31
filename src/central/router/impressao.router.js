const method = require("express").Router();
const { init, end } = require('../../utils/request.service');
const impressaoController = require('../controller/impressao.controller');

method.post('/central/receptprintreq', init, impressaoController.ReceptPrintReq);
method.post('/central/verifyimpression', init, impressaoController.verifyImpression);

module.exports = method;