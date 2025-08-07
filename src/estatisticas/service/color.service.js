const { db, parseError } = require('../../utils/db.service');
require('dotenv').config();

module.exports = {
    async getMostUsedColors () {

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
            
        try {
            const colors = await db.central.groupBy({
                by: ['cor'],
                where: {
                    impressora: {
                        notIn: impressorasIgnoradas
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

        try {
            const colors = await db.central.groupBy({
                by: ['setor', 'cor'],
                where: {
                    impressora: {
                        notIn: impressorasIgnoradas
                    }
                },
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

        try {
            const colors = await db.central.groupBy({
                by: ['usuario', 'cor'],
                where: {
                    impressora: {
                        notIn: impressorasIgnoradas
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