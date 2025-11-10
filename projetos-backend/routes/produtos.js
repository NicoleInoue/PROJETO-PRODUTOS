import express from 'express';
const router = express.Router();

export default(supabase)=>{

    //
    // Adicionar um novo produto
    //
    router.post('/',async(req,res) => {
        const {nome,preco} = req.body;
        const {data, error} = 
            await supabase.from('produtos').insert([{nome,preco}]);

        if (error)
            return res.status(400).json({error: error.message});

        return res.status(201).json({mensagem: 'Produto adicionado com sucesso!'});
    });

    //
    // Listar os produtos
    //
    router.get('/',async(req,res) => {
        const {data, error} = await supabase.from('produtos').select('*');
        if (error)
            return res.status(400).json({error: error.message});
        return res.json(data);
    });    


    //
    // Retornar um produto a partir do ID
    //
    router.get('/:id',async(req,res) => {
        const {id} =  req.params;
        const {data, error} = await supabase.from('produtos').select('*').eq('id',id).single();
        if (error)
            return res.status(400).json({error: error.message});
        return res.json(data);
    });        

    //
    // Atualizar um produto
    //
    router.put('/:id',async(req,res) => {
        const {id} = req.params;
        const {nome,preco} = req.body;
        const {data, error} = 
            await supabase.from('produtos').update([{nome,preco}]).eq('id',id);

        if (error)
            return res.status(400).json({error: error.message});

        return res.status(200).json({mensagem: 'Produto atualizado com sucesso!'});
    });    

    //
    // Apagar um produto
    //
    router.delete('/:id',async(req,res) => {
        const {id} = req.params;
        const {data, error} = 
            await supabase.from('produtos').delete().eq('id',id);

        if (error)
            return res.status(400).json({error: error.message});

        return res.status(200).json({mensagem: 'Produto apagado com sucesso!'});
    });    

    return router;
}