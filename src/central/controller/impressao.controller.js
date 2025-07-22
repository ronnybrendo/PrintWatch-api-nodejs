const impressaoService = require('../service/impressao.service');
const { end } = require('../../utils/request.service');
const FEEDBACK = require('../../utils/feedback.service').getFeedbacks();
const idservice = require('../../utils/id.service');

module.exports = {
    async ReceptPrintReq(req, res) {
        const { data, hora, usuario, empresa, setor, paginas, copias, impressora, nomearquivo, tipo, tipopage, cor, tamanho, nomepc, ip, mac} = req.body;


        const result = await impressaoService.ReceptPrintReq({
            data, hora, usuario, empresa, setor, paginas, copias, impressora, nomearquivo, tipo, tipopage, cor, tamanho, nomepc, ip, mac
    });

        if (result.error) {
            console.error('Error in ReceptPrintReq:', result.error);
            return end(req, res, FEEDBACK.getFeedbacks().ERROR, result.error);
        }

        return end(req, res, FEEDBACK.CREATED, result);
    },

    async verifyImpression(req, res) {
        const { data, hora, usuario, empresa, setor, paginas, copias, impressora, nomearquivo, tipo, tipopage, cor, tamanho, nomepc, ip, mac } = req.body;

        const result = await impressaoService.verifyImpression({
            data, hora, usuario, empresa, setor, paginas, copias, impressora,
            nomearquivo, tipo, tipopage, cor, tamanho, nomepc, ip, mac
    });

        if (result === undefined) {
            console.error('Error in verifyImpression: No result returned');
            return res.status(500).json({
                status: 'false',
                message: 'Erro ao verificar impressão, resultado indefinido'
            });
        }
        if (result === null) {
            console.error('Error in verifyImpression: Result is null');
            return res.status(500).json({
                status: 'false',
                message: 'Erro ao verificar impressão, resultado nulo'
            });
        }

        if (result === false) {
            console.log('verifyImpression: No existing record found');
            return res.status(200).json({
                status: 'false',
                message: 'Registro não encontrado, enviando dados'
            });
        }

        if (result === true) {
            console.log('verifyImpression: Existing record found');
            return res.status(200).json( {
                status: 'true',
                message: 'Registro já existe, não enviando'
            });
        }

        if (result.error) {
            console.error('Error in verifyImpression:', result.error);
            return end(req, res, FEEDBACK.ERROR, result.error);
        }
        
    }
};