const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
      const { page = 1 } = request.query;

      const [count] = await connection('accounts').count();

        const accounts = await connection('accounts')  
            .join('users', 'users.id', '=', 'accounts.user_id')
           .limit(5)
          .offset((page -1) * 5)
          .select([
              'accounts.*', 
              'users.name', 
              'users.email',
             'users.whatsapp', 
               'users.city', 
               'users.uf'
            ]);
        
        response.header('X-Total-Count', count['count(*)']);

      return response.json(accounts);
    },

    async create(request, response) {
        const{ title, description, value} = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('accounts').insert({
            title,
            description,
            value,
            user_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;
      
        const account = await connection('accounts')
            .where('id', id)
            .select('user_id')
            .first();
            
            console.log(account)

        if (account.user_id != user_id) {
            return response.status(401).json({ error: 'Operation not permitted.'});
        } 

        await connection('accounts').where('id', id).delete();

        return response.status(204).send();
    }
};