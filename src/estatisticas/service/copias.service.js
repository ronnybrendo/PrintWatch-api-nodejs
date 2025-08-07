const { db, parseError } = require('../../utils/db.service');
require('dotenv').config();

module.exports = {
    async getAllValueOfPages () {
        try {
            // Lista de impressoras a serem ignoradas
            const impressorasIgnoradas = [
                'Microsoft Print to PDF',
                'Microsoft XPS Document Writer',
                'PDFCreator',
                'Adobe PDF',
                'ZDesigner ZD220-203dpi ZPL',
                'Sybase DataWindow PS',
                'MP-4200 TH',
                'PDF Architect 9',
                'Doro PDF Writer'
                // Adicione outras impressoras que devem ser ignoradas aqui
            ];

            const registros = await db.central.findMany({
                where: {
                    impressora: {
                        notIn: impressorasIgnoradas
                    }
                },
                select: {
                    paginas: true,
                    copias: true
                }
            });

            // Soma total de páginas impressas (paginas * copias)
            const totalPaginas = registros.reduce((acc, curr) => {
                return acc + ((curr.paginas || 0) * (curr.copias || 0));
            }, 0);

            return { data: { totalPaginas }, meta: { feedback: 'Copies and pages retrieved successfully' } };
        }
        catch (error) {
            return parseError(error, 'Error in getAllValueCopiesAndPages service');
        }
    },
}