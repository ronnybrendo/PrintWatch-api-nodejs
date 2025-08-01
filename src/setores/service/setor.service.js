const { db, parseError } = require('../../utils/db.service');
require('dotenv').config();

module.exports = {
    async getSetores() {
        try {
            const setores = await db.central.findMany({
                distinct: ['setor'],
                select: { setor: true }
            });
        
        if (!setores || setores.length === 0) {
            return { error: 'No sectors found' };
        }
                
        return { data: setores, meta: { feedback: 'Sectors retrieved successfully' }};
        
        }   catch (error) {
            return parseError(error, 'Error in getSetores service');
        }
    }
}