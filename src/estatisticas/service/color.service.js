const { db, parseError } = require('../../utils/db.service');
require('dotenv').config();

module.exports = {
    async getMostUsedColors () {
        try {
            const colors = await db.central.groupBy({
                by: ['cor'],
                where: {
                    impressora: {
                        not: 'Microsoft Print to PDF'
                    }
                },
                _count: true ,
            });

            console.log(`Total de cores encontradas: ${colors.length}`);

            if (!colors || colors.length === 0) {
                return { error: 'No colors found' };
            }

            return { data: colors, meta: { feedback: 'Colors retrieved successfully' } };

        } catch (error) {
            return parseError(error, 'Error in getMostUsedColors service');
        }
    },
    async getMostUsedColorsBySector () {  
        try {
            const colors = await db.central.groupBy({
                by: ['setor', 'cor'],
                _count: true,
            });

            if (!colors || colors.length === 0) {
                return { error: 'No colors found by sector' };
            }

            return { data: colors, meta: { feedback: 'Colors by sector retrieved successfully' } };

        } catch (error) {
            return parseError(error, 'Error in getMostUsedColorsBySector service');
        }
    },
    async getMustUsedColorsByUser () {
        try {
            const colors = await db.central.groupBy({
                by: ['usuario', 'cor'],
                where: {
                    impressora: {
                        not: 'Microsoft Print to PDF'
                    }
                },
                _count: true,
            });

            if (!colors || colors.length === 0) {
                return { error: 'No colors found by user' };
            }

            return { data: colors, meta: { feedback: 'Colors by user retrieved successfully' } };

        } catch (error) {
            return parseError(error, 'Error in getMustUsedColorsByUser service');
        }
    }
}