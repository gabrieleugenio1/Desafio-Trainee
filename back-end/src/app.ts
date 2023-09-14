import configExpress from './config/config-express';
import express from 'express';
import challenge1Router from "./routes/challenge-1";
import challenge2Router from "./routes/challenge-2";
import challenge3Router from "./routes/challenge-3";
import challenge4Router from "./routes/challenge-4";

const app = express();


// Configurações do App:
configExpress(app);

// Definindo rotas
app.use("/challenge-1", challenge1Router);
app.use("/challenge-2", challenge2Router);
app.use("/challenge-3", challenge3Router);
app.use("/challenge-4", challenge4Router);



export default app;

