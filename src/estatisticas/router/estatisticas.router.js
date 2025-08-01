const method = require("express").Router();
const { init, end } = require('../../utils/request.service');

const GetColors = require('../controller/color.controller');
const GetCopias = require('../controller/copias.controller');

method.get('/cores/coresmaisusadas', init, GetColors.ReturnMustUsedColors);

method.get('/cores/coresmaisusadasporsetor', init, GetColors.ReturnMustUsedColorsBySector);

method.get('/cores/coresmaisusadasporusuario', init, GetColors.ReturnMustUsedColorsByUser);

method.get('/copias/valorespaginasimpressas', init, GetCopias.ReturnAllValueOfPages);



module.exports = method;