const { db, parseError } = require('../../utils/db.service');
require('dotenv').config();

module.exports = {

    async ReturnAllPrinters () {

        try {
            const printers = await db.central.findMany({
                select: { impressora: true}
            });

            console.log(`Total de impressoras encontradas: ${total}`);
            
            if (!printers || printers.length === 0) {
                return { error: 'No printers found' };
            }   

            return { data: printers, meta: { feedback: 'Printers retrieved successfully' } };

        } catch (error) {
            return parseError(error, 'Error in ReturnAllPrinters service');
        }
        
    }
}