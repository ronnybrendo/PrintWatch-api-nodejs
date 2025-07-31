const method = require("express").Router();
const { init, end } = require('../../utils/request.service');

const impressorasController = require('../controller/impressoras.controller');

method.get('/impressoras/listarimpressoras', init, impressorasController.ReturnAllPrinters);

module.exports = method;