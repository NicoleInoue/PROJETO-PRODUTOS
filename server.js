import express from 'express';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import produtosRoute from './routes/produtos.js';

const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

const port = 3000;

const supabase = createClient(
    process.env.SUPABASE_URL,process.env.SUPABASE_KEY
);

app.use(express.json());
app.use('/produtos', produtosRoute(supabase));

app.get('/',(req,res)=>{
    res.send('API de Produtos')
});

app.listen(port,()=>{
    console.log('Servidor em execução!');
})

