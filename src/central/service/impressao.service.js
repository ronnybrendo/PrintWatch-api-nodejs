const axios = require('axios');
const { db, parseError } = require('../../utils/db.service');
const { verify } = require('crypto');
require('dotenv').config();

module.exports = {
    async ReceptPrintReq ({data, hora, empresa, usuario, setor, paginas, copias, impressora, nomearquivo, tipo, tipopage, cor, tamanho, nomepc, ip, mac}) {

        try {
            // Converte o valor de 'data' para o formato ISO antes de salvar
            const isoData = new Date(data).toISOString();

            const newRecept = await db.central.create({
                data: {
                    data: isoData,
                    hora,
                    usuario,
                    empresa,
                    setor, 
                    paginas,
                    copias,
                    impressora,
                    nomearquivo,
                    tipo,
                    tipopage,
                    cor,
                    tamanho,
                    nomepc,
                    ip,
                    mac
                },
                select: {
                    id: true,
                    data: true,
                    hora: true,
                    empresa: true,
                    usuario: true,
                    setor: true,
                    paginas: true,
                    copias: true,
                    impressora: true,
                    nomearquivo: true,
                    tipo: true,
                    tipopage: true,
                    cor: true,
                    tamanho: true,
                    nomepc: true,
                    ip: true,
                    mac: true
                }
            });

            return newRecept;

        } catch (error) {
            return parseError(error, 'Error in ReceptPrintReq service');
        }
    },

    async verifyImpression ({data, hora, empresa, usuario, setor, paginas, copias, impressora, nomearquivo, tipo, tipopage, cor, tamanho, nomepc, ip, mac}) {

        try {
            const existingRecord = await db.central.findFirst({
                where: {
                    data: new Date(data).toISOString(),
                    setor,
                    empresa,
                    impressora,
                    nomearquivo,
                    paginas,
                    copias,
                    tipo,
                    tipopage,
                    cor,
                    tamanho,
                    nomepc,
                    ip,
                    mac,
                    hora,
                    usuario,
                    impressora,
                    nomearquivo
                }
            });

            return existingRecord ? true : false;
        } catch (error) {
            return parseError(error, 'Error in verifyImpression service');
        }
    }
};