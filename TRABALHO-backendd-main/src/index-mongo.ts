import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import rotasAutenticadas from './rotas/rotas-autenticadas.js';
import rotasNaoAutenticadas from './rotas/rotas-nao-autenticadas.js';
import Auth from './middleware/auth.js';
import errorHandler from './middleware/errorHandler.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

dotenv.config();

const app = express();

// Configurar CORS com opções flexíveis para desenvolvimento e produção
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Permitir requisições sem origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    
    // Whitelist de origens permitidas
    const whitelist = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      'https://trabalho-do-tere-backend-2.onrender.com',
    ];
    
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      // Em desenvolvimento, permitir qualquer origem; em produção, descomente para ser restritivo
      callback(null, true); // Remova este comentário em produção para ser restritivo
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use(rotasNaoAutenticadas);
app.use(Auth);
app.use(rotasAutenticadas);

// Middleware de tratamento de erros, verificar erros e validações(DEVE ser o ÚLTIMO)
app.use(errorHandler);

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';
app.listen(port, () => {
    console.log(`Server is running at http://${host}:${port}/`);
});

//rota de teste do pagamento com cartão - STRIPE
app.post("/criar-pagamento-cartao", async (req, res) => {
  //Buscar o carrinho do usuário que está no token para pegar o amount
  //O amount aqui é em centavos, tem que fazer a conversão
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: "brl",
      payment_method_types: ["card"],
      metadata: {
        pedido_id: "123",
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(400).json({ mensagem: err.message });
    res.status(400).json({ mensagem: "Erro de pagamento desconhecido!" });
  }
});