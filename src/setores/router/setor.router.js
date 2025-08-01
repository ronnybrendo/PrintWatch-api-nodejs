const method = require("express").Router();
const { init, end } = require('../../utils/request.service');

const GetSetores = require('../controller/setor.controller');

method.get('/setores/listarsetores', init, GetSetores.ReturnAllSetores);

module.exports = method;