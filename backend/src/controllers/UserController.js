const generateUniqueId= require('../utils/generateUniqueld');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
    
        return response.json(users);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();
    
        await connection('users').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        
        return response.json({ id });
    }
};