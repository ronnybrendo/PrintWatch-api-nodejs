const { db, parseError } = require('../../utils/db.service');
require('dotenv').config();

module.exports = {
    async getAllValueOfPages () {
        try {
            const registros = await db.central.findMany({
                where: {
                    impressora: {
                        not: 'Microsoft Print to PDF'
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